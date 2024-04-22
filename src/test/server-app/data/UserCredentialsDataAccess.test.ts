import { DataBase } from '../../../app/server-app/data/DataBase';
import { UserCredentialsDataAccess } from '../../../app/server-app/data/UserCredentialsDataAccess';

type SomeTypeWithId = {
  id: string;
  name: string;
  color: string;
};

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


  beforeEach(() => {
    /**
     * This class will instance the DataBase class automatically. So, we need to mock it
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
});