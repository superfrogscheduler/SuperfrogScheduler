import { TestBed } from '@angular/core/testing';

import { RequestListService } from './request-list.service';

describe('RequestListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestListService = TestBed.get(RequestListService);
    expect(service).toBeTruthy();
  });
});
