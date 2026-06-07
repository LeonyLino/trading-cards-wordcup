import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotOwned } from './not-owned';

describe('NotOwned', () => {
  let component: NotOwned;
  let fixture: ComponentFixture<NotOwned>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotOwned]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotOwned);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
