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
    this.stickers = [
      {
        id: 1,
        playerName: 'Lorenzzo Aciole',
        team: 'Brasil',
        countryCode: 'BR',
        number: '001',
        imageUrl: 'https://res.cloudinary.com/dmdqo7ill/image/upload/v1779228624/lorenzzo-copa_sqindw.jpg',
        owned: false,
        repeated: false
      },
      {
        id: 2,
        playerName: 'Neymar Jr',
        team: 'Brasil',
        countryCode: 'BRA',
        number: '010',
        imageUrl: 'https://res.cloudinary.com/dmdqo7ill/image/upload/v1779228624/lorenzzo-copa_sqindw.jpg',
        owned: true,
        repeated: false
      },
      {
        id: 3,
        playerName: 'Messi',
        team: 'Argentina',
        countryCode: 'ARG',
        number: '100',
        imageUrl: 'https://res.cloudinary.com/dmdqo7ill/image/upload/v1779228624/lorenzzo-copa_sqindw.jpg',
        owned: true,
        repeated: true
      }
    ];
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
      if (!groups[sticker.team]) {
        groups[sticker.team] = {
          team: sticker.team,
          countryCode: sticker.countryCode,
          stickers: []
        };
      }

      groups[sticker.team].stickers.push(sticker);
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
