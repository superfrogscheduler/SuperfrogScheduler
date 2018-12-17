import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperFrogSignupComponent } from './super-frog-signup.component';

describe('SuperFrogSignupComponent', () => {
  let component: SuperFrogSignupComponent;
  let fixture: ComponentFixture<SuperFrogSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperFrogSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperFrogSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
