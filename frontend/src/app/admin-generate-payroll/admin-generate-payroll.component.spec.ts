import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneratePayrollComponent } from './admin-generate-payroll.component';

describe('AdminGeneratePayrollComponent', () => {
  let component: AdminGeneratePayrollComponent;
  let fixture: ComponentFixture<AdminGeneratePayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGeneratePayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGeneratePayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
