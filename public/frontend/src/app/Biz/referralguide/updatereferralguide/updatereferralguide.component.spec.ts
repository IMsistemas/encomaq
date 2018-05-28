import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatereferralguideComponent } from './updatereferralguide.component';

describe('UpdatereferralguideComponent', () => {
  let component: UpdatereferralguideComponent;
  let fixture: ComponentFixture<UpdatereferralguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatereferralguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatereferralguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
