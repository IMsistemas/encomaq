import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecarrierComponent } from './updatecarrier.component';

describe('UpdatecarrierComponent', () => {
  let component: UpdatecarrierComponent;
  let fixture: ComponentFixture<UpdatecarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
