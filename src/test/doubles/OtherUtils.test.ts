import { StringInfo, calculateComplexity } from '../../app/doubles/OtherUtils';

describe('OtherUtils test suite', () => {
  describe('calculateComplexity', () => {
    it('should be defined', () => {
      expect(calculateComplexity).toBeDefined();
    });
    it('should return the number of complexity', () => {
      // stub variable
      const someInfo: Partial<StringInfo> = {
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
});