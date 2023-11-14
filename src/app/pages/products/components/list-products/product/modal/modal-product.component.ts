import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProduct } from 'src/app/pages/products/models';

// const body = document.querySelector('body');

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent {
  @Input({ required: true }) product!: IProduct;
  @Input() modalAberto?: boolean;
  statusModal = true;
  @Output() mudouModal = new EventEmitter();
  formProduto!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formProduto = this.fb.group({
      quantity: [1],
    });
  }

  fecharModal() {
    this.statusModal = false;
    this.mudouModal.emit(this.statusModal);
    // body.style.overflow = "scroll"
  }

  esconderScroll() {
    if (this.statusModal == true) {
      // body.style.overflow = "hidden";
    }
  }
}
