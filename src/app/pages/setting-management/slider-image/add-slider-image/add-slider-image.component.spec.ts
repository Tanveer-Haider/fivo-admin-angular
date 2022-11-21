import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSliderImageComponent } from './add-slider-image.component';

describe('AddSliderImageComponent', () => {
  let component: AddSliderImageComponent;
  let fixture: ComponentFixture<AddSliderImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSliderImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSliderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
