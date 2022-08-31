import { Size } from "./size";

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  size: Size;
  stockQuantity: number;
  imageLink?: string;
  refund?: number;
}
