import { getRequestBody } from "../../../app/server-app/utils/Utils";

const requestMock: any = {
  on: jest.fn(),
};

const fakeData = {
  name: 'toto',
  age: 20,
  city: 'Paris',
};

const fakeDataAsString = JSON.stringify(fakeData);

describe('getRequestBody test suite', () => {

  it('should be defined', () => {
    expect(getRequestBody).toBeDefined();
  });
  it('should return object for valid JSON', async () => {
    requestMock.on.mockImplementation((eventName: string, callback: any) => {
      if (eventName === 'data') {
        callback(fakeDataAsString);
      }
      if (eventName === 'end') {
        callback();
      }
    });
    const actualData = await getRequestBody(requestMock);
    expect(actualData).toEqual(fakeData);
  });
  it('should throw error if request is not valid JSON', async () => {
    requestMock.on.mockImplementation((eventName: string, callback: any) => {
      if (eventName === 'data') {
        callback('some data');
      }
      if (eventName === 'end') {
        callback();
      }
    });
    await expect(getRequestBody(requestMock)).rejects.toThrow();
  });
  it('should throw error for unexpected error', async () => {
    requestMock.on.mockImplementation((eventName: string, callback: any) => {
      if (eventName === 'error') {
        callback('some error');
      }
    });
    try {
      await getRequestBody(requestMock);
    } catch (error) {
      expect(error).toEqual('some error');
    }
  });
});