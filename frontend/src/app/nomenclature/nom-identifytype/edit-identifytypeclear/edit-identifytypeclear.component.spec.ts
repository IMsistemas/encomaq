import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIdentifytypeclearComponent } from './edit-identifytypeclear.component';

describe('EditIdentifytypeclearComponent', () => {
  let component: EditIdentifytypeclearComponent;
  let fixture: ComponentFixture<EditIdentifytypeclearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIdentifytypeclearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIdentifytypeclearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
