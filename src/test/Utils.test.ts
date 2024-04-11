import { StringUtils, getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils its suite', () => {
  it('should return uppercase of valid string', () => {
    const sut = toUpperCase;
    const expected = 'HELLO';

    const actual = sut('hello');

    expect(actual).toBe(expected);
  });

  it('should return info for valid string', () => {
    const actual = getStringInfo('My-String');

    expect(actual.lowerCase).toBe('my-string');
    expect(actual.upperCase).toBe('MY-STRING');

    // check arrays
    expect(actual.characters).toStrictEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
    expect(actual.characters).toContain<string>('M');
    expect(actual.characters).toEqual(
      expect.arrayContaining(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'])
    );

    //check length
    expect(actual.length).toBe(9);
    expect(actual.characters).toHaveLength(9);

    expect(actual.extraInfo).toStrictEqual({}); // matcher toStrictEqual for compare objects

    // check it not undefined
    expect(actual.extraInfo).not.toBe(undefined);
    expect(actual.extraInfo).toBeTruthy(); // check if is a truthy value
    // check if undefined -> expect(actual.extraInfo).toBeUndefined();
    // check if undefined -> expect(actual.extraInfo).not.toBeDefined();
  });

  // Better approach
  describe('getStringInfo for arg My-String should', () => {
    it('return right length', () => {
      const actual = getStringInfo('My-String'); // add tha actual variable to let test isolated
      expect(actual.characters).toHaveLength(9);
    });
    it('return right lower case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.lowerCase).toBe('my-string');
    });
    it('return right upper case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.upperCase).toBe('MY-STRING');
    });
    it('return right characters', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
      expect(actual.characters).toContain<string>('M');
      expect(actual.characters).toEqual(
        expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-'])
      );
    });
    it('return defined extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toBeDefined();
    });
    it('return right extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toEqual({})
    });
  });

  // Add many arguments
  describe('ToUpperCase examples', () => {
    it.each([
      { input: 'abc', expected: 'ABC' },
      { input: 'My-String', expected: 'MY-STRING' },
      { input: 'def', expected: 'DEF' }
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  })

  // Hooks
  describe('Hooks> StringUtils tests', () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      console.log('Setup');
    });

    afterEach(() => {
      // clearing mocks
      console.log('Teardown');
    });

    it('should return correct uppercase', () => {
      const sut = new StringUtils();

      const actual = sut.toUpperCase('hello');
      const expected = 'HELLO';

      expect(actual).toBe(expected);
      console.log('Actual test');
    });
  });

  // Errors
  describe('Errors> StringUtils tests', () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      console.log('Setup');
    });

    it('should throw error on invalid argument - function', () => {
      function expectError() {
        const actual = sut.toUpperCase('');
      }
      expect(expectError).toThrow('Invalid argument');
    });
    it('should throw error on invalid argument - arrow function', () => {
      expect(() => sut.toUpperCase('')).toThrow('Invalid argument');
    });
    it('should throw error on invalid argument - try catch block', () => { // kind of test not recommend
      try {
        sut.toUpperCase('');
        // needs to add fail('message') or done('message') for that works
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid argument');
      }
    });
  });
});