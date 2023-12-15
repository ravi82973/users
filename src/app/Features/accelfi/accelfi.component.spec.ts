import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelfiComponent } from './accelfi.component';

describe('AccelfiComponent', () => {
  let component: AccelfiComponent;
  let fixture: ComponentFixture<AccelfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccelfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccelfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
