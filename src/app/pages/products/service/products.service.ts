import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ECategory, EUnit, IProduct } from '../models';
import { Observable, of } from 'rxjs';
import { IResponseProps } from '../../common';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: IProduct[] = [];
  private environment = '';
  constructor(private http: HttpClient) {
    this.products = [
      {
        id: '1',
        title: 'Pão',
        description: 'Pão fresco',
        price: 299,
        measurementUnit: EUnit.KG,
        measurementValue: 1,
        category: ECategory['Pães e bolos'],
        stock: 5,
      },
      {
        id: '2',
        title: 'Pão Françês',
        description: 'Pão fresco',
        price: 299,
        measurementUnit: EUnit.KG,
        measurementValue: 1,
        category: ECategory['Pães e bolos'],
        stock: 3,
      },
      {
        id: '3',
        title: 'Pão Doce',
        description: 'Pão fresco',
        price: 299,
        measurementUnit: EUnit.KG,
        measurementValue: 1,
        category: ECategory['Pães e bolos'],
        stock: 2,
      },
      {
        id: '4',
        title: 'Sorvete',
        description: 'Sorvete de chocolate',
        price: 499,
        measurementUnit: EUnit.L,
        measurementValue: 1,
        category: ECategory.Sorvetes,
        stock: 10,
      },
      // Adicione mais produtos aqui
    ];
  }

  getAll(): Observable<IResponseProps<IProduct[]>> {

    this.http.get<IResponseProps<IProduct[]>>(this.environment);
    return of({ data: this.products, count: this.products.length });
  }
}
