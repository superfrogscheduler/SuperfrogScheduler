import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogViewAssignedAppearancesComponent } from './superfrog-view-assigned-appearances.component';

describe('SuperfrogViewAssignedAppearancesComponent', () => {
  let component: SuperfrogViewAssignedAppearancesComponent;
  let fixture: ComponentFixture<SuperfrogViewAssignedAppearancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogViewAssignedAppearancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogViewAssignedAppearancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
