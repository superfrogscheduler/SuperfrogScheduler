import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppearancesDetailsComponent } from './admin-appearances-details.component';

describe('AdminAppearancesDetailsComponent', () => {
  let component: AdminAppearancesDetailsComponent;
  let fixture: ComponentFixture<AdminAppearancesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAppearancesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppearancesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
