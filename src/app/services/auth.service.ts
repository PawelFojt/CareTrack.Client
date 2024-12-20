import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiUrl = 'https://localhost:7081/auth';
  private loggedInUser: string | null = null;
  private role: string | null = null;

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<{token: string, username: string, role: number}> {
    return this.http.post<{token: string, username: string, role: number}>(`${this.apiUrl}/login`, { username, password });
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.loggedInUser = null;
    this.role = null;
  }

  setLoggedInUser(username: string, role: number) {
    let roleString: string;
    switch (role) {
      case 0:
        roleString = 'Doctor';
        break;
      case 1:
        roleString = 'Patient';
        break;
      default:
        roleString = "Unknown";
        break;
    }

    this.loggedInUser = username;
    this.role = roleString;
    localStorage.setItem('username', username);
    localStorage.setItem('role', roleString);
  }

  getLoggedInUser(): string | null {
    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem('username');
    }
    return this.loggedInUser;
  }
}
