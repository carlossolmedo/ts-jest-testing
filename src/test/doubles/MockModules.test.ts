/**
 * Mocking the entire module
 * All result from module will be undefined by default
 */
jest.mock('../../app/doubles/OtherUtils', () => ({
  ...jest.requireActual('../../app/doubles/OtherUtils'), // allows us to keep the original implementation
  calculateComplexity: () => 10, // always return 10
}));


/**
 * For mocking a external module we have to mock it independently
 */
jest.mock('uuid', () => ({
  v4: () => '123',
}));

import * as OtherUtils from '../../app/doubles/OtherUtils';

describe.skip('Mocking OtherUtils module', () => {
  it('should mock calculateComplexity', () => {
    const result = OtherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });
  it('should mock toUpperCase', () => {
    const result = OtherUtils.toUpperCase('abc');
    expect(result).toBe('ABC');
  });
  it('test external module', () => {
    const result = OtherUtils.toLowerCaseWithId('abc');
    expect(result).toBe('abc123');
  })
});