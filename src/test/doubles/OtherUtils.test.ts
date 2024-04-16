import { StringInfo, calculateComplexity, toUpperCaseWithCb } from '../../app/doubles/OtherUtils';

describe('OtherUtils test suite', () => {
  describe('calculateComplexity', () => {
    it('should be defined', () => {
      expect(calculateComplexity).toBeDefined();
    });
    it('should return the number of complexity', () => {
      // stub variable
      const someInfo: Pick<StringInfo, 'length' | 'extraInfo'> = {
        length: 5,
        extraInfo: {
          field1: 'someInfo',
          field2: 'someOtherInfo',
        }
      };

      const actual = calculateComplexity(someInfo as StringInfo);
      const expected = 10;

      expect(actual).toBe(expected);
    });
  });

  describe('toUpperCaseWithCb', () => {
    it('should be defined', () => {
      expect(toUpperCaseWithCb).toBeDefined();
    });
    it('should call the callback for invalid argument return undefined', () => {
      const actual = toUpperCaseWithCb('', () => { }); // fake callback
      expect(actual).toBeUndefined();
    });
    it('should call the callback for valid argument return the upper cased string', () => {
      const actual = toUpperCaseWithCb('abc', () => { });
      expect(actual).toBe('ABC');
    });
  });

  describe('Tracking callbacks', () => {
    let cbArgs: string[] = [];
    let timesCalled = 0;


    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      // clearing tracking fields
      cbArgs = [];
      timesCalled = 0;
    });

    it('tracks calls - should call the callback for invalid argument return undefined', () => {
      const actual = toUpperCaseWithCb('', callBackMock); // mock callback
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain('Invalid argument');
      expect(timesCalled).toBe(1);
    });
    it('tracks calls - should call the callback for valid argument return the upper cased string', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(cbArgs).toContain('called toUpperCaseWithCb with abc');
      expect(timesCalled).toBe(1);
    });
  });

  describe.only('Tracking callbacks - with Jest', () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      // clearing mocks
      jest.clearAllMocks();
    });
    it('tracks calls - should call the callback for invalid argument return undefined', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledWith('Invalid argument');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
    it('tracks calls - should call the callback for valid argument return the upper cased string', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(callBackMock).toHaveBeenCalledWith('called toUpperCaseWithCb with abc');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });
});