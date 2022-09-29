import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product';
import { Order } from 'src/app/models/order';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders: Order[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  getTotalPrice(order: Order): number {
    let totalPrice: number = 0;

    if (order.products) {
      order.products.forEach((cartProduct: CartProduct) => {
        if (!cartProduct.product || !cartProduct.product.price) return;
        totalPrice += cartProduct.product.price * cartProduct.quantity;
      });
    }

    return totalPrice;
  }

}
