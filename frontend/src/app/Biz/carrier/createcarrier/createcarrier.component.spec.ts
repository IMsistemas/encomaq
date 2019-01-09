import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecarrierComponent } from './createcarrier.component';

describe('CreatecarrierComponent', () => {
  let component: CreatecarrierComponent;
  let fixture: ComponentFixture<CreatecarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
