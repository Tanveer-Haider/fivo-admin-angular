import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEarningComponent } from './view-earning.component';

describe('ViewEarningComponent', () => {
  let component: ViewEarningComponent;
  let fixture: ComponentFixture<ViewEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
