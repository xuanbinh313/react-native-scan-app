import { BadRequestException } from '@nestjs/common';

/**
 * Exception thrown when invalid fields are requested
 */
export class FieldValidationException extends BadRequestException {
  constructor(message: string) {
    super(message);
    this.name = 'FieldValidationException';
  }
}
