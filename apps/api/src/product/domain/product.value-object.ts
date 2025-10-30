import { Guard } from '../../core/utils/guard.util.js';

export class ProductName {
  private readonly _value: string;

  constructor(value: string) {
    Guard.againstNullOrUndefined(value, 'ProductName');
    Guard.againstEmptyString(value, 'ProductName');

    if (value.length < 3) {
      throw new Error('Product name must be at least 3 characters long');
    }

    if (value.length > 100) {
      throw new Error('Product name must not exceed 100 characters');
    }

    this._value = value.trim();
  }

  get value(): string {
    return this._value;
  }
}

export class ProductPrice {
  private readonly _value: number;

  constructor(value: number) {
    Guard.againstNullOrUndefined(value, 'ProductPrice');

    if (value < 0) {
      throw new Error('Product price cannot be negative');
    }

    if (value > 1000000) {
      throw new Error('Product price cannot exceed 1,000,000');
    }

    this._value = value;
  }

  get value(): number {
    return this._value;
  }
}
