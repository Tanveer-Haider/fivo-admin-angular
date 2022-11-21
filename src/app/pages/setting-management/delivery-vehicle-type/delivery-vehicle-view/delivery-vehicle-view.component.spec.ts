import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryVehicleViewComponent } from './delivery-vehicle-view.component';

describe('DeliveryVehicleViewComponent', () => {
  let component: DeliveryVehicleViewComponent;
  let fixture: ComponentFixture<DeliveryVehicleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryVehicleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryVehicleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
