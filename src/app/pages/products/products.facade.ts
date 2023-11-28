import { Injectable } from '@angular/core';
import { ProductsService } from './service/products.service';
import { ProductsState } from './state/products.state';
import { CartState } from './state/cart.state';
import { IProduct } from './models';

@Injectable()
export class ProductsFacade {
  constructor(
    private api: ProductsService,
    private state: ProductsState,
    private cartState: CartState
  ) {}

  public products$ = this.state.products$;
  public cart$ = this.cartState.cart$;

  getAllProducts() {
    this.api.getAll().subscribe({
      next: res => {
        this.state.products = res.data;
      },
    });
  }

  addToCart(product: IProduct) {
    this.cartState.add(product);
  }

  removeFromCart(product: IProduct) {
    this.cartState.remove(product);
  }

  updateProductFromCart(product: IProduct) {
    this.cartState.update(product);
  }
}
