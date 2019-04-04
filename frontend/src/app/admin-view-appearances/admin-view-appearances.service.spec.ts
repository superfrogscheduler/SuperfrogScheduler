import { TestBed } from '@angular/core/testing';

import { ViewAppearancesAdminService } from './admin-view-appearances.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewAppearancesAdminService = TestBed.get(ViewAppearancesAdminService);
    expect(service).toBeTruthy();
  });
});