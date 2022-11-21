import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReferralMessageComponent } from './app-referral-message.component';

describe('AppReferralMessageComponent', () => {
  let component: AppReferralMessageComponent;
  let fixture: ComponentFixture<AppReferralMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppReferralMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReferralMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
