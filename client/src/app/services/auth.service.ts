import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
};
export type LoginFormType = {
  email: string;
  password: string;
};
export type User = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export type LoginRes = {
  accessToken: string;
  user: User;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Theo dõi trạng thái đăng nhập
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
      this.loggedInSubject.next(true); // Cập nhật trạng thái đăng nhập
    } else {
      localStorage.removeItem('username');
      this.loggedInSubject.next(false); // Người dùng đã đăng xuất
    }
    this.usernameSubject.next(username); // cập nhật username
  }

  logout() {
    localStorage.removeItem('token');
    this.setUsername(null);
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token); // Giải mã token
      console.log('Decoded JWT:', decoded); // Log nội dung giải mã
      return decoded.role; // Trả về vai trò
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
