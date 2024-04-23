import { DataBase } from '../../../app/server-app/data/DataBase';
import { UserCredentialsDataAccess } from '../../../app/server-app/data/UserCredentialsDataAccess';
import { Account } from '../../../app/server-app/model/AuthModel';

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock('../../../app/server-app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    })
  };
});

describe('UserCredentialsDataAccess test suite', () => {
  let sut: UserCredentialsDataAccess;

  const fakeAccount: Account = {
    id: '',
    userName: 'toto',
    password: 'totoPassword',
  };

  const fakeId = '1234';

  beforeEach(() => {
    /**
     * This class will instance the DataBase class automatically because it's works like a constructor.
     * So, we need to mock it
     */
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it('should add user and return id after insert', async () => {
    insertMock.mockResolvedValueOnce(fakeId);

    const actualId = await sut.addUser(fakeAccount);

    expect(actualId).toBe(fakeId);
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock).toHaveBeenCalledWith(fakeAccount);
  });
  it('should get user by id', async () => {
    getByMock.mockResolvedValueOnce(fakeAccount);

    const actual = await sut.getUserById(fakeId);

    expect(actual).toBe(fakeAccount);
    expect(getByMock).toHaveBeenCalledTimes(1);
    expect(getByMock).toHaveBeenCalledWith('id', fakeId);
  });
  it('should get user by userName', async () => {
    getByMock.mockResolvedValueOnce(fakeAccount);

    const actual = await sut.getUserByUserName(fakeAccount.userName);

    expect(actual).toBe(fakeAccount);
    expect(getByMock).toHaveBeenCalledTimes(1);
    expect(getByMock).toHaveBeenCalledWith('userName', fakeAccount.userName);
  });
});