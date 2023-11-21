import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProduct } from 'src/app/pages/products/models';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  @ViewChild('content') content!: TemplateRef<ElementRef>;

  formProduto!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal
    ) {
    this.formProduto = this.fb.group({
      quantity: [1],
    });
  }

  // fecharModal() {
  //   this.statusModal = false;
  //   this.mudouModal.emit(this.statusModal);
  //   // body.style.overflow = "scroll"
  // }

  // esconderScroll() {
  //   if (this.statusModal == true) {
  //     // body.style.overflow = "hidden";
  //   }
  // }

  // abrirModal() {
  //   this.statusModal = true;
  //   this.mudouModal.emit(this.statusModal);
  //   // body.style.overflow = "scroll"
  // }
  closeResult = '';

	open(content: TemplateRef<ElementRef>) {
		console.log("🚀 ~ file: modal-product.component.ts:52 ~ ModalProductComponent ~ open ~ content:", content)
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
