import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: LoginService) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) return true;

        this.router.navigate(['/']);
        return false;
    }
}