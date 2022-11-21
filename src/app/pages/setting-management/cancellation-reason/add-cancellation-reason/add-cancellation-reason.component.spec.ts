import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCancellationReasonComponent } from './add-cancellation-reason.component';

describe('AddCancellationReasonComponent', () => {
  let component: AddCancellationReasonComponent;
  let fixture: ComponentFixture<AddCancellationReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCancellationReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCancellationReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
