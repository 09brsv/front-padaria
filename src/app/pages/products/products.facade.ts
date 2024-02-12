import { Injectable } from '@angular/core';
import { ProductsService } from './service/products.service';
import { ProductsState } from './state/products.state';
import { CartState } from './state/cart.state';
import { IOrder, IProduct } from './models';

@Injectable()
export class ProductsFacade {
  constructor(
    private api: ProductsService,
    private state: ProductsState,
    private cartState: CartState
  ) {}
  private readonly formatterBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  public products$ = this.state.products$;
  public cart$ = this.cartState.cart$;

  getAllProducts() {
    this.api.getAll().subscribe({
      next: res => {
        this.state.products = res.data
        .sort((a, b) => a.title.localeCompare(b.title))
        .sort((a, b) => a.category.localeCompare(b.category));
      },
    });
  }

  addToCart(product: IProduct) {
    this.cartState.add(product as Required<Pick<IProduct, "quantity">> & IProduct);
  }

  removeFromCart(id: string) {
    this.cartState.remove(id);
  }

  updateProductFromCart(product: Required<Pick<IProduct, "quantity">> & IProduct) {
    this.cartState.update(product);
  }


  sendOrder(order: IOrder) {
    const message = this.sendProductListViaWhatsApp(order);
    const numberWhatsapp = '5533999024143'
    const urlParams = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${numberWhatsapp}?text=${urlParams}`
    window.open(whatsappUrl, '_blank');
  }

  private readonly formatProductList = (products: IProduct[]): string => {
    let productListString = 'Lista de Produtos:\n';
    products.forEach((product, index) => {
        productListString += `${product.quantity} ${product.title} - ${this.formatterBRL.format(product.price * (product.quantity ?? 1))} \n`;
    });
    return productListString;
}

  private readonly sendProductListViaWhatsApp = (order: IOrder): string => {
  const dateBr = order.date?.toLocaleDateString('pt-BR');
  let message = `Status: ${order.status}\nData: ${dateBr}\n\n`;
  message += `${order.description ? `Descrição: ${order.description}\n` : ''}Eu escolhi *${order.products.length} produto${order.products.length > 1 ? 's' : ''}*\n\n`;
  if (order.products.length > 0) {
      message += `${this.formatProductList(order.products)}\n*TOTAL: ${this.formatterBRL.format(order.amount)}*`;
  } else {
      message += 'Não há produtos na lista.';
  }
  return message
}
}
