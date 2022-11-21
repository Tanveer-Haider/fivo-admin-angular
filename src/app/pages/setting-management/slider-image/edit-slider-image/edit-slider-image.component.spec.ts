import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSliderImageComponent } from './edit-slider-image.component';

describe('EditSliderImageComponent', () => {
  let component: EditSliderImageComponent;
  let fixture: ComponentFixture<EditSliderImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSliderImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSliderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
