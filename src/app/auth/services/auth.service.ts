import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { postRegisterData } from '../models/postRegisterData.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { };

  private apiUrl = environment.authUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true //Using withCreadentials to pass cookies to server, and add session cookies for user
  };

  login(email: string, pwd: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, { email, pwd }, this.httpOptions);
  }

  addNewUser(data: postRegisterData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users`, data, this.httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}logout`, {}, this.httpOptions);
  }

  checkUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}check-user`, this.httpOptions);
  }
}
