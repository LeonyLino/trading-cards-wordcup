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

  getAll(page = 0, size = 24, code: string): Observable<PageResponse<Sticker>> {
    return this.http.get<PageResponse<Sticker>>(`${this.API_URL}?page=${page}&size=${size}&code=${code}`);
  }

  getByNotOwned(page = 0, size = 24): Observable<PageResponse<Sticker>> {
    return this.http.get<PageResponse<Sticker>>(`${this.API_URL}/not-owned?page=${page}&size=${size}`);
  }

  getNotOwnedByCode(page = 0, size = 24, code: string): Observable<PageResponse<Sticker>> {
    return this.http.get<PageResponse<Sticker>>(`${this.API_URL}/not-owned?page=${page}&size=${size}&code=${code}`);
  }

  getByRepeated(page = 0, size = 24): Observable<PageResponse<Sticker>> {
    return this.http.get<PageResponse<Sticker>>(`${this.API_URL}/repeated?page=${page}&size=${size}`);
  }

  getRepeatedByCode(page = 0, size = 24, code: string): Observable<PageResponse<Sticker>> {
    return this.http.get<PageResponse<Sticker>>(`${this.API_URL}/repeated?page=${page}&size=${size}&code=${code}`);
  }

  getCountOwned(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/count`);
  }

  setOwned(sticker: Sticker): Observable<any> {
    return this.http.patch(
      `${this.API_URL}/${sticker.id}/set-owned`,
      {}
    );
  }

  setRepeated(sticker: Sticker): Observable<any> {
    return this.http.patch(
      `${this.API_URL}/${sticker.id}/set-repeated`,
      {}
    );
  }
}
