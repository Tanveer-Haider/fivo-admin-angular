import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryVehicleAddComponent } from './delivery-vehicle-add.component';

describe('DeliveryVehicleAddComponent', () => {
  let component: DeliveryVehicleAddComponent;
  let fixture: ComponentFixture<DeliveryVehicleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryVehicleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryVehicleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
