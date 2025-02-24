import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiUrl } from '../../../env/product_api.environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {};

  getProduct(id: string, category: string): Observable<any> {
    return this.http.get<any>(apiUrl + category + "/" + id);
  }
}
