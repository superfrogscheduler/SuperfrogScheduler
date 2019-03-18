import { TestBed } from '@angular/core/testing';

import { SuperfrogLandingService } from './superfrog-landing.component.service';

describe('SuperfrogLandingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperfrogLandingService = TestBed.get(SuperfrogLandingService);
    expect(service).toBeTruthy();
  });
});