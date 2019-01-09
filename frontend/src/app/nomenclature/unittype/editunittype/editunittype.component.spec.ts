import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditunittypeComponent } from './editunittype.component';

describe('EditunittypeComponent', () => {
  let component: EditunittypeComponent;
  let fixture: ComponentFixture<EditunittypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditunittypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditunittypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
