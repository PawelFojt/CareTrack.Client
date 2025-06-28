import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthTrend, TrendAnalysis } from '../models/health-trend.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
  private apiUrl = 'https://localhost:7081/health-trends';

  constructor(private http: HttpClient) { }

  getPatientTrends(patientId: number): Observable<Result<HealthTrend[]>> {
    return this.http.get<Result<HealthTrend[]>>(`${this.apiUrl}/patient/${patientId}`);
  }

  getTrendAnalysis(patientId: number, period: string): Observable<Result<TrendAnalysis>> {
    return this.http.get<Result<TrendAnalysis>>(`${this.apiUrl}/analysis/${patientId}?period=${period}`);
  }

  addHealthMeasurement(trend: HealthTrend): Observable<HealthTrend> {
    return this.http.post<HealthTrend>(this.apiUrl, trend);
  }
}

