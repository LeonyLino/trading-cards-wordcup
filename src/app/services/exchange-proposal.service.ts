import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { LoginService } from "./login.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ExchangeProposalService {
    private readonly API_URL = `${environment.apiUrl}/exchange-proposal`;

    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) { }

    submit(proposal: any): Observable<any> {
        const payload = {
            ...proposal,
        };
        return this.http.post(this.API_URL, payload);
    }

    getAll(): Observable<any> {
        return this.http.get(this.API_URL, {
            headers: this.loginService.getHeaders()
        });
    }
}