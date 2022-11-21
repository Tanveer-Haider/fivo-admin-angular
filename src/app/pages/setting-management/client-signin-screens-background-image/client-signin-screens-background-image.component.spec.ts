import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSigninScreensBackgroundImageComponent } from './client-signin-screens-background-image.component';

describe('ClientSigninScreensBackgroundImageComponent', () => {
  let component: ClientSigninScreensBackgroundImageComponent;
  let fixture: ComponentFixture<ClientSigninScreensBackgroundImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSigninScreensBackgroundImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSigninScreensBackgroundImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
