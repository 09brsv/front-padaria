import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProductsModule } from './pages/products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule, ProductsModule, BrowserAnimationsModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
  },

  /* if you don't provide the currency symbol in the pipe,
  this is going to be the default symbol (R$) ... */
  {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
