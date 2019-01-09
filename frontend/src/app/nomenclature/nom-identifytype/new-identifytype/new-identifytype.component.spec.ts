import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIdentifytypeComponent } from './new-identifytype.component';

describe('NewIdentifytypeComponent', () => {
  let component: NewIdentifytypeComponent;
  let fixture: ComponentFixture<NewIdentifytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIdentifytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIdentifytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
