import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatereferralguidenullComponent } from './createreferralguidenull.component';

describe('CreatereferralguidenullComponent', () => {
  let component: CreatereferralguidenullComponent;
  let fixture: ComponentFixture<CreatereferralguidenullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatereferralguidenullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatereferralguidenullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
