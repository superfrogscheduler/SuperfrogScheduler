import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin-landing.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
});