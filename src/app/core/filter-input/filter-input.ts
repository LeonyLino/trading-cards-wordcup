import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-input',
  imports: [FormsModule],
  templateUrl: './filter-input.html',
  styleUrl: './filter-input.scss',
})
export class FilterInput {

  @Input()
  placeholder = 'Pesquisar';

  @Input()
  value = '';

  @Output()
  valueChange = new EventEmitter<string>();

  private timeout: any;

  onInput() {

    this.value = this.value.toUpperCase();

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {

      this.valueChange.emit(this.value);

    }, 400);

  }

}
