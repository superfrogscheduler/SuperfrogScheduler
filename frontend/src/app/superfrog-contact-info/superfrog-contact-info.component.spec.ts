import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperfrogContactInfoComponent } from './superfrog-contact-info.component';

describe('SuperfrogContactInfoComponent', () => {
  let component: SuperfrogContactInfoComponent;
  let fixture: ComponentFixture<SuperfrogContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperfrogContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperfrogContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
