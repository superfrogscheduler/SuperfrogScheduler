import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogAppearanceDetailsComponent } from './superfrog-appearance-details.component';

describe('SuperfrogAppearanceDetailsComponent', () => {
  let component: SuperfrogAppearanceDetailsComponent;
  let fixture: ComponentFixture<SuperfrogAppearanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogAppearanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogAppearanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
