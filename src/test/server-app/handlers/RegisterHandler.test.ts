import { RegisterHandler } from '../../../app/server-app/handlers/RegisterHandler';
import { Account } from '../../../app/server-app/model/AuthModel';
import { HTTP_CODES, HTTP_METHODS } from '../../../app/server-app/model/ServerModel';

const getRequestBodyMock = jest.fn();

jest.mock('../../../app/server-app/utils/Utils', () => ({
  getRequestBody: () => getRequestBodyMock()
}));

const fakeAccount: Account = {
  id: '',
  userName: 'toto',
  password: 'totoPassword',
}
const fakeId = '1234';

describe('RegisterHandler test suite', () => {
  let sut: RegisterHandler;

  const request: any = {
    method: undefined
  }
  const responseMock: any = {
    statusCode: 0,
    writeHead: jest.fn(),
    write: jest.fn()
  };
  const authorizerMock: any = {
    registerUser: jest.fn()
  };

  beforeEach(() => {
    sut = new RegisterHandler(request, responseMock, authorizerMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it('should register valid account in requests body', async () => {
    request.method = HTTP_METHODS.POST;
    getRequestBodyMock.mockResolvedValueOnce(fakeAccount)
    authorizerMock.registerUser.mockResolvedValueOnce(fakeId);

    await sut.handleRequest()

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.writeHead).toHaveBeenCalledWith(
      HTTP_CODES.CREATED,
      { 'Content-Type': 'application/json' }
    );
    expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify({ userId: fakeId }));
    // expect(authorizerMock.registerUser).toHaveBeenCalledWith(fakeAccount);
  });
});