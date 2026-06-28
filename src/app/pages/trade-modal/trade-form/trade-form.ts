import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ExchangeProposalService } from '../../../services/exchange-proposal.service';

@Component({
  selector: 'app-trade-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './trade-form.html',
  styleUrl: './trade-form.scss',
  providers: [provideNgxMask()],
  standalone: true,
})
export class TradeForm {

  wanted: any[] = [];
  offered: any[] = [];

  name = '';
  phone = '';

  constructor(
    private router: Router,
    private exchangeProposalService: ExchangeProposalService
  ) { }

  ngOnInit() {

    console.log('TradeForm iniciado');

    const nav = history.state;

    console.log(nav);

    this.wanted = nav.wanted || [];
    this.offered = nav.offered || [];

  }

  submitted = false;


  private sendRateToWhatsapp() {
    const mensagem =
      `*🔁 Proposta de troca 🔁*
        Olá, sou ${this.name} e estou interessado em trocar figurinhas do álbum da Copa 2026. 
        Aqui estão os detalhes da minha proposta:
        Ofereço: ${this.offered.map(s => `#${s.code} - ${s.name} (${s.selection})`).join(', ')}
        Por: ${this.wanted.map(s => `#${s.code} - ${s.name} (${s.selection})`).join(', ')}
        Se estiver interessado, por favor, me avise! Obrigado!`;
    const numero = '5583987809786';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
  }

  submit() {
    const payload = {
      name: this.name,
      phone: this.phone,
      wanted: this.wanted.map(item => item.code).join(','),
      offered: this.offered.map(item => item.code).join(',')
    };

    this.exchangeProposalService.submit(payload).subscribe({
      next: () => {
        alert('Proposta enviada com sucesso! Você será redirecionado para o álbum em breve.');
      },
      error: err => {
        console.error('Erro ao enviar proposta:', err);
        alert('Ocorreu um erro ao enviar sua proposta. Por favor, tente novamente mais tarde.');
      }
    });

    this.submitted = true;

    this.sendRateToWhatsapp();

    // redireciona depois de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/album']);
    }, 5000);
  }

}
