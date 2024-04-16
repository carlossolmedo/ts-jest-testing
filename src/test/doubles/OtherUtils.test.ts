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
});