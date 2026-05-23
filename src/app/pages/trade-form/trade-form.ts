import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-trade-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './trade-form.html',
  styleUrl: './trade-form.scss',
  providers: [provideNgxMask()],
})
export class TradeForm {

  wanted: any[] = [];
  offered: any[] = [];

  name = '';
  phone = '';

  constructor(private router: Router) { }

  ngOnInit() {
    const nav = history.state;

    this.wanted = nav.wanted || [];
    this.offered = nav.offered || [];
  }

  submitted = false;

  submit() {
    const payload = {
      name: this.name,
      phone: this.phone,
      wanted: this.wanted,
      offered: this.offered
    };

    console.log('Proposta final:', payload);

    this.submitted = true;

    // redireciona depois de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/album']);
    }, 5000);
  }

}
