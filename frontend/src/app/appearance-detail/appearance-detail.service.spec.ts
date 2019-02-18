import { TestBed } from '@angular/core/testing';

import { AppearancesService } from './appearance-detail.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppearancesService = TestBed.get(AppearancesService);
    expect(service).toBeTruthy();
  });
});