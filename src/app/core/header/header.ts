import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() username: string = 'Lorenzzo Lino';
  @Input() team: string = 'Brasil';
  @Input() countryCode: string = 'BR';
  @Input() owned: number = 0;
  @Input() total: number = 0;

  get progress(): number {
    if (!this.total) return 0;
    return (this.owned / this.total) * 100;
  }
}
