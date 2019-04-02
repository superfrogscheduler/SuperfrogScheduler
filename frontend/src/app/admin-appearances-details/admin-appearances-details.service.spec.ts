import { TestBed } from '@angular/core/testing';

import { AdminAppearancesDetailsService } from './admin-appearances-details.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAppearancesDetailsService = TestBed.get(AdminAppearancesDetailsService);
    expect(service).toBeTruthy();
  });
});