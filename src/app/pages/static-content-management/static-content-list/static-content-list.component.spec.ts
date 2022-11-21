import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticContentListComponent } from './static-content-list.component';

describe('StaticContentListComponent', () => {
  let component: StaticContentListComponent;
  let fixture: ComponentFixture<StaticContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticContentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
