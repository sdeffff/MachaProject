import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiUrl } from '../../../env/auth_api.environment';

import { postRegisterData } from '../models/postRegisterData.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { };

  login(email: string, pwd: string): Observable<any> {
    return this.http.post<any>(apiUrl + "login", {email, pwd});
  }

  addNewUser(data: postRegisterData): Observable<any> {
    return this.http.post<any>(apiUrl, data);
  }
}
