import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ECategory, EUnit, IProduct } from '../models';
import { Observable, of } from 'rxjs';
import { IResponseProps } from '../../common';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  imageSrc = 'assets/images'
  products: IProduct[] = [];
  private environment = '';
  constructor(private http: HttpClient) {
    this.products = [
      {
        id: '1',
        title: 'Biscoito de polvilho',
        image: `${this.imageSrc}/biscoito-polvilho.jpg`,
        description: 'Biscoito de polvilho recheado',
        price: 20.99,
        measurementUnit: EUnit.KG,
        measurementValue: 1,
        category: ECategory['Breads and cakes'],
        stock: 5,
      },
      {
        id: '2',
        title: 'Pão Francês',
        image: `${this.imageSrc}/pao-frances.jpg`,
        description: 'Pão fresco',
        price: 14.99,
        measurementUnit: EUnit.KG,
        measurementValue: 1,
        category: ECategory['Breads and cakes'],
        stock: 3,
      },
      {
        id: '3',
        title: 'Pão Doce',
        image: `${this.imageSrc}/pao-doce-coco.jpg`,
        description: 'Pão doce de côco',
        price: 19.99,
        measurementUnit: EUnit.KG,
        measurementValue: 1,
        category: ECategory['Breads and cakes'],
        stock: 2,
      },
      {
        id: '4',
        title: 'Sorvete de maracujá',
        image: `${this.imageSrc}/sorvete-maracuja.jpg`,
        description: 'Sorvete casquinha 2 bolas',
        price: 3.99,
        measurementUnit: EUnit.UN,
        measurementValue: 1,
        category: ECategory['ice creams'],
        stock: 10,
      },
      {
        id: '5',
        title: 'Bolo de chocolate',
        image: `${this.imageSrc}/bolo-chocolate.jpg`,
        description: 'Bolo de chocolate com avelã e nozes',
        price: 89.99,
        measurementUnit: EUnit.UN,
        measurementValue: 1,
        category: ECategory['Breads and cakes'],
        stock: 3,
      },
      {
        id: '6',
        title: 'Bolo de limão',
        image: `${this.imageSrc}/bolo-limao.jpg`,
        description: 'Bolo de limão com leite condensado',
        price: 79.99,
        measurementUnit: EUnit.UN,
        measurementValue: 1,
        category: ECategory['Breads and cakes'],
        stock: 3,
      },
      {
        id: '7',
        title: 'Bolo de leite ninho',
        image: `${this.imageSrc}/bolo-leite-ninho.jpg`,
        description: 'Bolo de leite ninho com cobertura de côco e leite condensado',
        price: 79.99,
        measurementUnit: EUnit.UN,
        measurementValue: 1,
        category: ECategory['Breads and cakes'],
        stock: 5,
      },
      {
        id: '8',
        title: 'Casadinho',
        image: `${this.imageSrc}/casadinho-goiaba.jpg`,
        description: 'Casadinho de goiaba',
        price: 50,
        measurementUnit: EUnit.KG,
        measurementValue: 1,
        category: ECategory['candies'],
        stock: 5,
      },
      {
        id: '9',
        title: 'Cookie de chocolate',
        image: `${this.imageSrc}/cookie-chocolate.jpg`,
        description: 'Cookie com gotas de chocolate',
        price: 5.99,
        measurementUnit: EUnit.UN,
        measurementValue: 1,
        category: ECategory['cookies'],
        stock: 5,
      },
      {
        id: '10',
        title: 'Mousse de maracujá',
        description: 'Mousse de maracujá',
        image: `${this.imageSrc}/mousse-maracuja.jpg`,
        price: 9.99,
        measurementUnit: EUnit.UN,
        measurementValue: 1,
        category: ECategory['ice creams'],
        stock: 5,
      },
      {
        id: '11',
        title: 'Sonho',
        description: 'Sonho de doce de leite',
        image: `${this.imageSrc}/sonho.jpg`,
        price: 3.99,
        measurementUnit: EUnit.UN,
        measurementValue: 1,
        category: ECategory['candies'],
        stock: 5,
      },
      {
        id: '12',
        title: "Pão de queijo",
        description: 'Pão de queijo',
        image: `${this.imageSrc}/pao-queijo.jpg`,
        price: 30.45,
        measurementUnit: EUnit.KG,
        measurementValue: 1,
        category: ECategory['Breads and cakes'],
        stock: 5,
      },
      {
        id: '13',
        title: "Pudim",
        description: 'Pudim com calda',
        image: `${this.imageSrc}/pudim.jpg`,
        price: 25.19,
        measurementUnit: EUnit.UN,
        measurementValue: 1,
        category: ECategory['candies'],
        stock: 5,
      }
      // Adicione mais produtos aqui
    ];
  }

  getAll(): Observable<IResponseProps<IProduct[]>> {

    this.http.get<IResponseProps<IProduct[]>>(this.environment);
    return of({ data: this.products, count: this.products.length });
  }
}
