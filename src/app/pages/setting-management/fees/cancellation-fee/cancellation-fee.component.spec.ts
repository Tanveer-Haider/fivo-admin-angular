import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationFeeComponent } from './cancellation-fee.component';

describe('CancellationFeeComponent', () => {
  let component: CancellationFeeComponent;
  let fixture: ComponentFixture<CancellationFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
