import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sticker } from '../../../models/sticker.model';

@Component({
  selector: 'app-sticker-card',
  imports: [],
  templateUrl: './sticker-card.html',
  styleUrl: './sticker-card.scss',
})
export class StickerCard {

  @Input({ required: true }) sticker!: Sticker;

  @Input() selectable = false;

  @Input() selected = false;

  @Input() variant: 'default' | 'trade' | 'missing' | 'owned' = 'default';

  @Output() cardClick = new EventEmitter<Sticker>();

  onCardClick() {
    this.cardClick.emit(this.sticker);
  }

}
