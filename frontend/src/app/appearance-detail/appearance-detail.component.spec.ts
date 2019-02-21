import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceDetailComponent } from './appearance-detail.component';

describe('AppearanceDetailComponent', () => {
  let component: AppearanceDetailComponent;
  let fixture: ComponentFixture<AppearanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppearanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
