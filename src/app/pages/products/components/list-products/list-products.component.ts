import { Component, ViewChild } from '@angular/core';
import { ProductsFacade } from '../../products.facade';
import { Observable, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { EStatus, IOrder, IProduct } from '../../models';
import { ProductsState } from '../../state/products.state';
import { faMagnifyingGlass, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { ModalOrderComponent } from 'src/app/shared/components/modal-order/modal-order.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [ProductsFacade, ProductsState],
})
export class ListProductsComponent {
  listProducts!: IProduct[];
  order?: IOrder;
  errorMsg = '';
  basketIcon = faBasketShopping;

  @ViewChild('modalOrder') modalOrder!: ModalOrderComponent;
  resultProducts$?: Observable<IProduct[]>;
  modalAberto = false;
  constructor(public productsFacade: ProductsFacade) {
    productsFacade.getAllProducts();
    productsFacade.cart$.subscribe(res => {
      const amount = res.reduce((total, product) => total + (product.price * (product.quantity ?? 1)), 0);
      this.order = {
        amount,
        products: res,
        status: EStatus.pendente
      }
    })
  }

  onSearchChange(obs: Observable<string | undefined>) {
    this.resultProducts$ = obs.pipe(
      distinctUntilChanged(),
      map(val => (val ? val : '')),
      switchMap((val: string) =>
        this.productsFacade.products$.pipe(
          filter(products => products.length > 0),
          map(products =>
            products.filter(
              product =>
                product.title.toLowerCase().includes(val.toLowerCase()) ||
                product.title.toLowerCase().includes(val.toLowerCase())
            )
          ),
          tap(val => (this.listProducts = val))
        )
      )
    );
  }

  removeProduct(id: string) {
    this.productsFacade.removeFromCart(id);
  }


  openModalOrder() {
    this.order && this.modalOrder.open(this.modalOrder.content);
  }

  sendOrder(order: IOrder) {
    this.productsFacade.sendOrder(order);
    this.modalOrder.close()
  }
}
