import { IProduct } from './product';

export enum EStatus {
  pendente = 'Pendente',
  entregue = 'Entregue',
  cancelado = 'Cancelado',
}
export interface IOrder {
  id?: string;
  description?: string;
  amount: number;
  products: IProduct[];
  formatPayment?: string;
  status: `${EStatus}`;
  date?: Date;
  whatsAppNumber?: string
}
