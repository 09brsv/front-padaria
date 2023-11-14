import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProdutoComponent {
  modalAberto!: boolean;
  @Input({ required: true }) product!: IProduct;
  @Output() modalChangeProduct = new EventEmitter();

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
    this.modalChangeProduct.emit();
  }
}
