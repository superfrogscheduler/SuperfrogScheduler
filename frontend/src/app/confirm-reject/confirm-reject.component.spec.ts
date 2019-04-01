import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRejectComponent } from './confirm-reject.component';

describe('ConfirmRejectComponent', () => {
  let component: ConfirmRejectComponent;
  let fixture: ComponentFixture<ConfirmRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
