import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaterialOrderComponent } from './view-material-order.component';

describe('ViewMaterialOrderComponent', () => {
  let component: ViewMaterialOrderComponent;
  let fixture: ComponentFixture<ViewMaterialOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMaterialOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMaterialOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
