import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryVehicleEditComponent } from './delivery-vehicle-edit.component';

describe('DeliveryVehicleEditComponent', () => {
  let component: DeliveryVehicleEditComponent;
  let fixture: ComponentFixture<DeliveryVehicleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryVehicleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryVehicleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
