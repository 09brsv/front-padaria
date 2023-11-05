import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ModalOrderComponent } from './components/modal-order/modal-order.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ModalOrderComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, HttpClientModule, CurrencyPipe],
  exports: [FooterComponent, HeaderComponent, ModalOrderComponent, CommonModule],
})
export class SharedModule {}
