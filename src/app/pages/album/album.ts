import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Sticker } from '../../models/sticker.model';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  imports: [CommonModule],
  templateUrl: './album.html',
  styleUrl: './album.scss',
})
export class Album implements OnInit {
  @Input() username: string = 'Lorenzzo Lino';
  @Input() stickers: Sticker[] = [];
  totalStickers: number = 980;
  selectedToTrade: any[] = [];

  selectedOffers: any[] = [];


  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadMock(); // depois troca por API
  }

  loadMock() {
    this.stickers = [
      {
        id: 1,
        playerName: 'Lorenzzo Aciole',
        team: 'Brasil',
        countryCode: 'BR',
        acronym: 'BRA',
        number: '001',
        imageUrl: 'https://res.cloudinary.com/dmdqo7ill/image/upload/v1779228624/lorenzzo-copa_sqindw.jpg',
        owned: false,
        repeated: false
      },
      {
        id: 2,
        playerName: 'Neymar Jr',
        team: 'Brasil',
        countryCode: 'BR',
        acronym: 'BRA',
        number: '010',
        imageUrl: 'https://res.cloudinary.com/dmdqo7ill/image/upload/v1779228624/lorenzzo-copa_sqindw.jpg',
        owned: true,
        repeated: true
      },
      {
        id: 3,
        playerName: 'Messi',
        team: 'Argentina',
        countryCode: 'ARG',
        acronym: 'ARG',
        number: '100',
        imageUrl: 'https://res.cloudinary.com/dmdqo7ill/image/upload/v1779228624/lorenzzo-copa_sqindw.jpg',
        owned: true,
        repeated: true
      },
      {
        id: 4,
        playerName: 'Ronaldo',
        team: 'Brasil',
        countryCode: 'BR',
        acronym: 'BRA',
        number: '007',
        imageUrl: 'https://res.cloudinary.com/dmdqo7ill/image/upload/v1779228624/lorenzzo-copa_sqindw.jpg',
        owned: false,
        repeated: false
      }
    ];
  }

  getOwnedCount() {
    return this.stickers.filter(s => s.owned).length;
  }

  getRepeatedCount() {
    return this.stickers.filter(s => s.repeated).length;
  }

  getMissingCount() {
    return this.stickers.filter(s => !s.owned).length;
  }

  getProgress() {
    return (this.getOwnedCount() / this.totalStickers) * 100;
  }

  getTradeStickers() {
    return this.stickers.filter(s => s.repeated);
  }

  getMissingStickers() {
    return this.stickers.filter(s => !s.owned);
  }

  toggleOfferSelection(sticker: any) {
    const exists = this.selectedOffers.some(s => s.id === sticker.id);

    if (exists) {
      this.selectedOffers = this.selectedOffers.filter(s => s.id !== sticker.id);
    } else {
      this.selectedOffers = [...this.selectedOffers, sticker];
    }
  }

  isOfferSelected(sticker: any): boolean {
    return this.selectedOffers.some(s => s.id === sticker.id);
  }

  openTradeModal(sticker: any) {
    this.selectedToTrade = { ...sticker }; // nova referência
    this.selectedOffers = [];

    this.cd.detectChanges(); // força render

    requestAnimationFrame(() => {
      const modal = new bootstrap.Modal(
        document.getElementById('tradeModal')!
      );
      modal.show();
    });
  }
  toggleSticker(sticker: any) {
    const exists = this.selectedOffers.some(s => s.id === sticker.id);

    if (exists) {
      this.selectedOffers = this.selectedOffers.filter(s => s.id !== sticker.id);
    } else {
      this.selectedOffers = [...this.selectedOffers, sticker];
    }

    console.log('Selecionadas:', this.selectedOffers);
  }

  isSelected(sticker: any): boolean {
    return this.selectedOffers.some(s => s.id === sticker.id);
  }

  toggleTradeSelection(sticker: any) {
    const exists = this.selectedToTrade.some(s => s.id === sticker.id);

    if (exists) {
      this.selectedToTrade = this.selectedToTrade.filter(s => s.id !== sticker.id);
    } else {
      this.selectedToTrade = [...this.selectedToTrade, sticker];
    }
  }

  isTradeSelected(sticker: any): boolean {
    return this.selectedToTrade.some(s => s.id === sticker.id);
  }

  openTradeModalMultiple() {

    if (this.selectedToTrade.length === 0) return;

    // this.selectedOffers = [...this.selectedToTrade];

    this.cd.detectChanges();

    requestAnimationFrame(() => {
      const modal = new bootstrap.Modal(
        document.getElementById('tradeModal')!
      );
      modal.show();
    });
  }

  submitTrade() {

    const modalEl = document.getElementById('tradeModal');

    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    }

    // limpeza extra (boa prática)
    document.body.classList.remove('modal-open');
    document.querySelectorAll('.modal-backdrop')
      .forEach(el => el.remove());

    this.router.navigate(['/trade'], {
      state: {
        wanted: this.selectedToTrade,
        offered: this.selectedOffers
      }
    });
  }
}
