import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IOrder } from 'src/app/pages/products/models';

// const body = document.querySelector('body');

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.css'],
})
export class ModalOrderComponent implements OnInit {
  @Input({ required: true }) order!: IOrder;
  statusModal = true;
  @Output() mudouModal = new EventEmitter();
  formOrder!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formOrder = this.fb.group({
      amount: this.fb.control(this.order.amount),
      formatPayment: this.fb.control(this.order.formatPayment),
      products: this.fb.array(
        this.order.products.map(product =>
          this.fb.group({
            id: this.fb.control(product.id),
            title: this.fb.control(product.title),
            price: this.fb.control(product.price),
            quantity: this.fb.control(product.quantity),
          })
        )
      ),
    });
  }

  get products() {
    return (this.formOrder.get('products') as FormArray)?.value;
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

  closeOrder() {
    if (this.formOrder.valid) {
      this.fecharModal();
      window.alert('Seu pedido foi concluído com sucesso!');
      return;
    }
    console.log(this.formOrder);
  }
}
