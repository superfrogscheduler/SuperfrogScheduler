import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRejectDetailsComponent } from './accept-reject-details.component';

describe('AcceptRejectDetailsComponent', () => {
  let component: AcceptRejectDetailsComponent;
  let fixture: ComponentFixture<AcceptRejectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptRejectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRejectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
