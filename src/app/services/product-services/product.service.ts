import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.productUrl;

  constructor(private http: HttpClient) {};

  getProduct(id: string, category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${category}/${id}`);
  }
}