import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Sticker } from '../../models/sticker.model';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.html',
  styleUrl: './album.scss',
})
export class Album implements OnInit {
  username: string = 'Lorenzzo Lino';

  stickersNotOwned: Sticker[] = [];
  currentPageNotOwned: number = 0;
  totalPagesNotOwned: number = 0;
  totalStickers: number = 0;

  stickersRepeated: Sticker[] = [];
  currentPageRepeated: number = 0;
  totalPagesRepeated: number = 0;
  totalStickersRepeated: number = 0;


  selectedToTrade: any[] = [];

  selectedOffers: any[] = [];


  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private cardsService: CardsService
  ) { }

  ngOnInit() {
    this.loadDataNotOwned();
    this.loadDataRepeated();
  }

  loadCountOwned() {
    this.cardsService.getCountOwned().subscribe({
      next: data => {
        this.totalStickers = data;
      }
    });
  }

  loadDataRepeated(page: number = 0) {

    this.cardsService.getByRepeated(page, 24).subscribe({
      next: data => {
        console.log('Dados repeated recebidos:', data);
        this.stickersRepeated = [...this.stickersRepeated, ...data.content];
        this.currentPageRepeated = data.number;
        this.totalPagesRepeated = data.totalPages;
        this.totalStickersRepeated = data.totalElements;
      },
      error: err => {
        console.error('Erro:', err);
        alert('Erro de conexão. Por favor, tente novamente mais tarde.');
      }
    });
  }

  loadDataNotOwned(page: number = 0) {

    this.cardsService.getAll(page, 24).subscribe({
      next: data => {
        console.log('Dados not-owned recebidos:', data);
        this.stickersNotOwned = data.content;
        this.currentPageNotOwned = data.number;
        this.totalPagesNotOwned = data.totalPages;
        this.totalStickers = data.totalElements;
      },
      error: err => {
        console.error('Erro:', err);
        alert('Erro de conexão. Por favor, tente novamente mais tarde.');

      },
      complete: () => {
        console.log('Finalizado');
      }
    });
  }
  nextPageNotOwned() {
    if (this.currentPageNotOwned < this.totalPagesNotOwned - 1) {
      this.loadDataNotOwned(this.currentPageNotOwned + 1);
    }
  }

  previousPageNotOwned() {
    if (this.currentPageNotOwned > 0) {
      this.loadDataNotOwned(this.currentPageNotOwned - 1);
    }
  }

  nextPageRepeated() {
    if (this.currentPageRepeated < this.totalPagesRepeated - 1) {
      this.loadDataRepeated(this.currentPageRepeated + 1);
    }
  }

  previousPageRepeated() {
    if (this.currentPageRepeated > 0) {
      this.loadDataRepeated(this.currentPageRepeated - 1);
    }
  }

  getOwnedCount() { //TODO faltando ajustar para pegar do backend
    return this.stickersNotOwned.filter(s => s.owned).length;
  }

  getRepeatedCount() {
    return this.stickersRepeated.filter(s => s.repeated).length;
  }

  getMissingCount() {
    return this.stickersNotOwned.filter(s => !s.owned).length;
  }

  getProgress() {
    return (this.getOwnedCount() / this.totalStickers) * 100;
  }

  getTradeStickers() {
    return this.stickersRepeated.filter(s => s.repeated);
  }

  getMissingStickers() {
    return this.stickersNotOwned.filter(s => !s.owned);
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
