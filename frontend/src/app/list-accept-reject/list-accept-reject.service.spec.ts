import { TestBed } from '@angular/core/testing';

import { ListAdminService } from './list-accept-reject.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListAdminService = TestBed.get(ListAdminService);
    expect(service).toBeTruthy();
  });
});
