import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { FilterInput } from "../../core/filter-input/filter-input";
import { Pagination } from "../../core/pagination/pagination";
import { Sticker } from '../../models/sticker.model';
import { CardsService } from '../../services/cards.service';
import { HeaderService } from '../../services/header.service';
import { TradeModal } from '../trade-modal/trade-modal';
import { Header } from "./header/header";
import { StickerCard } from "./sticker-card/sticker-card";
import { Summary } from "./summary/summary";

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Summary, StickerCard, Pagination, FilterInput, TradeModal],
  templateUrl: './album.html',
  styleUrl: './album.scss',
})
export class Album implements OnInit {
  username: string = 'Lorenzzo Lino';

  stickersNotOwned: Sticker[] = [];
  currentPageNotOwned: number = 0;
  totalPagesNotOwned: number = 0;
  totalNotOwnedStickers: number = 0;

  stickersRepeated: Sticker[] = [];
  currentPageRepeated: number = 0;
  totalPagesRepeated: number = 0;
  totalStickersRepeated: number = 0;

  totalOwnedStickers: number = 0;

  qtdStickersInAlbum: number = 980;


  selectedToTrade: any[] = [];
  selectedOffers: any[] = [];

  tradeFilter = '';
  missingFilter = '';

  @ViewChild(TradeModal)
  tradeModal!: TradeModal;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private cardsService: CardsService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.loadDataNotOwned();
    this.loadDataRepeated();
    this.loadCountOwned();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  loadCountOwned() {
    this.cardsService.getCountOwned().subscribe({
      next: data => {
        this.totalOwnedStickers = data;
        this.headerService.update({
          username: this.username,
          team: 'Brasil',
          countryCode: 'BR',
          owned: this.totalOwnedStickers,
          total: this.qtdStickersInAlbum
        });
      }
    });
  }

  loadDataRepeated(page: number = 0) {

    this.cardsService.getRepeatedByCode(page, 24, this.tradeFilter).subscribe({
      next: data => {
        this.stickersRepeated = data.content;
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

    this.cardsService.getNotOwnedByCode(page, 24, this.missingFilter).subscribe({
      next: data => {
        this.stickersNotOwned = data.content;
        this.currentPageNotOwned = data.number;
        this.totalPagesNotOwned = data.totalPages;
        this.totalNotOwnedStickers = data.totalElements;
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

  getMissingCount() {
    return this.qtdStickersInAlbum - this.totalOwnedStickers;
  }

  getProgress() {
    return (this.totalOwnedStickers / this.qtdStickersInAlbum) * 100;
  }

  repeatedCountOf(sticker: Sticker): number {
    return sticker.qtd ?? (sticker.repeated ? 1 : 0);
  }

  isRepeated(sticker: Sticker): boolean {
    return this.repeatedCountOf(sticker) > 0;
  }

  getTradeStickers() {
    return this.stickersRepeated.filter(s => this.isRepeated(s));
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

  toggleSticker(sticker: any) {
    const exists = this.selectedOffers.some(s => s.id === sticker.id);

    if (exists) {
      this.selectedOffers = this.selectedOffers.filter(s => s.id !== sticker.id);
    } else {
      this.selectedOffers = [...this.selectedOffers, sticker];
    }
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

    if (this.selectedToTrade.length === 0) {
      return;
    }

    this.cd.detectChanges();

    requestAnimationFrame(() => {
      this.tradeModal.show();
    });

  }

  submitTrade() {

    console.log('antes do navigate');

    this.router.navigate(['/trade'], {
      state: {
        wanted: this.selectedToTrade,
        offered: this.selectedOffers
      }
    }).then(result => {
      console.log('resultado:', result);
    }).catch(err => {
      console.error(err);
    });

  }

}
