import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutoNotificationComponent } from './edit-auto-notification.component';

describe('EditAutoNotificationComponent', () => {
  let component: EditAutoNotificationComponent;
  let fixture: ComponentFixture<EditAutoNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAutoNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAutoNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
