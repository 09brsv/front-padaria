import { Injectable } from '@angular/core';
import { ProductsService } from './service/products.service';
import { ProductsState } from './state/products.state';

@Injectable()
export class ProductsFacade {
  constructor(
    private api: ProductsService,
    private state: ProductsState
  ) {}

  public products$ = this.state.products$;

  getAllProducts() {
    this.api.getAll().subscribe({
      next: res => {
        this.state.products = res.data;
      },
    });
  }
}
