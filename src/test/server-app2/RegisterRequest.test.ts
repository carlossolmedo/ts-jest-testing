import { DataBase } from '../../app/server-app/data/DataBase';
import { ResponseTestWrapper } from './test-utils/ReponseTestWrapper';
import { RequestTestWrapper } from './test-utils/RequestTestWrapper';

jest.mock('../../app/server-app/data/DataBase');

const requestTestWrapper = new RequestTestWrapper();
const responseTestWrapper = new ResponseTestWrapper();

const fakeServer = {
  listen: () => { },
  close: () => { },
}

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
});