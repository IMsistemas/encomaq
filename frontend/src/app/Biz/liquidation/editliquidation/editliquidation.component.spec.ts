import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditliquidationComponent } from './editliquidation.component';

describe('EditliquidationComponent', () => {
  let component: EditliquidationComponent;
  let fixture: ComponentFixture<EditliquidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditliquidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditliquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
