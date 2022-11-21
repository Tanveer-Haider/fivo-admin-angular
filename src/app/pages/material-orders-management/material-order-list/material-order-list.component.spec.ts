import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialOrderListComponent } from './material-order-list.component';

describe('MaterialOrderListComponent', () => {
  let component: MaterialOrderListComponent;
  let fixture: ComponentFixture<MaterialOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
