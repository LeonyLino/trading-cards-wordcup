import { Component } from '@angular/core';
import { Sticker } from '../../models/sticker.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  filter: 'ALL' | 'OWNED' | 'REPEATED' | 'MISSING' = 'ALL';

  stickers: Sticker[] = [];

  ngOnInit() {
    this.loadMock(); // depois troca por API
  }

  loadMock() {
    
  }

  toggleOwned(sticker: Sticker) {
    sticker.owned = !sticker.owned;

    if (!sticker.owned) {
      sticker.repeated = false;
    }

    this.save();
  }

  toggleRepeated(sticker: Sticker) {
    if (!sticker.owned) return;

    sticker.repeated = !sticker.repeated;

    this.save();
  }

  filteredStickers(): Sticker[] {
    switch (this.filter) {
      case 'OWNED':
        return this.stickers.filter(s => s.owned);
      case 'REPEATED':
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
