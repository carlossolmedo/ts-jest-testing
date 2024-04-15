export enum PasswordCheckerError {
  INVALID_ARGUMENT = 'Invalid argument',
  SHORT = 'Password too short',
  NOT_CONTAIN_UPPER_CASE = 'Password does not contain upper case character',
  NOT_CONTAIN_LOWER_CASE = 'Password does not contain lower case character',
  NOT_CONTAIN_NUMBER = 'Password does not contain number',
}


export type CheckResult = {
  valid: boolean;
  reasons: PasswordCheckerError[];
}

export class PasswordChecker {

  public checkPassword(password: string): CheckResult {
    const reasons: PasswordCheckerError[] = [];

    if (!password) throw new Error('Invalid argument');

    this.checkForLength(password, reasons);
    this.checkForUpperCase(password, reasons);
    this.checkForLowerCase(password, reasons);

    return {
      valid: reasons.length > 0 ? false : true,
      reasons: reasons
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    if (!password) throw new Error('Invalid argument');

    const basisCheck = this.checkPassword(password);

    this.checkForNumber(password, basisCheck.reasons);

    return {
      valid: basisCheck.reasons.length > 0 ? false : true,
      reasons: basisCheck.reasons
    };
  }

  private checkForNumber(password: string, reasons: PasswordCheckerError[]): void {
    if (!password.match(/[0-9]/)) reasons.push(PasswordCheckerError.NOT_CONTAIN_NUMBER);
  }

  private checkForLength(password: string, reasons: PasswordCheckerError[]): void {
    if (password.length < 8) reasons.push(PasswordCheckerError.SHORT);
  }

  private checkForUpperCase(password: string, reasons: PasswordCheckerError[]): void {
    if (password === password.toLowerCase()) reasons.push(PasswordCheckerError.NOT_CONTAIN_UPPER_CASE);
  }

  private checkForLowerCase(password: string, reasons: PasswordCheckerError[]): void {
    if (password === password.toUpperCase()) reasons.push(PasswordCheckerError.NOT_CONTAIN_LOWER_CASE);
  }
}