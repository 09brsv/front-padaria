import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { IconDefinition, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @Input() modalAberto!: boolean;
  @Input({ required: true }) order!: IOrder;
  @Output() mudouModal = new EventEmitter();

  subscription: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'].currentValue) {
      const order = changes['order'].currentValue;
      this.formOrder?.patchValue({
        amount: order.amount,
        status: order.status,
      });
      console.log(this.formOrder?.get('amount')?.value, order.amount)
      order.products.forEach((product: IProduct) => {
        const produtoGroup = this.products.controls.findIndex(p => p.get('id')?.value === product.id);
        if (produtoGroup > -1) {
          console.log("🚀 ~ ModalOrderComponent ~ order.products.forEach ~ produtoGroup:", produtoGroup)
          this.products.controls.at(produtoGroup)?.patchValue({
            quantity: product.quantity,
            price: product.price
          })
          console.log('teste')
        }
        else {
          this.products.controls.push(this.fb.group({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
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
      products: this.fb.array(
        this.order.products.map(product =>
          this.fb.group({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
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
          console.log(amount)
        }))
      }
    })
    this.products.controls.find(p => p.get('id')?.value === prod.id)?.get('quantity')?.setValue(prod.quantity);

  }

  open(content: TemplateRef<ElementRef>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
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
    this.products.removeAt(index);
    this.handleValueChange(this.products.at(index).value);
    // todo facade emit product
  }

  public getTotal(index: number): number {
    return this.getProductControl(index).get('price')?.value * this.getProductControl(index).get('quantity')?.value
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
