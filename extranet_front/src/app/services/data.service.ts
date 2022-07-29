import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../models/cart-product';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cart: CartProduct[] = [];

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private apiBaseUrl: string, private authService: AuthService) {
    // Load cart from local storage
    let cartString = localStorage.getItem('cart');
    if (cartString) {
      let cart: CartProduct[] = JSON.parse(cartString);
      if (cart) {
        this.cart = cart;
      }
    }
  }

  // USER
  // getCongesAcquis(): Observable<number> {
  //   let params: HttpParams = new HttpParams().set('username', this.authService.currentUserValue!.username);

  //   return this.http.get<number>(this.apiBaseUrl + 'api/user/congesacquis', { params: params });
  // }

  // deleteCongeRequest(congeId: number): Observable<string> {
  //   return this.http.post<string>(this.apiBaseUrl + 'api/user/deletecongesrequest', congeId);
  // }

  // getNewUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiBaseUrl + 'api/user/newusers');
  // }

  // getNewsletter(newsletterType: NewsletterType): Observable<Newsletter> {
  //   return this.http.get<Newsletter>(this.apiBaseUrl + 'api/user/newsletter', { params: new HttpParams().set('newsletterType', newsletterType.toString()) });
  // }

  // ADMIN
  // getCongesAdmin(): Observable<{user: Conge[]}> {
  //   return this.http.get<{user: Conge[]}>(this.apiBaseUrl + 'api/admin/conges');
  // }

  // sendCongeValidation(conge: Conge): Observable<any> {
  //   return this.http.post(this.apiBaseUrl + 'api/admin/validateconge', conge)
  // }

  addProductToCart(cartProduct: CartProduct): void {
    let productAlreadyInCart: CartProduct | undefined = this.cart.find(cp => cp.product.id === cartProduct.product.id);
    if (productAlreadyInCart) {
      console.log('Product already in cart');
      console.log(productAlreadyInCart);
      productAlreadyInCart.quantity += cartProduct.quantity;
      // this.cart.find(cp => cp.product.id === cartProduct.product.id).quantity = productAlreadyInCart.quantity;
    } else {
      this.cart.push(cartProduct);
    }

    // Save cart in local storage
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  get getCart(): CartProduct[] {
    return this.cart;
  }

  get getCartLength(): number {
    return this.cart.length;
  }

}
