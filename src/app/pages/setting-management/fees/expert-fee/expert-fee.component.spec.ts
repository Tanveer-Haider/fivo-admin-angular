import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertFeeComponent } from './expert-fee.component';

describe('ExpertFeeComponent', () => {
  let component: ExpertFeeComponent;
  let fixture: ComponentFixture<ExpertFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
