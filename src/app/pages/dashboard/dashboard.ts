import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterInput } from "../../core/filter-input/filter-input";
import { Pagination } from "../../core/pagination/pagination";
import { Sticker } from '../../models/sticker.model';
import { CardsService } from '../../services/cards.service';
import { LoginService } from '../../services/login.service';
import { StickerCard } from "../album/sticker-card/sticker-card";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, FilterInput, StickerCard, Pagination],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  filter: 'ALL' | 'OWNED' | 'REPEATED' | 'MISSING' = 'ALL';

  stickers: Sticker[] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    private cardService: CardsService,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(page: number = 0) {
    this.cardService.getAll(page, 24, this.search).subscribe({
      next: data => {
        this.stickers = data.content;
        this.currentPage = data.number;
        this.totalPages = data.totalPages;
      }
    });

  }

  toggleOwned(sticker: Sticker) {
    sticker.owned = !sticker.owned;

    if (!sticker.owned) {
      sticker.repeated = false;
      sticker.qtd = 0;
    }

    this.cardService.setOwned(sticker).subscribe({
      next: () => {
        console.log('sticker updated:', sticker);
      }
    });
  }

  private repeatedCountOf(sticker: Sticker): number {
    return sticker.qtd ?? (sticker.repeated ? 1 : 0);
  }

  isRepeated(sticker: Sticker): boolean {
    return this.repeatedCountOf(sticker) > 0;
  }

  setRepeatedCount(sticker: Sticker, count: number) {
    if (!sticker.owned) return;

    sticker.qtd = Math.max(0, count);
    sticker.repeated = sticker.qtd > 0;

    this.cardService.setRepeatedCount(sticker).subscribe({
      next: () => {
      },
      error: err => {
        console.error('Erro ao atualizar repetida:', err);
      }
    });
  }

  toggleRepeated(sticker: Sticker) {
    const current = this.repeatedCountOf(sticker);
    this.setRepeatedCount(sticker, current > 0 ? 0 : 1);

    sticker.repeated = !sticker.repeated;

    this.cardService.setRepeated(sticker).subscribe({
      next: () => {
        console.log('sticker updated:', sticker);
      }
    });
  }

  increaseRepeated(sticker: Sticker) {
    const current = this.repeatedCountOf(sticker);
    this.setRepeatedCount(sticker, current + 1);
  }

  decreaseRepeated(sticker: Sticker) {
    const current = this.repeatedCountOf(sticker);
    this.setRepeatedCount(sticker, current - 1);
  }

  filteredStickers(): Sticker[] {
    switch (this.filter) {
      case 'OWNED':
        return this.stickers.filter(s => s.owned);
      case 'REPEATED':
        return this.stickers.filter(s => this.isRepeated(s));
      case 'MISSING':
        return this.stickers.filter(s => !s.owned);
      default:
        return this.stickers;
    }
  }

  groupByTeam() {
    const groups: any = {};

    this.stickers.forEach(sticker => {
      if (!groups[sticker.selection]) {
        groups[sticker.selection] = {
          team: sticker.team,
          countryCode: sticker.code,
          stickers: []
        };
      }

      groups[sticker.selection].stickers.push(sticker);
    });

    return Object.values(groups);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.loadData(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.loadData(this.currentPage - 1);
    }
  }

  getOwnedCount() {
    return this.stickers.filter(s => s.owned).length;
  }

  getRepeatedCount() {
    return this.stickers.reduce((sum, sticker) => sum + this.repeatedCountOf(sticker), 0);
  }

  getMissingCount() {
    return this.stickers.filter(s => !s.owned).length;
  }

  search = '';

  private searchTimeout: any;

  onSearchInput() {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.loadData(0);
    }, 400);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/album']);
  }

}
