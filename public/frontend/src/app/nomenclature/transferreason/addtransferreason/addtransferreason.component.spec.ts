import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtransferreasonComponent } from './addtransferreason.component';

describe('AddtransferreasonComponent', () => {
  let component: AddtransferreasonComponent;
  let fixture: ComponentFixture<AddtransferreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtransferreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtransferreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
