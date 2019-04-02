import { TestBed } from '@angular/core/testing';
import { ListPayrollService } from './list-payroll-appearances.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListPayrollService = TestBed.get(ListPayrollService);
    expect(service).toBeTruthy();
  });
});
