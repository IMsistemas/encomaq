import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittransferreasonComponent } from './edittransferreason.component';

describe('EdittransferreasonComponent', () => {
  let component: EdittransferreasonComponent;
  let fixture: ComponentFixture<EdittransferreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittransferreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittransferreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
