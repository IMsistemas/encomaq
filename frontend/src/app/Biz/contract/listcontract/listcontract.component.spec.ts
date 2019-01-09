import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcontractComponent } from './listcontract.component';

describe('ListcontractComponent', () => {
  let component: ListcontractComponent;
  let fixture: ComponentFixture<ListcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
