import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

export interface Medicine {
  id?: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

export interface ApiResponse<T> {
  value: T;
  isError: boolean;
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = 'https://localhost:7081/medicine';

  constructor(private http: HttpClient) { }

  // Pobieranie leków
  getMedicines(): Observable<Medicine[]> {
    return this.http.get<ApiResponse<Medicine[]>>(this.apiUrl).pipe(
      map(response => response.value)
    );
  }

  // Dodawanie nowego leku
  addMedicine(medicine: Medicine): Observable<ApiResponse<Medicine>> {
    const payload = { Medicine: medicine };
    return this.http.post<ApiResponse<Medicine>>(this.apiUrl, payload);
  }
}
