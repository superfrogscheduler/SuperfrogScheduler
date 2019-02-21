import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppearancesComponent } from './view-appearances.component';

describe('ViewAppearancesComponent', () => {
  let component: ViewAppearancesComponent;
  let fixture: ComponentFixture<ViewAppearancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAppearancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppearancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
