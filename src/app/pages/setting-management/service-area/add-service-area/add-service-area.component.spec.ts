import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceAreaComponent } from './add-service-area.component';

describe('AddServiceAreaComponent', () => {
  let component: AddServiceAreaComponent;
  let fixture: ComponentFixture<AddServiceAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
