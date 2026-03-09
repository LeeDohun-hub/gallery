export type PaymentMethod = 'card' | 'bank';

export type ItemSummary = {
  id: number;
  imgPath: string;
  name: string;
  price: number;
  discountPer: number;
};

export type OrderSummary = {
  id: number;
  name: string;
  payment: PaymentMethod | string;
  amount: number;
  created: string | number;
};

export type OrderDetailItem = {
  id?: number;
  name: string;
  price?: number;
  discountPer?: number;
  imgPath?: string;
};

export type OrderDetailData = {
  id: number;
  name: string;
  address: string;
  payment: PaymentMethod | string;
  amount: number;
  created: string | number;
  items: OrderDetailItem[];
};

export type PagedResponse<T> = {
  content: T[];
  number: number;
  totalPages: number;
  totalElements: number;
};
