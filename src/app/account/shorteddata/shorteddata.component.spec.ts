import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorteddataComponent } from './shorteddata.component';

describe('ShorteddataComponent', () => {
  let component: ShorteddataComponent;
  let fixture: ComponentFixture<ShorteddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShorteddataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShorteddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
