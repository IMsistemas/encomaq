import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatereferralguideComponent } from './createreferralguide.component';

describe('CreatereferralguideComponent', () => {
  let component: CreatereferralguideComponent;
  let fixture: ComponentFixture<CreatereferralguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatereferralguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatereferralguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
