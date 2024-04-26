import { Authorizer } from '../../../app/server-app/auth/Authorizer';
import { Account } from '../../../app/server-app/model/AuthModel';

jest.mock('../../../app/server-app/data/SessionTokenDataAccess');
jest.mock('../../../app/server-app/data/UserCredentialsDataAccess');

const sessionTokenDataAccessMock: any = {
  isValidToken: jest.fn(),
  generateToken: jest.fn(),
  invalidateToken: jest.fn(),
};

const userCredentialsDataAccessMock: any = {
  addUser: jest.fn(),
  getUserByUserName: jest.fn(),
};

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it.todo('should validate token');
  it.todo('should register user');
  it.todo('should login user');
  it.todo('should logout user');
});