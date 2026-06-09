import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { PageResponse } from '../models/PageResponse.model';
import { Sticker } from '../models/sticker.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {

  private readonly API_URL = `${environment.apiUrl}/cards`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(page = 0, size = 24): Observable<PageResponse<Sticker>> {
    return this.http.get<PageResponse<Sticker>>(`${this.API_URL}?page=${page}&size=${size}`);
  }

  getByNotOwned(page = 0, size = 24): Observable<PageResponse<Sticker>> {
    return this.http.get<PageResponse<Sticker>>(`${this.API_URL}/not-owned?page=${page}&size=${size}`);
  }

  getByRepeated(page = 0, size = 24): Observable<PageResponse<Sticker>> {
    return this.http.get<PageResponse<Sticker>>(`${this.API_URL}/repeated?page=${page}&size=${size}`);
  }

  getCountOwned(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/count`);
  }

}
