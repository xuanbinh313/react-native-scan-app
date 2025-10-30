export class Guard {
  static againstNullOrUndefined(value: any, argumentName: string): void {
    if (value === null || value === undefined) {
      throw new Error(`${argumentName} is null or undefined`);
    }
  }

  static againstNullOrUndefinedBulk(args: Array<{ value: any; argumentName: string }>): void {
    for (const arg of args) {
      this.againstNullOrUndefined(arg.value, arg.argumentName);
    }
  }

  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  static againstEmptyString(value: string, argumentName: string): void {
    if (value.trim() === '') {
      throw new Error(`${argumentName} is empty`);
    }
  }

  static againstInvalidEmail(email: string, argumentName: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(`${argumentName} is not a valid email`);
    }
  }
}
