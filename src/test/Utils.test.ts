import { getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils tests suite', () => {
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

    // check undefined
    expect(actual.extraInfo).not.toBe(undefined);
    expect(actual.extraInfo).toBeUndefined();
    expect(actual.extraInfo).not.toBeDefined();
    expect(actual.extraInfo).toBeTruthy(); // check if is a truthy value
  })
});