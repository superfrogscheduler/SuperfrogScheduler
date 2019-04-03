import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAppearancesComponent } from './admin-view-appearances.component';

describe('AdminViewAppearancesComponent', () => {
  let component: AdminViewAppearancesComponent;
  let fixture: ComponentFixture<AdminViewAppearancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewAppearancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewAppearancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
