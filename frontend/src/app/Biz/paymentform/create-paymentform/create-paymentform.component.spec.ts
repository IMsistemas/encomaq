import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentformComponent } from './create-paymentform.component';

describe('CreatePaymentformComponent', () => {
  let component: CreatePaymentformComponent;
  let fixture: ComponentFixture<CreatePaymentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePaymentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
