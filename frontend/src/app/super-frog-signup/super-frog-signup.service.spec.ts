import { TestBed } from '@angular/core/testing';

import { SignUpService } from './super-frog-signup.service';

describe('SignUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignUpService = TestBed.get(SignUpService);
    expect(service).toBeTruthy();
  });
});
