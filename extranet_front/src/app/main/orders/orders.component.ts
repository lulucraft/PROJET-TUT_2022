import { Component, OnInit } from '@angular/core';
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
    this.dataService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  getTotalPrice(order: Order): number {
    let totalPrice: number = 0;

    if (order.products) {
      order.products.forEach(p => {
        totalPrice += p.product.price * p.quantity;
      });
    }

    return totalPrice;
  }

}
