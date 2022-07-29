import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../models/product';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  private dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  public products: Product[] = [
    { id: 1, name: 'Product 1', description: 'description 1', brand: 'Michelin', price: 100, size: '235/35/19', img: 'https://cdn.tiresleader.com/static/img/tyre_small_nologo/954747.jpg' },
    { id: 2, name: 'Product 2', description: 'description 2', brand: 'Michelin', price: 200, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'description 3', brand: 'Michelin', price: 300, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', description: 'description 4', brand: 'Michelin', price: 400, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Product 5', description: 'description 5', brand: 'Michelin', price: 500, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Product 6', description: 'description 6', brand: 'Michelin', price: 600, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Product 7', description: 'description 7', brand: 'Michelin', price: 700, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Product 8', description: 'description 8', brand: 'Michelin', price: 800, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Product 9', description: 'description 9', brand: 'Michelin', price: 900, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Product 10', description: 'description 10', brand: 'Michelin', price: 1000, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 11, name: 'Product 11', description: 'description 11', brand: 'Michelin', price: 1100, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 12, name: 'Product 12', description: 'description 12', brand: 'Michelin', price: 1200, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 13, name: 'Product 13', description: 'description 13', brand: 'Michelin', price: 1300, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 14, name: 'Product 14', description: 'description 14', brand: 'Michelin', price: 1400, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 15, name: 'Product 15', description: 'description 15', brand: 'Michelin', price: 1500, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 16, name: 'Product 16', description: 'description 16', brand: 'Michelin', price: 1600, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 17, name: 'Product 17', description: 'description 17', brand: 'Michelin', price: 1700, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 18, name: 'Product 18', description: 'description 18', brand: 'Michelin', price: 1800, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 19, name: 'Product 19', description: 'description 19', brand: 'Michelin', price: 1900, size: '235/35/19', img: 'https://via.placeholder.com/150' },
    { id: 20, name: 'Product 20', description: 'description 20', brand: 'Michelin', price: 2000, size: '235/35/19', img: 'https://via.placeholder.com/150' },
  ];
  public filteredProducts: Product[] = [];

  public length: number = 5;
  public pageSize: number = 8;
  public pageIndex: number = 0;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.filteredProducts = this.products;
    this.filteredProducts = this.paginate(this.products, this.pageSize, this.pageIndex + 1);
    this.length = this.products.length;
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.products;
    this.dataSource.paginator = this.paginator;
  }

  handlePage(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.filteredProducts = this.paginate(this.products, this.pageSize, this.pageIndex + 1);
  }

  paginate(array: any[], page_size: number, page_number: number): any[] {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  addToCart(product: Product, qty: string): void {
    let quantity: number = parseInt(qty);
    if (quantity <= 0) {
      this.snackBar.open('La quantité doit être positive', '', { duration: 2500, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['snack-bar-container', 'warn'] });
      return;
    }

    this.dataService.addProductToCart({ product, quantity });
    this.snackBar.open('Produit ajouté au panier', '', { duration: 2200, horizontalPosition: 'right', verticalPosition: 'top', panelClass: 'snack-bar-container' });
  }

}

