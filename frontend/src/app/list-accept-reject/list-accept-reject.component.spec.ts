import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcceptRejectComponent } from './list-accept-reject.component';

describe('ListAcceptRejectComponent', () => {
  let component: ListAcceptRejectComponent;
  let fixture: ComponentFixture<ListAcceptRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAcceptRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAcceptRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
