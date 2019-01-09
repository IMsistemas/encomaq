import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomIdentifytypeComponent } from './nom-identifytype.component';

describe('NomIdentifytypeComponent', () => {
  let component: NomIdentifytypeComponent;
  let fixture: ComponentFixture<NomIdentifytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomIdentifytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomIdentifytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
