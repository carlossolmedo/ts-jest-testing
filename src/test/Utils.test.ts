import { toUpperCase } from '../app/Utils';

describe('Utils tests suite', () => {
  test('should return uppercase of valid string', () => {
    const sut = toUpperCase;
    const expected = 'HELLO';

    const actual = sut('hello');

    expect(actual).toBe(expected);
  });
});