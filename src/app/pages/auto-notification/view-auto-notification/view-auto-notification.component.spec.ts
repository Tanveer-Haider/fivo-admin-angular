import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAutoNotificationComponent } from './view-auto-notification.component';

describe('ViewAutoNotificationComponent', () => {
  let component: ViewAutoNotificationComponent;
  let fixture: ComponentFixture<ViewAutoNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAutoNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAutoNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
