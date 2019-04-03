import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogSettingsComponent } from './superfrog-settings.component';

describe('SuperfrogSettingsComponent', () => {
  let component: SuperfrogSettingsComponent;
  let fixture: ComponentFixture<SuperfrogSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
