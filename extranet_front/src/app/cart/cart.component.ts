import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/cart-product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: CartProduct[] = [
    { product: { id: 1, name: 'Product 1', description: 'Product 1', brand: 'Michelin', price: 10, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 1 },
    { product: { id: 2, name: 'Product 2', description: 'Product 2', brand: 'Michelin', price: 20, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 2 },
    { product: { id: 3, name: 'Product 3', description: 'Product 3', brand: 'Michelin', price: 30, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 3 },
    { product: { id: 4, name: 'Product 4', description: 'Product 4', brand: 'Michelin', price: 40, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 4 },
    { product: { id: 5, name: 'Product 5', description: 'Product 5', brand: 'Michelin', price: 50, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 5 },
    { product: { id: 6, name: 'Product 6', description: 'Product 6', brand: 'Michelin', price: 60, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 6 },
    { product: { id: 7, name: 'Product 7', description: 'Product 7', brand: 'Michelin', price: 70, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 7 },
    { product: { id: 8, name: 'Product 8', description: 'Product 8', brand: 'Michelin', price: 80, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 8 },
    { product: { id: 9, name: 'Product 9', description: 'Product 9', brand: 'Michelin', price: 90, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 9 },
    { product: { id: 10, name: 'Product 10', description: 'Product 10', brand: 'Michelin', price: 100, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' }, quantity: 10 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  removeProductQuantity(product: CartProduct): void {
    // TODO
  }

  addProductQuantity(product: CartProduct, qty: string): void {
    let qtyNumber = parseInt(qty);
    // TODO
  }

  removeProductFromCart(product: CartProduct): void {
    // TODO
  }

  parseNumber(number: string): number {
    return parseInt(number);
  }

}
