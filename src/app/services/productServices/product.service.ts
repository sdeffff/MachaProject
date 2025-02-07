import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//server url where are located all of the data from database
import { apiUrl } from '../../../env/api.environment';

//interface
import { productModel } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {};

  /** 
   * function to get the products from database 
   *
   * @param category - category name that we are getting from product.component.ts
  */
  getProducts(category: string):Observable<any> {
    return this.http.get<any>(apiUrl + category); //getting data from server api depending on category
  }

  /**
   * function to post new items to database
   * 
   * @param product - data that we are pushing to database
   */
  postProduct(product: productModel):Observable<any> {
    return this.http.post<any>(apiUrl, product); //posting product data to server api
  }
}