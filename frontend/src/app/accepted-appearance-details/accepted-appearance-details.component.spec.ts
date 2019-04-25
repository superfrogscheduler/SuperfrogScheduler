import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedAppearanceDetailsComponent } from './accepted-appearance-details.component';

describe('AcceptedAppearanceDetailsComponent', () => {
  let component: AcceptedAppearanceDetailsComponent;
  let fixture: ComponentFixture<AcceptedAppearanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedAppearanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedAppearanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
