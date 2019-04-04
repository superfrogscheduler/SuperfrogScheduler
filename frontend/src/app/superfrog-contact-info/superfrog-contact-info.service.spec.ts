import { TestBed } from '@angular/core/testing';

import { SuperfrogContactInfoService } from './superfrog-contact-info.service';

describe('SuperfrogContactInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperfrogContactInfoService = TestBed.get(SuperfrogContactInfoService);
    expect(service).toBeTruthy();
  });
});
