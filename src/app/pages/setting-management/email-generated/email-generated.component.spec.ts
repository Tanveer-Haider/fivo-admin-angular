import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailGeneratedComponent } from './email-generated.component';

describe('EmailGeneratedComponent', () => {
  let component: EmailGeneratedComponent;
  let fixture: ComponentFixture<EmailGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailGeneratedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
