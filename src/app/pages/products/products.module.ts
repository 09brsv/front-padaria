import { NgModule } from '@angular/core';
import { ProdutoComponent } from './components/list-products/product/product.component';
import { ModalProductComponent } from './components/list-products/product/modal/modal-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductsRoutingModule } from './products.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListProductsComponent,
    ProdutoComponent,
    ModalProductComponent,
  ],
  imports: [SharedModule, ReactiveFormsModule, ProductsRoutingModule]
})
export class ProductsModule {}
