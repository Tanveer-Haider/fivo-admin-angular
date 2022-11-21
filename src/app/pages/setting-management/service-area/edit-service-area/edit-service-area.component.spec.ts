import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceAreaComponent } from './edit-service-area.component';

describe('EditServiceAreaComponent', () => {
  let component: EditServiceAreaComponent;
  let fixture: ComponentFixture<EditServiceAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServiceAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
