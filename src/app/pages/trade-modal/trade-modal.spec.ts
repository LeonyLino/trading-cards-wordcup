import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeModal } from './trade-modal';

describe('TradeModal', () => {
  let component: TradeModal;
  let fixture: ComponentFixture<TradeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
