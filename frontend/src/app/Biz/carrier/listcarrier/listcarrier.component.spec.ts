import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcarrierComponent } from './listcarrier.component';

describe('ListcarrierComponent', () => {
  let component: ListcarrierComponent;
  let fixture: ComponentFixture<ListcarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
