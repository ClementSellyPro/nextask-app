import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/Auth.model';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private token = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.token.asObservable();

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<string> {
    const newUser = {
      username: username,
      password: password,
    };

    return this.http.post<any>(`${this.apiUrl}/auth/register`, newUser, {
      responseType: 'text' as 'json',
    });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.next(null);
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token} ` } : {};
  }
}
