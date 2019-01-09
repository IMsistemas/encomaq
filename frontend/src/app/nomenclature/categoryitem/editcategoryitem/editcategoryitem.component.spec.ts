import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategoryitemComponent } from './editcategoryitem.component';

describe('EditcategoryitemComponent', () => {
  let component: EditcategoryitemComponent;
  let fixture: ComponentFixture<EditcategoryitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcategoryitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcategoryitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
