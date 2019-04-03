import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogLandingDetailsComponent } from './superfrog-landing-details.component';

describe('SuperfrogLandingDetailsComponent', () => {
  let component: SuperfrogLandingDetailsComponent;
  let fixture: ComponentFixture<SuperfrogLandingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogLandingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogLandingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
