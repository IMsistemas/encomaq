import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationNewComponent } from './liquidation-new.component';

describe('LiquidationNewComponent', () => {
  let component: LiquidationNewComponent;
  let fixture: ComponentFixture<LiquidationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
