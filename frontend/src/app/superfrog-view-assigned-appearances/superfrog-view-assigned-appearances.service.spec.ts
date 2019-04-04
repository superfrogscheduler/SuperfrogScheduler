import { TestBed } from '@angular/core/testing';

import { ViewAllAppearancesService } from './superfrog-view-assigned-appearances.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewAllAppearancesService = TestBed.get(ViewAllAppearancesService);
    expect(service).toBeTruthy();
  });
});