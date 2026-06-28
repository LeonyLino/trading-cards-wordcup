import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary {

  @Input()
  owned = 0;

  @Input()
  repeated = 0;

  @Input()
  missing = 0;
}
