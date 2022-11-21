import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomeScreenComponent } from './edit-home-screen.component';

describe('EditHomeScreenComponent', () => {
  let component: EditHomeScreenComponent;
  let fixture: ComponentFixture<EditHomeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHomeScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
