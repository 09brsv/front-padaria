import { Component } from '@angular/core';
import { ProductsFacade } from '../../products.facade';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { IProduct } from '../../models';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  PAUSE = 300;
  listProducts!: IProduct[];
  fieldSearch = new FormControl();
  errorMsg = '';
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

  resultProduct$ = this.fieldSearch.valueChanges.pipe(
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
}
