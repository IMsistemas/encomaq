import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditwarehouseComponent } from './editwarehouse.component';

describe('EditwarehouseComponent', () => {
  let component: EditwarehouseComponent;
  let fixture: ComponentFixture<EditwarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditwarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
