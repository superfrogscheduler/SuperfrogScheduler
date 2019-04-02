import { TestBed } from '@angular/core/testing';

import { AdminChangeService } from './admin-change-appearance.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminChangeService = TestBed.get(AdminChangeService);
    expect(service).toBeTruthy();
  });
});