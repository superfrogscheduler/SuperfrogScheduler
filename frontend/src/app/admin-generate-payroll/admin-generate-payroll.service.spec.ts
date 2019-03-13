import { TestBed } from '@angular/core/testing';
import { PayrollService } from './admin-generate-payroll.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollService = TestBed.get(PayrollService);
    expect(service).toBeTruthy();
  });
});
