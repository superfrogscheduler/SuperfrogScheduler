import { TestBed } from '@angular/core/testing';

import { AcceptDetailsService } from './accepted-appearance-details.component.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcceptDetailsService = TestBed.get(AcceptDetailsService);
    expect(service).toBeTruthy();
  });
});