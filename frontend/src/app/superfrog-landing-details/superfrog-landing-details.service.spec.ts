import { TestBed } from '@angular/core/testing';

import { SuperfrogLandingDetailsService } from './superfrog-landing-details.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperfrogLandingDetailsService = TestBed.get(SuperfrogLandingDetailsService);
    expect(service).toBeTruthy();
  });
});