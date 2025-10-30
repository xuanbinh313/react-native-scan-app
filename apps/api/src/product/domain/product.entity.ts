import { BaseEntity } from '../../core/domain/base.entity.js';
import { Guard } from '../../core/utils/guard.util.js';
import { ProductName, ProductPrice } from './product.value-object.js';

export class Product extends BaseEntity {
  private _name: ProductName | string;
  private _description: string;
  private _price: ProductPrice | number;
  private _stock: number;

  constructor(
    id: string, 
    name: string, 
    description: string, 
    price: number, 
    stock: number,
    skipValidation: boolean = false
  ) {
    super(id);
    
    if (skipValidation) {
      // For partial data loading (field selection), skip value object validation
      this._name = name;
      this._price = price;
    } else {
      // Normal creation with full validation
      this._name = new ProductName(name);
      this._price = new ProductPrice(price);
    }
    
    this._description = description;
    this._stock = stock;
  }

  get name(): string {
    return typeof this._name === 'string' ? this._name : this._name.value;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return typeof this._price === 'number' ? this._price : this._price.value;
  }

  get stock(): number {
    return this._stock;
  }

  updateName(name: string): void {
    this._name = new ProductName(name);
    this.update();
  }

  updateDescription(description: string): void {
    Guard.againstNullOrUndefined(description, 'description');
    this._description = description;
    this.update();
  }

  updatePrice(price: number): void {
    this._price = new ProductPrice(price);
    this.update();
  }

  updateStock(stock: number): void {
    if (stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    this._stock = stock;
    this.update();
  }

  decreaseStock(amount: number): void {
    if (this._stock < amount) {
      throw new Error('Insufficient stock');
    }
    this._stock -= amount;
    this.update();
  }

  increaseStock(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    this._stock += amount;
    this.update();
  }
}
