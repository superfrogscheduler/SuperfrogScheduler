import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogsplashComponent } from './superfrog-splash.component';

describe('Superfrog-splashComponent', () => {
  let component: SuperfrogsplashComponent;
  let fixture: ComponentFixture<SuperfrogsplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogsplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogsplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
