import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, Validators } from '@angular/forms';
import { IconDefinition, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IOrder, IProduct, TValueChange } from 'src/app/pages/products/models';

// const body = document.querySelector('body');

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.scss'],
})
export class ModalOrderComponent implements OnInit, OnChanges {
  statusModal = true;
  formOrder!: FormGroup;
  negativeIcon = faMinus;
  positiveIcon = faPlus;
  removeIcon = faTrash;
  whatsappIcon = faWhatsapp as IconDefinition;

  @ViewChild('content') content!: TemplateRef<ElementRef>;
  @Input({ required: true }) order!: IOrder;
  @Output() mudouModal = new EventEmitter();
  @Output() productChange = new EventEmitter<string>();
  @Output() orderSendChange = new EventEmitter<IOrder>();

  subscription: Subscription[] = [];
  submitted = false
  modal!: NgbModalRef

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (changes.order?.currentValue) {
      const order = changes['order'].currentValue;
      this.formOrder?.patchValue({
        amount: order.amount,
        status: order.status,
      });
      order.products.forEach((product: IProduct) => {
        const produtoGroup = this.products.controls.findIndex(p => p.get('id')?.value === product.id);
        if (produtoGroup > -1) {
          this.products.controls.at(produtoGroup)?.patchValue({
            quantity: product.quantity,
            price: product.price
          })
        }
        else {
          this.products.controls.push(this.fb.group({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            image: product.image
          }))
          this.handleValueChange(product)
        }
      })
    }
  }
  ngOnInit(): void {
    this.formOrder = this.fb.group({
      amount: this.order.amount,
      formatPayment: this.order.formatPayment,
      status: this.order.status,
      description: this.order.description,
      whatsAppNumber: [this.order.whatsAppNumber, [Validators.required, Validators.pattern(/^[0-9]{2}9[0-9]{8}$/)]],
      products: this.fb.array(
        this.order.products.map(product =>
          this.fb.group({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            image: product.image
          })
        )
      ),
    });
  }

  handleValueChange(prod: IProduct) {
    if (this.subscription.length) {
      this.subscription.map(sub => sub.unsubscribe());
    }
    this.products?.controls.map(product => {
      if (product.get('quantity') !== null) {
        const quantity = product.get('quantity') as AbstractControl;
        this.subscription.push(quantity.valueChanges.subscribe(val => {
          const amount = this.products.controls.reduce((total: number, product) => total + (product.get('price')?.value * (product.get('quantity')?.value)), 0)
          this.formOrder.get('amount')?.setValue(amount);
        }))
      }
    })
    this.products.controls.find(p => p.get('id')?.value === prod.id)?.get('quantity')?.setValue(prod.quantity);

  }

  open(content: TemplateRef<ElementRef>) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    return this.modal
  }

  close() {
    this.modal.close()
  }

  get products() {
    return this.formOrder?.get('products') as FormArray
  }

  getProductGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  getProductControl(index: number) {
    return this.products.controls.at(index) as FormGroup;
  }

  changeProductValue(handle: TValueChange, index: number) {
    const controlQuantity = this.getProductControl(index).get('quantity');
    if (handle === 'increment') {
      controlQuantity?.setValue(controlQuantity.value + 1);
    } else {
      if (controlQuantity?.value < 2) {
        return;
      }
      controlQuantity?.setValue(controlQuantity.value - 1);
    }
  }

  removeProduct(index: number) {
    const product = this.products.controls[index].value;
    this.products.removeAt(index);
    this.productChange.emit(product.id)
  }

  public getTotal(index: number): number {
    return this.getProductControl(index).get('price')?.value * this.getProductControl(index).get('quantity')?.value
  }

  closeOrder() {
    this.submitted = true
    if (!this.formOrder.valid) {
      return
    }

    const order: IOrder = this.formOrder.getRawValue()
    order.date = new Date();
    this.orderSendChange.emit(order)
  }

  get errorsWhatsAppNumber() {
    return this.formOrder.get('whatsAppNumber')?.errors
  }
}
