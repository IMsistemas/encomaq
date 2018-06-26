import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddliquidationComponent } from './addliquidation.component';

describe('AddliquidationComponent', () => {
  let component: AddliquidationComponent;
  let fixture: ComponentFixture<AddliquidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddliquidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddliquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
