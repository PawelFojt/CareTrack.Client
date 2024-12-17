import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  phoneNumber: string;
  admission: string;
  discharge: string;
}

export interface UserResponse {
  value: User[];
  isError: boolean;
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7081/patient';

  constructor(private http: HttpClient) { }

  // Pobieranie listy użytkowników
  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.apiUrl);
  }

  // Dodawanie nowego użytkownika (pacjenta)
  addUser(user: User): Observable<User> {
    const payload = {
      patient: user
    };

    return this.http.post<User>(this.apiUrl, payload);
  }

// Pobieranie szczegółów użytkownika po id
  getUserById(userId: string): Observable<{ value: User, isError: boolean, statusCode: number, message: string }> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<{ value: User, isError: boolean, statusCode: number, message: string }>(url);
  }

}
