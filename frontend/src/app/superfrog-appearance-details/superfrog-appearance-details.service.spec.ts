import { TestBed } from '@angular/core/testing';

import { ViewAppearancesDetailsService } from './superfrog-appearance-details.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewAppearancesDetailsService = TestBed.get(ViewAppearancesDetailsService);
    expect(service).toBeTruthy();
  });
});