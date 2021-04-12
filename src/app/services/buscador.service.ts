import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private http: HttpClient) { }
  private url: any = 'http://35.167.62.109/storeutags/'


  public getCategorias() {
    return this.http.get(`${this.url}catalogs/categories`).toPromise()
  }
  public getItemByText(text: string) {
    return this.http.get(`${this.url}catalogs/items/by_text/${text}`).toPromise()
  }
  public getItemByCategory(text: string) {
    return this.http.get(`${this.url}catalogs/items/by_category/${text}`).toPromise()
  }
}
