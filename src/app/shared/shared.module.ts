import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ModalOrderComponent } from './components/modal-order/modal-order.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [ModalOrderComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, CurrencyPipe],
  exports: [ModalOrderComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
