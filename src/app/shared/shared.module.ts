import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ModalOrderComponent } from './components/modal-order/modal-order.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SlicePipe } from './pipes';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [ModalOrderComponent, HeaderComponent, FooterComponent, SlicePipe, CartComponent],
  imports: [CommonModule, HttpClientModule, CurrencyPipe, FontAwesomeModule],
  exports: [FooterComponent, HeaderComponent, CartComponent, ModalOrderComponent, CommonModule, FontAwesomeModule],
})
export class SharedModule {}
