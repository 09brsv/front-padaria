import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IOrder, IProduct, TValueChange } from 'src/app/pages/products/models';

// const body = document.querySelector('body');

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.scss'],
})
export class ModalOrderComponent implements OnInit, OnChanges {
[x: string]: any;
  statusModal = true;
  formOrder!: FormGroup;
  negativeIcon = faMinus;
  positiveIcon = faPlus;

  @ViewChild('content') content!: TemplateRef<ElementRef>;
  @Input() modalAberto!: boolean;
  @Input({ required: true }) order!: IOrder;
  @Output() mudouModal = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']) {
      const order = changes['order'].currentValue;
      this.formOrder?.patchValue({
        amount: order.amount,
        status: order.status,
      });
      order.products.forEach((product: IProduct) => {
        this.products.push(this.fb.group({
          id: this.fb.control(product.id),
          title: this.fb.control(product.title),
          price: this.fb.control(product.price),
          quantity: this.fb.control(product.quantity),
        }))
      })
    }
  }
  ngOnInit(): void {
    this.formOrder = this.fb.group({
      amount: this.fb.control(this.order.amount),
      formatPayment: this.fb.control(this.order.formatPayment),
      status: this.fb.control(this.order.status),
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
    console.log(this.order)
  }
  teste(u: any) {
    console.log(u)
  }

  open(content: TemplateRef<ElementRef>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  get products() {
    return (this.formOrder.get('products') as FormArray).controls as FormGroup[];
  }

  getProductGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  getProductControl(index: number) {
    return this.products.at(index) as FormGroup;
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
