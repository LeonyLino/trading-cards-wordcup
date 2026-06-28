import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { FilterInput } from '../../core/filter-input/filter-input';
import { Pagination } from '../../core/pagination/pagination';
import { Sticker } from '../../models/sticker.model';
import { StickerCard } from '../album/sticker-card/sticker-card';

@Component({
  selector: 'app-trade-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, StickerCard, Pagination, FilterInput],
  templateUrl: './trade-modal.html',
  styleUrl: './trade-modal.scss',
})
export class TradeModal implements AfterViewInit {
  @Input()
  wanted: Sticker[] = [];

  @Input()
  available: Sticker[] = [];

  @Input()
  selectedOffers: Sticker[] = [];

  @Input()
  currentPage = 0;

  @Input()
  totalPages = 0;

  @Input()
  filter = '';

  @Output()
  filterChange = new EventEmitter<string>();

  @Output()
  toggleOffer = new EventEmitter<Sticker>();

  @Output()
  nextPage = new EventEmitter<void>();

  @Output()
  previousPage = new EventEmitter<void>();

  @Output()
  confirm = new EventEmitter<void>();

  @ViewChild('modal')
  private modalElement!: ElementRef<HTMLDivElement>;

  private modal?: bootstrap.Modal;


  ngAfterViewInit() {
    console.log('AfterViewInit');
    console.log(this.modalElement);

    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  isSelected(sticker: Sticker): boolean {
    return this.selectedOffers.some(s => s.id === sticker.id);
  }

  show() {
    console.log(this.modal);
    this.modal?.show();
  }

  hide() {
    this.modal?.hide();
  }

  onConfirm() {

    this.hide();

    this.confirm.emit();

  }
}
