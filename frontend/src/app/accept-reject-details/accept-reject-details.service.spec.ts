import { TestBed } from '@angular/core/testing';

import { AdminDetailsService } from './accept-reject-details.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminDetailsService = TestBed.get(AdminDetailsService);
    expect(service).toBeTruthy();
  });
});