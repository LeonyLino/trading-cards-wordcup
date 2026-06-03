import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Sticker } from '../models/sticker.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {

  private readonly API_URL = `${environment.apiUrl}/cards`;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getAll(): Observable<Sticker[]> {
    return this.http.get<Sticker[]>(`${this.API_URL}/all`, {
      headers: this.loginService.getHeaders()
    });

  }
  getByOwned(): Observable<Sticker[]> {
    return this.http.get<Sticker[]>(`${this.API_URL}/owned`);
  }

}
