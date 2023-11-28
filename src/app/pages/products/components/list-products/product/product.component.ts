import { Component, EventEmitter, Host, Input, Output, ViewChild } from '@angular/core';
import { IProduct } from '../../../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductComponent } from './modal/modal-product.component';
import { ProductsFacade } from '../../../products.facade';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [NgbModal, ProductsFacade]
})
export class ProductComponent {
  modalAberto!: boolean;

  @Input({ required: true }) product!: IProduct;
  @Output() modalChangeProduct = new EventEmitter();

  @ViewChild('modalProduct') modalProduct!: ModalProductComponent;

  constructor(@Host() public readonly productsFacade: ProductsFacade ) {}

  onModalChange(fade: boolean) {
    this.modalAberto = fade;
    this.modalChangeProduct.emit();
  }
  abrirModal() {
    this.modalProduct.open(this.modalProduct.content);
  }

  onAddToCart(product: IProduct) {
    this.productsFacade.addToCart(product);
  }
}
