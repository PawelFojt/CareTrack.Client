import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Medicine {
  id: number;
  name: string;
  quantity: number;
  expirationDate: string;
}

export interface Prescription {
  id: number;
  quantity: number;
  dosingTime: string[];
  medicines: Medicine[];
}

export interface PrescriptionResponse {
  value: Prescription[];
  isError: boolean;
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiUrl = 'https://localhost:7081/prescription';

  constructor(private http: HttpClient) { }

  getPrescriptions(): Observable<PrescriptionResponse> {
    return this.http.get<PrescriptionResponse>(this.apiUrl);
  }
}
