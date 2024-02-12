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
  'Breads and cakes' = 'Pães e bolos',
  'candies' = 'Doces',
  'ice creams' = 'Sorvetes',
  'snacks' = 'Salgados',
  'cookies' = 'Biscoitos',
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
