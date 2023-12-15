import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XiomiconComponent } from './xiomicon.component';

describe('XiomiconComponent', () => {
  let component: XiomiconComponent;
  let fixture: ComponentFixture<XiomiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XiomiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XiomiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
