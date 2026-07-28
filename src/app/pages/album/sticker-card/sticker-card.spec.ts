import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sticker } from '../../../models/sticker.model';
import { StickerCard } from './sticker-card';

@Component({
  template: `
    <app-sticker-card [sticker]="sticker">
      <div actions>Action button</div>
    </app-sticker-card>
  `,
  imports: [StickerCard]
})
class TestHostComponent {
  sticker: Sticker = {
    id: 1,
    code: '001',
    name: 'Figura',
    imageUrl: '',
    qtd: 1,
    selection: 'A',
    owned: true,
    repeated: false,
  };
}

describe('StickerCard', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render projected actions content', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.textContent).toContain('Action button');
  });
});
