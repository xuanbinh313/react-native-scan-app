import { BaseEntity } from '../../core/domain/base.entity.js';
import { Guard } from '../../core/utils/guard.util.js';
import { Email, Password } from './user.value-object.js';

export class User extends BaseEntity {
  private _name: string;
  private _email: Email | string;
  private _password: Password | string;
  private _role: string;

  constructor(
    id: string, 
    name: string, 
    email: string, 
    password: string, 
    role: string = 'user',
    skipValidation: boolean = false
  ) {
    super(id);
    
    if (skipValidation) {
      // For partial data loading (field selection), skip value object validation
      this._name = name.trim();
      this._email = email;
      this._password = password;
    } else {
      // Normal creation with full validation
      Guard.againstNullOrUndefined(name, 'name');
      Guard.againstEmptyString(name, 'name');
      this._name = name.trim();
      this._email = new Email(email);
      this._password = new Password(password);
    }
    
    this._role = role;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return typeof this._email === 'string' ? this._email : this._email.value;
  }

  get password(): string {
    return typeof this._password === 'string' ? this._password : this._password.value;
  }

  get role(): string {
    return this._role;
  }

  updateName(name: string): void {
    Guard.againstNullOrUndefined(name, 'name');
    Guard.againstEmptyString(name, 'name');
    this._name = name.trim();
    this.update();
  }

  updateEmail(email: string): void {
    this._email = new Email(email);
    this.update();
  }

  updatePassword(password: string): void {
    this._password = new Password(password);
    this.update();
  }

  updateRole(role: string): void {
    Guard.againstNullOrUndefined(role, 'role');
    this._role = role;
    this.update();
  }

  verifyPassword(password: string): boolean {
    const currentPassword = typeof this._password === 'string' ? this._password : this._password.value;
    return currentPassword === password;
  }
}
