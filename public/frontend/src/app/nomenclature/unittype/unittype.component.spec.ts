import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnittypeComponent } from './unittype.component';

describe('UnittypeComponent', () => {
  let component: UnittypeComponent;
  let fixture: ComponentFixture<UnittypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnittypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnittypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
