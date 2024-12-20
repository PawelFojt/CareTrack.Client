import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface KnowledgeItem {
  id: number;
  title: string;
  description: string;
  type: number;
  url: string;
  author: string;
}

@Injectable({providedIn: 'root'})
export class KnowledgeService {
  private apiUrl = 'https://localhost:7081/knowledge';

  constructor(private http: HttpClient) {}

  getAll(): Observable<KnowledgeItem[]> {
    return this.http.get<KnowledgeItem[]>(this.apiUrl);
  }

  addKnowledgeItem(item: Partial<KnowledgeItem>): Observable<KnowledgeItem> {
    return this.http.post<KnowledgeItem>(this.apiUrl, item);
  }

  updateKnowledgeItem(id: number, item: Partial<KnowledgeItem>): Observable<KnowledgeItem> {
    return this.http.put<KnowledgeItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteKnowledgeItem(id: number, author: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${id}`, {
      body: { author }
    });
  }

}
