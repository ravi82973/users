import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentMsgComponent } from './sent-msg.component';

describe('SentMsgComponent', () => {
  let component: SentMsgComponent;
  let fixture: ComponentFixture<SentMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
