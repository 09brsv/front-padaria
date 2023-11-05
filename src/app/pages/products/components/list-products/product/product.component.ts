import { Component, Input } from '@angular/core';
import { IProduct } from '../../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProdutoComponent {
  modalAberto!: boolean;
  @Input({ required: true }) product!: IProduct;

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
