import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { LoginFormType, LoginRes, RegisterFormType } from '../../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
  loggedIn$ = this.loggedInSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('username')
  );
  username$ = this.usernameSubject.asObservable();

  http = inject(HttpClient);
  apiUrl = 'http://localhost:8080/api';


  setUsername(username: string | null) {
    if (username) {
      localStorage.setItem('username', username);
      this.loggedInSubject.next(true);
    } else {
      localStorage.removeItem('username');
      this.loggedInSubject.next(false);
    }
    this.usernameSubject.next(username);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.setUsername(null);
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token); 
      console.log('Decoded JWT:', decoded); 
      return decoded.role; 
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  registerUser(data: RegisterFormType) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  // loginUser(data: LoginFormType) {
  //   return this.http.post<LoginRes>(`${this.apiUrl}/login`, data);
  // }
  loginUser(data: LoginFormType) {
    return this.http.post<LoginRes>(`${this.apiUrl}/login`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
