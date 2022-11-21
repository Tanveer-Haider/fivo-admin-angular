import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSigninScreensLogoComponent } from './client-signin-screens-logo.component';

describe('ClientSigninScreensLogoComponent', () => {
  let component: ClientSigninScreensLogoComponent;
  let fixture: ComponentFixture<ClientSigninScreensLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSigninScreensLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSigninScreensLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
