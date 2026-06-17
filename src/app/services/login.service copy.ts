import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environment";
import { LoginRequest } from "../models/login-request";
import { LoginResponse } from "../models/login-response";



@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly API_URL = `${environment.apiUrl}/auth`;
    private currentUser: LoginResponse | null = null;

    constructor(private http: HttpClient) {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            this.currentUser = JSON.parse(userJson);
        }
    }

    login(login: LoginRequest): Observable<LoginResponse> {
        console.log('login service', login);
        return this.http.post<LoginResponse>(this.API_URL.concat("/login"), login);
    }

    setUser(user: LoginResponse): void {
        this.currentUser = user;
        sessionStorage.setItem('user', JSON.stringify(user)); // Salva no sessionStorage
    }

    getUser(): LoginResponse | null {
        return this.currentUser;
    }

    protected getUserToken(): string | null {
        if (typeof sessionStorage === 'undefined') {
            throw new Error('sessionStorage is not available');
        }

        const token = sessionStorage.getItem('token');
        if (token === null) {
            throw new Error('User token not found');
        }
        return token;
    }

    public getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.getUserToken()
        });
    }

    public isLoggedIn(): boolean {
        console.log('Checking if user is logged in...');
        return !!sessionStorage.getItem('token');
    }

    logout() {
        this.currentUser = null;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }

}