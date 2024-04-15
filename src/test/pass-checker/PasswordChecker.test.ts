import { PasswordChecker, PasswordCheckerError } from '../../app/pass-checker/PasswordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  describe('checkPassword', () => {
    it('should return error for empty password', () => {
      expect(() => sut.checkPassword('')).toThrow('Invalid argument');
    });
    it('check if length is less than 8 characters', () => {
      const actual = sut.checkPassword('1234567');
      expect(actual.valid).toBe(false);
      expect(actual.reasons).toContain(PasswordCheckerError.SHORT); // use toContain to check string messages
    });
    it('check if length is more than 8 characters', () => {
      const actual = sut.checkPassword('12345678Ab');
      expect(actual.valid).toBe(true);
      expect(actual.reasons).not.toContain(PasswordCheckerError.SHORT);
    });
    it('check if not contain upper case character', () => {
      const actual = sut.checkPassword('12345abcd');
      expect(actual.valid).toBe(false);
      expect(actual.reasons).toContain(PasswordCheckerError.NOT_CONTAIN_UPPER_CASE);
    });
    it('check if contain upper case character', () => {
      const actual = sut.checkPassword('12345abcD');
      expect(actual.valid).toBe(true);
      expect(actual.reasons).not.toContain(PasswordCheckerError.NOT_CONTAIN_UPPER_CASE);
    });
    it('check if not contain lower case character', () => {
      const actual = sut.checkPassword('12345ABCD');
      expect(actual.valid).toBe(false);
      expect(actual.reasons).toContain(PasswordCheckerError.NOT_CONTAIN_LOWER_CASE);
    });
    it('check if contain lower case character', () => {
      const actual = sut.checkPassword('12345ABCa');
      expect(actual.valid).toBe(true);
      expect(actual.reasons).not.toContain(PasswordCheckerError.NOT_CONTAIN_LOWER_CASE);
    });
    it('check if complex password is valid', () => {
      const actual = sut.checkPassword('12345abcDe');
      expect(actual.valid).toBe(true);
      expect(actual.reasons).toHaveLength(0);
    });
  });

  describe('checkAdminPassword', () => {
    it('check if the method is defined', () => {
      expect(sut.checkAdminPassword).toBeDefined();
    });
    it('should return error for empty password', () => {
      expect(() => sut.checkAdminPassword('')).toThrow('Invalid argument');
    });
    it('check if password not contain a number', () => {
      const actual = sut.checkAdminPassword('abcdefghijklmnopqrstuvwxyZ');
      expect(actual.valid).toBe(false);
      expect(actual.reasons).toContain(PasswordCheckerError.NOT_CONTAIN_NUMBER);
    });
    it('check if password contain a number', () => {
      const actual = sut.checkAdminPassword('abcdefghijklmnopqrstuvwxyZ1');
      expect(actual.valid).toBe(true);
      expect(actual.reasons).not.toContain(PasswordCheckerError.NOT_CONTAIN_NUMBER);
    });
  })
});