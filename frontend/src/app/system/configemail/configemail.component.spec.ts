import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigemailComponent } from './configemail.component';

describe('ConfigemailComponent', () => {
  let component: ConfigemailComponent;
  let fixture: ComponentFixture<ConfigemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
