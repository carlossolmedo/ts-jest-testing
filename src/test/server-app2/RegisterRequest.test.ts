import { DataBase } from '../../app/server-app/data/DataBase';
import { HTTP_CODES, HTTP_METHODS } from '../../app/server-app/model/ServerModel';
import { Server } from '../../app/server-app/server/Server';
import { ResponseTestWrapper } from './test-utils/ResponseTestWrapper';
import { RequestTestWrapper } from './test-utils/RequestTestWrapper';

jest.mock('../../app/server-app/data/DataBase');

const requestTestWrapper = new RequestTestWrapper();
const responseTestWrapper = new ResponseTestWrapper();

const fakeServer = {
  listen: () => { },
  close: () => { },
}
const fakeUserId = '1234';

jest.mock('http', () => ({
  createServer: (cb: Function) => {
    cb(requestTestWrapper, responseTestWrapper);
    return fakeServer
  },
}));

describe('RegisterRequest test suite', () => {

  afterEach(() => {
    requestTestWrapper.clearFields();
    responseTestWrapper.clearFields();
  });

  it('should be defined', () => {
    expect(requestTestWrapper).toBeDefined();
  });
  it('should register a new user', async () => {
    requestTestWrapper.method = HTTP_METHODS.POST;
    requestTestWrapper.url = 'localhost:8080/register';
    requestTestWrapper.body = {
      userName: 'toto',
      password: 'totoPassword'
    };

    jest.spyOn(DataBase.prototype, 'insert').mockResolvedValueOnce(fakeUserId);

    await new Server().startServer()
    await new Promise(process.nextTick); // solve timing issues

    expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseTestWrapper.body).toEqual({ userId: fakeUserId });
  });
  it('should reject a request without userName and password', async () => {
    requestTestWrapper.method = HTTP_METHODS.POST;
    requestTestWrapper.url = 'localhost:8080/register';
    requestTestWrapper.body = {};

    await new Server().startServer()
    await new Promise(process.nextTick); // solve timing issues

    expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseTestWrapper.body).toBe('userName and password required');
  });
  it('should do nothing for not supported method', async () => {
    requestTestWrapper.method = HTTP_METHODS.DELETE;
    requestTestWrapper.url = 'localhost:8080/register';
    requestTestWrapper.body = {};

    await new Server().startServer()
    await new Promise(process.nextTick); // solve timing issues

    expect(responseTestWrapper.statusCode).toBeUndefined();
    expect(responseTestWrapper.body).toBeUndefined();
  });
});