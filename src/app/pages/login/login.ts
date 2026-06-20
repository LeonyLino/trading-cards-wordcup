import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { PreloaderCircular } from "../../core/preloader-circular/preloader-circular";
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, PreloaderCircular],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  login() {
    this.loading = true;


    const loginData: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.loginService.login(loginData).subscribe({
      next: (response) => {
        sessionStorage.setItem('token', response.token);
        this.loginService.setUser(response);
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.loading = false;
      }
    });
  }


}
