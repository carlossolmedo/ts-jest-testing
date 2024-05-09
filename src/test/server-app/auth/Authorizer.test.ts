import { Authorizer } from '../../../app/server-app/auth/Authorizer';
import { SessionTokenDataAccess } from '../../../app/server-app/data/SessionTokenDataAccess';
import { UserCredentialsDataAccess } from '../../../app/server-app/data/UserCredentialsDataAccess';
import { Account } from '../../../app/server-app/model/AuthModel';

// SessionTokenDataAccess mocks
const isValidTokenMock = jest.fn();
const generateTokenMock = jest.fn();
const invalidateTokenMock = jest.fn();
jest.mock('../../../app/server-app/data/SessionTokenDataAccess', () => {
  return {
    SessionTokenDataAccess: jest.fn().mockImplementation(() => {
      return {
        isValidToken: isValidTokenMock,
        generateToken: generateTokenMock,
        invalidateToken: invalidateTokenMock
      }
    })
  }
});

// UserCredentialsDataAccess mocks:
const addUserMock = jest.fn();
const getUserByUserNameMock = jest.fn();
jest.mock('../../../app/server-app/data/UserCredentialsDataAccess', () => {
  return {
    UserCredentialsDataAccess: jest.fn().mockImplementation(() => {
      return {
        addUser: addUserMock,
        getUserByUserName: getUserByUserNameMock
      }
    })
  }
});

const fakeTokenId = '1234';
const fakeUser: Account = {
  id: '',
  password: 'totoPassword',
  userName: 'toto',
};

describe('Authorizer test suite', () => {
  let sut: Authorizer;

  beforeEach(() => {
    sut = new Authorizer();
    expect(SessionTokenDataAccess).toHaveBeenCalledTimes(1);
    expect(UserCredentialsDataAccess).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it('should validate token', async () => {
    isValidTokenMock.mockResolvedValueOnce(false);

    const actual = await sut.validateToken(fakeTokenId);

    expect(actual).toBe(false);
  });
  it('should register user', async () => {
    addUserMock.mockResolvedValueOnce(fakeTokenId);

    const actual = await sut.registerUser(fakeUser.userName, fakeUser.password);

    expect(actual).toBe(fakeTokenId);
    expect(addUserMock).toHaveBeenCalledWith(fakeUser);
  });
  it('should login user', async () => {
    getUserByUserNameMock.mockResolvedValueOnce(fakeUser);
    generateTokenMock.mockResolvedValueOnce(fakeTokenId);

    const actual = await sut.login(fakeUser.userName, fakeUser.password);

    expect(actual).toBe(fakeTokenId);
    expect(getUserByUserNameMock).toHaveBeenCalledWith(fakeUser.userName);
    expect(generateTokenMock).toHaveBeenCalledWith(fakeUser);
  });
  it('should return undefined for invalid user', async () => {
    getUserByUserNameMock.mockResolvedValueOnce(fakeUser);

    const actual = await sut.login('invalidUserName', fakeUser.password);
    expect(actual).toBeUndefined();
  });
  it('should logout user and invalidate token', async () => {
    await sut.logout(fakeTokenId);

    expect(invalidateTokenMock).toHaveBeenCalledTimes(1);
    expect(invalidateTokenMock).toHaveBeenCalledWith(fakeTokenId);
  });
});