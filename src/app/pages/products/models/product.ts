export enum EUnit {
  'KG' = 'KG',
  'UN' = 'UN',
  'ML' = 'ML',
  'L' = 'L',
  'CX' = 'CX',
  'PÇ' = 'PÇ',
  'G' = 'G',
}

export enum ECategory {
  'Pães e bolos' = 'Pães e bolos',
  'Doces' = 'Doces',
  'Sorvetes' = 'Sorvetes',
  'Salgados' = 'Salgados',
}

type IUnit = 'KG' | 'UN' | 'ML' | 'L' | 'CX' | 'PÇ' | 'G';

export interface IProduct {
  id?: string;
  title: string;
  price: number;
  measurementUnit: IUnit;
  measurementValue: number;
  stock: number;
  category: string;
  description?: string;
  quantity?: number;
  image?: string;
}
