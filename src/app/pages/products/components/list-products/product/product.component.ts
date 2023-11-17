import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IProduct } from '../../../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductComponent } from './modal/modal-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [NgbModal]
})
export class ProductComponent {
  modalAberto!: boolean;

  @Input({ required: true }) product!: IProduct;
  @Output() modalChangeProduct = new EventEmitter();

  @ViewChild('modalProduct') modalProduct!: ModalProductComponent;

  constructor() {}

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
    this.modalChangeProduct.emit();
  }
  abrirModal() {
    this.modalProduct.open(this.modalProduct.content);
  }
}
