import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderCircular } from './preloader-circular';

describe('PreloaderCircular', () => {
  let component: PreloaderCircular;
  let fixture: ComponentFixture<PreloaderCircular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreloaderCircular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloaderCircular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
