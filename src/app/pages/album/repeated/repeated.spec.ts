import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repeated } from './repeated';

describe('Repeated', () => {
  let component: Repeated;
  let fixture: ComponentFixture<Repeated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Repeated]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Repeated);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
