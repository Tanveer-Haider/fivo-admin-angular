import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticLogoutTimeComponent } from './automatic-logout-time.component';

describe('AutomaticLogoutTimeComponent', () => {
  let component: AutomaticLogoutTimeComponent;
  let fixture: ComponentFixture<AutomaticLogoutTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomaticLogoutTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticLogoutTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
