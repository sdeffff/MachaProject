import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { productModel } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class JeansService {
  //create product.service.ts
  //where will be all of the apis for pages(bags, wallets, jeans)
  //and one method(f.e.) that we will call in components, that will decide what apis to call
  //or no and just create service for every page, but I idk actually :/

  private apiUrl = "http://localhost:3000/products/jeans";

  constructor(private http: HttpClient) {};

  //Getting json data from back-end api we have on server.js:
  getJeans():Observable<any> {
    return this.http.get<any>(this.apiUrl); 
  }

  //Adding one jeans to db
  postJeans(jeans: productModel):Observable<any> {
    return this.http.post<any>(this.apiUrl, jeans);
  }
}