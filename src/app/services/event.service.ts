import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string; // Format ISO string
  patientId: number;
}

export interface ApiResponse<T> {
  value: T;
  isError: boolean;
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://localhost:7081/event';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<ApiResponse<Event[]>> {
    return this.http.get<ApiResponse<Event[]>>(this.apiUrl);
  }

  addEvent(event: Partial<Event>): Observable<ApiResponse<Event>> {
    return this.http.post<ApiResponse<Event>>(this.apiUrl, event);
  }
}
