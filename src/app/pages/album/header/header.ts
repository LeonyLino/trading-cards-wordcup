import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [DecimalPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  @Input({ required: true })
  username!: string;

  @Input()
  owned = 0;

  @Input()
  total = 0;

  get progress(): number {
    return this.total === 0
      ? 0
      : (this.owned / this.total) * 100;
  }



}
