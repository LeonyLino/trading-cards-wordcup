import { Component, OnInit } from '@angular/core';
import { Sticker } from '../../models/sticker.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  filter: 'ALL' | 'OWNED' | 'REPEATED' | 'MISSING' = 'ALL';

  stickers: Sticker[] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    private cardService: CardsService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(page: number = 0) {
    this.cardService.getAll(page).subscribe({
      next: data => {
        this.stickers = data.content;
        this.currentPage = data.number;
        this.totalPages = data.totalPages;
        console.log('data:', data);
      }
    });

  }

  toggleOwned(sticker: Sticker) {
    sticker.owned = !sticker.owned;

    if (!sticker.owned) {
      sticker.repeated = false;
    }

    this.cardService.setOwned(sticker).subscribe({
      next: () => {
        console.log('sticker updated:', sticker);
      }
    });
  }

  toggleRepeated(sticker: Sticker) {
    console.log('sticker:', sticker);
    if (!sticker.owned) return;

    sticker.repeated = !sticker.repeated;

    this.cardService.setRepeated(sticker).subscribe({
      next: () => {
        console.log('sticker updated:', sticker);
      }
    });
  }

  filteredStickers(): Sticker[] {
    switch (this.filter) {
      case 'OWNED':
        return this.stickers.filter(s => s.owned);
      case 'REPEATED':
        console.log('stickers:', this.stickers.filter(s => s.repeated));
        return this.stickers.filter(s => s.repeated);
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
    return this.stickers.filter(s => s.repeated).length;
  }

  getMissingCount() {
    return this.stickers.filter(s => !s.owned).length;
  }

  save() {
    localStorage.setItem('stickers', JSON.stringify(this.stickers));
  }
}
