import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralguideComponent } from './referralguide.component';

describe('ReferralguideComponent', () => {
  let component: ReferralguideComponent;
  let fixture: ComponentFixture<ReferralguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
