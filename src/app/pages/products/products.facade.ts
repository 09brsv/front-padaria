import { ProductsService } from './service/produtos.service';
import { ProductsState } from './state/products.state';

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
