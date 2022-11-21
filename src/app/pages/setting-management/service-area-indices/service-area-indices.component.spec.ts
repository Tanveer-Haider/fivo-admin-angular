import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAreaIndicesComponent } from './service-area-indices.component';

describe('ServiceAreaIndicesComponent', () => {
  let component: ServiceAreaIndicesComponent;
  let fixture: ComponentFixture<ServiceAreaIndicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAreaIndicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAreaIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
