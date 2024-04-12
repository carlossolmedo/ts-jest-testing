export enum PasswordCheckerError {
  INVALID_ARGUMENT = 'Invalid argument',
  SHORT = 'Password too short',
  NOT_CONTAIN_UPPER_CASE = 'Password does not contain upper case character',
  NOT_CONTAIN_LOWER_CASE = 'Password does not contain lower case character'
}


export type CheckResult = {
  valid: boolean;
  reasons: PasswordCheckerError[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordCheckerError[] = [];

    if (!password) throw new Error('Invalid argument');

    if (password.length < 8) reasons.push(PasswordCheckerError.SHORT);

    if (password === password.toLowerCase()) reasons.push(PasswordCheckerError.NOT_CONTAIN_UPPER_CASE);

    if (password === password.toUpperCase()) reasons.push(PasswordCheckerError.NOT_CONTAIN_LOWER_CASE);

    return {
      valid: reasons.length > 0 ? false : true,
      reasons
    };
  }
}