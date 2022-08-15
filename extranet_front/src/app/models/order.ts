import { CartProduct } from "./cart-product";

export interface Order {
  id: string;
  date: Date;
  products: CartProduct[];
}
