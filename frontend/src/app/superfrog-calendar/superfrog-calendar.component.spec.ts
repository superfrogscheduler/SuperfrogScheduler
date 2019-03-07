import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogCalendarComponent } from './superfrog-calendar.component';

describe('SuperfrogCalendarComponent', () => {
  let component: SuperfrogCalendarComponent;
  let fixture: ComponentFixture<SuperfrogCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
