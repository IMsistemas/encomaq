import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategoryitemComponent } from './addcategoryitem.component';

describe('AddcategoryitemComponent', () => {
  let component: AddcategoryitemComponent;
  let fixture: ComponentFixture<AddcategoryitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcategoryitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcategoryitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
