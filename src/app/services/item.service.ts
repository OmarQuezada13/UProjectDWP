import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private cookieService: CookieService, private http: HttpClient) { }
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private url: any = 'http://35.167.62.109/storeutags/'


  public getItem(id: number) {
    return this.http.get(`${this.url}catalogs/item_details/${id}`).toPromise()
  }
  public addCart(id: string, cantidad: number) {
    return this.http.post(`${this.url}cart/add_item`, {
      session_id: this.cookieService.get('session_id'),
      item_id: id,
      item_quantity: cantidad
    }, this.httpOptions).toPromise()

  }
  public getCart() {
    return this.http.post(`${this.url}cart/get_details`, { session_id: this.cookieService.get('session_id') }).toPromise()
  }
  public deleteItem(item_id:any){
    let data = { session_id: this.cookieService.get('session_id'),item_id:item_id }
    return this.http.request('delete',`${this.url}cart/remove_all`, {body:data}).toPromise()

  }
  public updateItem(item_id:any,item_quantity:any){
    let data = { session_id: this.cookieService.get('session_id'),item_id:item_id, item_quantity:item_quantity }
    return this.http.request('put',`${this.url}cart/update_item`, {body:data}).toPromise()

  }
  public createOrder(paypalDetails:any){
    let data = { session_id: this.cookieService.get('session_id'),paypal_payment_details:paypalDetails }
    return this.http.request('post',`${this.url}order/create`, {body:data}).toPromise()

  }
  public getOrders() {
    return this.http.post(`${this.url}order/get_orders`, { session_id: this.cookieService.get('session_id') }).toPromise()
  }
}
