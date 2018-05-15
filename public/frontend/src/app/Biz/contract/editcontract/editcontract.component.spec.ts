import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontractComponent } from './editcontract.component';

describe('EditcontractComponent', () => {
  let component: EditcontractComponent;
  let fixture: ComponentFixture<EditcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
