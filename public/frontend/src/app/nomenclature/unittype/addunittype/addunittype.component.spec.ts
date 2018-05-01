import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddunittypeComponent } from './addunittype.component';

describe('AddunittypeComponent', () => {
  let component: AddunittypeComponent;
  let fixture: ComponentFixture<AddunittypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddunittypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddunittypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
