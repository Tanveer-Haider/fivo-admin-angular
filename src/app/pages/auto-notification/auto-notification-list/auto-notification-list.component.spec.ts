import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoNotificationListComponent } from './auto-notification-list.component';

describe('AutoNotificationListComponent', () => {
  let component: AutoNotificationListComponent;
  let fixture: ComponentFixture<AutoNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoNotificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
