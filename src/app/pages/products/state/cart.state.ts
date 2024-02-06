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
    const indexProduct = this.cart.findIndex(p => p.id === product.id);
    if (indexProduct > -1) {
      const oldProduct = this.cart[indexProduct];
      this.update({
        ...oldProduct,
      });
      return;
    }
    this._cart.next([...this.cart, product]);
  }

  remove(id: string) {
    const cart = [...this.cart];
    const index = cart.findIndex(p => p.id === id);
    cart.splice(index, 1);
    this._cart.next(cart);
  }

  update(product: IProduct) {
    const cart = [...this.cart];
    const index = cart.findIndex(p => p.id === product.id);
    if (index < 0) {
      return this.add(product);
    }
    cart[index] = product;
    this._cart.next(cart);
  }
}
