import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogClassScheduleComponent } from './superfrog-class-schedule.component';

describe('SuperfrogClassScheduleComponent', () => {
  let component: SuperfrogClassScheduleComponent;
  let fixture: ComponentFixture<SuperfrogClassScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogClassScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogClassScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
