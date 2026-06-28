import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input({ required: true })
  page = 0;

  @Input({ required: true })
  totalPages = 0;

  @Output()
  next = new EventEmitter<void>();

  @Output()
  previous = new EventEmitter<void>();

  get firstPage(): boolean {
    return this.page === 0;
  }

  get lastPage(): boolean {
    return this.page >= this.totalPages - 1;
  }

  onPrevious() {
    if (!this.firstPage) {
      this.previous.emit();
    }
  }

  onNext() {
    if (!this.lastPage) {
      this.next.emit();
    }
  }
}
