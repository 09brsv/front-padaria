import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProduct, TValueChange } from 'src/app/pages/products/models';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
// const body = document.querySelector('body');

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {
  @Input({ required: true }) product!: IProduct;
  @Input() modalAberto?: boolean;
  statusModal = true;
  @Output() changeModal = new EventEmitter<boolean>();
  @Output() addToCartEmit = new EventEmitter<IProduct>();

  @ViewChild('content') content!: TemplateRef<ElementRef>;

  formProduto!: FormGroup;
  negativeIcon = faMinus;
  positiveIcon = faPlus;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal
    ) {
    }
    ngOnInit(): void {
      this.formProduto = this.fb.group({
        quantity: 1,
        total: this.product?.price
      });
      this.formProduto.get('quantity')?.valueChanges.subscribe({
        next: () => {
          this.formProduto.get('total')?.setValue(this.product?.price * this.formProduto.get('quantity')?.value)
        }
      })
  }

  changeProductValue(handle: TValueChange) {
    const quantity = this.formProduto.get('quantity')?.value;
    if (handle === 'increment') {
      this.formProduto.get('quantity')?.setValue(quantity + 1);
    } else {
      if (quantity < 2) {
        return;
      }
      this.formProduto.get('quantity')?.setValue(quantity - 1);
    }
  }

  closeResult = '';

	open(content: TemplateRef<ElementRef>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
	}

  protected addToCart() {
    const quantity = this.formProduto.get('quantity')?.value;
    this.product.quantity = quantity;
    this.addToCartEmit.emit(this.product);
    this.changeModal.emit(true)
    this.modalService.dismissAll()
  }
}
