import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProduct, TValueChange } from 'src/app/pages/products/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) product!: IProduct;
  @Output() addToCartEmit = new EventEmitter<IProduct>();

  @ViewChild('content') content!: TemplateRef<ElementRef>;

  formProduto!: FormGroup;
  innerWidth = window.innerWidth
  negativeIcon = faMinus;
  positiveIcon = faPlus;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal,
  ) {

  }
  ngAfterViewInit(): void {
    this.innerWidth = window.innerWidth
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if ((event.target.innerWidth < 1000 && this.innerWidth > 1000) || (event.target.innerWidth > 768 && this.innerWidth < 768)) {
      this.innerWidth = event.target.innerWidth
    }
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
    this.formProduto.get('quantity')?.setValue(1);
  }

  protected addToCart() {
    const quantity = this.formProduto.get('quantity')?.value;
    this.product.quantity = quantity + (this.product.quantity ?? 0);
    this.addToCartEmit.emit(this.product);
    this.modalService.dismissAll()
  }
}
