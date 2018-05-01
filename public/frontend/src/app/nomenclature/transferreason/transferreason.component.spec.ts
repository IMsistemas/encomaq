import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferreasonComponent } from './transferreason.component';

describe('TransferreasonComponent', () => {
  let component: TransferreasonComponent;
  let fixture: ComponentFixture<TransferreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
