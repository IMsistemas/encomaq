import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentformComponent } from './edit-paymentform.component';

describe('EditPaymentformComponent', () => {
  let component: EditPaymentformComponent;
  let fixture: ComponentFixture<EditPaymentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaymentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
