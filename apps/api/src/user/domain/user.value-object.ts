import { Guard } from '../../core/utils/guard.util.js';

export class Email {
  private readonly _value: string;

  constructor(value: string) {
    Guard.againstNullOrUndefined(value, 'Email');
    Guard.againstEmptyString(value, 'Email');
    Guard.againstInvalidEmail(value, 'Email');

    this._value = value.toLowerCase().trim();
  }

  get value(): string {
    return this._value;
  }
}

export class Password {
  private readonly _value: string;

  constructor(value: string) {
    Guard.againstNullOrUndefined(value, 'Password');
    Guard.againstEmptyString(value, 'Password');

    if (value.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    if (value.length > 100) {
      throw new Error('Password must not exceed 100 characters');
    }

    // In a real application, you should hash the password
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
