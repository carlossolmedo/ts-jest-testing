import { Authorizer } from '../../../app/server-app/auth/Authorizer';
import { ReservationsDataAccess } from '../../../app/server-app/data/ReservationsDataAccess';
import { LoginHandler } from '../../../app/server-app/handlers/LoginHandler';
import { RegisterHandler } from '../../../app/server-app/handlers/RegisterHandler';
import { ReservationsHandler } from '../../../app/server-app/handlers/ReservationsHandler';
import { HTTP_CODES } from '../../../app/server-app/model/ServerModel';
import { Server } from '../../../app/server-app/server/Server';

jest.mock('../../../app/server-app/auth/Authorizer');
jest.mock('../../../app/server-app/data/ReservationsDataAccess');
jest.mock('../../../app/server-app/handlers/LoginHandler');
jest.mock('../../../app/server-app/handlers/RegisterHandler');
jest.mock('../../../app/server-app/handlers/ReservationsHandler');

const reqMock: any = {
  url: '',
  headers: {
    'user-agent': 'jest-test'
  }
}

const resMock: any = {
  end: jest.fn(),
  writeHead: jest.fn()
}

const serverMock: any = {
  listen: jest.fn(),
  close: jest.fn()
};

jest.mock('http', () => ({
  createServer: (cb: Function) => {
    cb(reqMock, resMock);
    return serverMock;
  }
}))

describe('Server test suite', () => {
  let sut: Server;

  beforeEach(() => {
    sut = new Server();
    expect(Authorizer).toHaveBeenCalledTimes(1);
    expect(ReservationsDataAccess).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(Server).toBeDefined();
  });
  it('should start server on port 8080 and end the request', async () => {
    await sut.startServer();

    expect(serverMock.listen).toHaveBeenCalledTimes(1);
    expect(serverMock.listen).toHaveBeenCalledWith(8080);
    expect(resMock.end).toHaveBeenCalled();
  });
  it('should handle register request', async () => {
    reqMock.url = 'localhost:8080/register';
    const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, 'handleRequest');

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(RegisterHandler).toHaveBeenCalledWith(reqMock, resMock, expect.any(Authorizer));
  });
  it('should handle login request', async () => {
    reqMock.url = 'localhost:8080/login';
    const handleRequestSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest');

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(LoginHandler).toHaveBeenCalledWith(reqMock, resMock, expect.any(Authorizer));
  });
  it('should handle reservation request', async () => {
    reqMock.url = 'localhost:8080/reservation';
    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest');

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(ReservationsHandler).toHaveBeenCalledWith(reqMock, resMock, expect.any(Authorizer), expect.any(ReservationsDataAccess));
  });
  it('should do nothing for unknown route', async () => {
    reqMock.url = 'localhost:8080/unknown';
    const validateTokenSpy = jest.spyOn(Authorizer.prototype, 'validateToken');

    await sut.startServer();
    expect(validateTokenSpy).not.toHaveBeenCalled();
  });
  it('should handle the error for request', async () => {
    reqMock.url = 'localhost:8080/register';
    const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, 'handleRequest');
    handleRequestSpy.mockRejectedValueOnce(new Error('some error'));

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(resMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR, JSON.stringify('Internal server error: some error'));
  });
  it('should stop the server', async () => {
    await sut.startServer();
    await sut.stopServer();

    expect(serverMock.close).toHaveBeenCalledTimes(1);
  });
});