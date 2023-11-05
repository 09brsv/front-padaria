import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsState {
  private _products = new BehaviorSubject<IProduct[]>([]);

  public readonly products$ = this._products.asObservable();

  get products() {
    return this._products.getValue();
  }
  set products(products: IProduct[]) {
    this._products.next(products);
  }

  getById(id: string) {
    return this.products.find(product => product.id === id);
  }

  add(product: IProduct) {
    this._products.next([...this.products, product]);
  }

  update(product: IProduct) {
    const products = [...this.products];
    const index = products.findIndex(p => p.id === product.id);
    products[index] = product;
    this._products.next(products);
  }

  remove(id: string) {
    const products = this.products.filter(product => product.id !== id);
    this._products.next(products);
  }
}
