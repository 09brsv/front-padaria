import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './components/list-products/product/product.component';
import { ModalProductComponent } from './components/list-products/product/modal/modal-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListProductsComponent } from './components/list-products/list-products.component';

@NgModule({
  declarations: [
    ListProductsComponent,
    ProdutoComponent,
    ModalProductComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ModalProductComponent],
})
export class ProdutoModule {}
