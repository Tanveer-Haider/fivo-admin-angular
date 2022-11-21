import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardAmountsComponent } from './reward-amounts.component';

describe('RewardAmountsComponent', () => {
  let component: RewardAmountsComponent;
  let fixture: ComponentFixture<RewardAmountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardAmountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
