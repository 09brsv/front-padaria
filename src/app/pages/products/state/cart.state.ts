import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IProduct } from "../models";

@Injectable({
  providedIn: 'root'
})
export class CartState {
  private readonly _cart = new BehaviorSubject<IProduct[]>([]);

  public readonly cart$ = this._cart.asObservable();

  get cart() {
    return this._cart.getValue();
  }
  set cart(cart: IProduct[]) {
    const oldCart = [...this.cart];
    this._cart.next([...oldCart, ...cart]);
  }

  add(product: IProduct) {
    this._cart.next([...this.cart, product]);
  }

  remove(product: IProduct) {
    const cart = [...this.cart];
    const index = cart.findIndex(p => p.id === product.id);
    cart.splice(index, 1);
    this._cart.next(cart);
  }

  update(product: IProduct) {
    const cart = [...this.cart];
    const index = cart.findIndex(p => p.id === product.id);
    cart[index] = product;
    this._cart.next(cart);
  }
}
