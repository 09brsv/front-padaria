import { IProduct } from './product';

export interface IOrder {
  id?: string;
  title: string;
  description?: string;
  amount: number;
  products: IProduct[];
  formatPayment: string;
  status: string;
  date: Date;
}
