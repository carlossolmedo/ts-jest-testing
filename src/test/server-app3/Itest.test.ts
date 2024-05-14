import { Reservation } from '../../app/server-app/model/ReservationModel';
import { HTTP_CODES, HTTP_METHODS } from '../../app/server-app/model/ServerModel';
import { Server } from '../../app/server-app/server/Server';
import { makeAwesomeRequest } from './utils/http-client';

describe('Server app integration test', () => {
  let server: Server;

  const fakeUser = {
    id: '',
    userName: 'toto',
    password: 'totoPassword',
  };

  const fakeReservation: Reservation = {
    id: '',
    startDate: 'fakeStartDate',
    endDate: 'fakeEndDate',
    room: 'fakeRoom',
    user: 'fakeUser',
  };

  beforeAll(async () => {
    server = new Server();
    await server.startServer();
  });

  afterAll(async () => {
    await server.stopServer();
  });

  it('should be defined', () => {
    expect(Server).toBeDefined();
  });

  it('should register new user', async () => {
    const result = await fetch('http://localhost:8080/register', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(fakeUser),
    });
    const resultBody = await result.json();
    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.userId).toBeDefined();
  });
  it('should register new user with AwesomeRequest', async () => {
    const result = await makeAwesomeRequest({
      host: 'localhost',
      port: 8080,
      method: HTTP_METHODS.POST,
      path: '/register',
    }, fakeUser)

    expect(result.statusCode).toBe(HTTP_CODES.CREATED);
    expect(result.body.userId).toBeDefined();
  });

  let token: string;
  it('should login a register user', async () => {
    const result = await fetch('http://localhost:8080/login', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(fakeUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.token).toBeDefined();
    token = resultBody.token;
  });

  let createReservationId: string;
  it('should create reservation if authorized', async () => {
    const result = await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(fakeReservation),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.reservationId).toBeDefined();
    createReservationId = resultBody.reservationId;
  });
  it('should get reservation if authorized', async () => {
    const result = await fetch(`http://localhost:8080/reservation/${createReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        Authorization: token,
      },
    });
    const resultBody = await result.json();

    const expectedReservation = structuredClone(fakeReservation);
    expectedReservation.id = createReservationId;

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toEqual(expectedReservation);
  });
  it('should get all reservations', async () => {
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(fakeReservation),
    });
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(fakeReservation),
    });
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(fakeReservation),
    });

    const getAllResults = await fetch('http://localhost:8080/reservation/all', {
      method: HTTP_METHODS.GET,
      headers: {
        Authorization: token,
      },
    });
    const resultBody = await getAllResults.json();

    expect(getAllResults.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toHaveLength(4);
  });
  it('should update reservation if authorized', async () => {
    const updateResult = await fetch(`http://localhost:8080/reservation/${createReservationId}`, {
      method: HTTP_METHODS.PUT,
      body: JSON.stringify({
        startDate: 'otherStartDate'
      }),
      headers: {
        authorization: token
      }
    });

    expect(updateResult.status).toBe(HTTP_CODES.OK);

    const getResult = await fetch(`http://localhost:8080/reservation/${createReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token
      }
    });
    const getRequestBody: Reservation = await getResult.json();
    expect(getRequestBody.startDate).toBe('otherStartDate');
  });

  it('should delete reservation if authorized', async () => {
    const deleteResult = await fetch(`http://localhost:8080/reservation/${createReservationId}`, {
      method: HTTP_METHODS.DELETE,
      headers: {
        authorization: token
      }
    });

    expect(deleteResult.status).toBe(HTTP_CODES.OK);

    const getResult = await fetch(`http://localhost:8080/reservation/${createReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token
      }
    });
    expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND);
  });
});
