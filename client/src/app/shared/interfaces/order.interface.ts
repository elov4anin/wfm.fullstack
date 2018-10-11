export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
}


export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}
