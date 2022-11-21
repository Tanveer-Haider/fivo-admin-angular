import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaticContentComponent } from './view-static-content.component';

describe('ViewStaticContentComponent', () => {
  let component: ViewStaticContentComponent;
  let fixture: ComponentFixture<ViewStaticContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStaticContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStaticContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
