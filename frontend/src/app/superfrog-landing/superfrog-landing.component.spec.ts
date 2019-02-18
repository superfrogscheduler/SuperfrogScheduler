import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogLandingComponent } from './superfrog-landing.component';

describe('SuperfrogLandingComponent', () => {
  let component: SuperfrogLandingComponent;
  let fixture: ComponentFixture<SuperfrogLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
