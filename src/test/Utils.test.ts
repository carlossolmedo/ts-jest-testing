import { toUpperCase } from '../app/Utils';

describe('Utils tests suite', () => {
  test('should return a string with all characters in uppercase', () => {
    const result = toUpperCase('hello');
    expect(result).toBe('HELLO');
  });
});