import { Component } from '@angular/core';
import { ProductsFacade } from '../../products.facade';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { IProduct } from '../../models';
import { ProductsState } from '../../state/products.state';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [ProductsFacade, ProductsState],
})
export class ListProductsComponent {
  PAUSE = 300;
  listProducts!: IProduct[];
  fieldSearch = new FormControl();
  errorMsg = '';

  modalAberto = false;
  constructor(public productsFacade: ProductsFacade) {
    productsFacade.getAllProducts();
  }

  // totalDeLivros$ = this.fieldSearch.valueChanges
  // .pipe(
  //   debounceTime(PAUSA),
  //   filter((valorDigitado) => valorDigitado.length >= 3),
  //   tap(() => console.log('Fluxo inicial')),
  //   switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
  //   map(resultado => this.livrosResultado = resultado),
  //   catchError(erro => {
  //     console.log(erro)
  //     return of()
  //   })
  // )

  resultProducts$ = this.fieldSearch.valueChanges.pipe(
    distinctUntilChanged(),
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

  onModalChange() {
    console.log('dsada')
  this.modalAberto = !this.modalAberto;
  }
}
