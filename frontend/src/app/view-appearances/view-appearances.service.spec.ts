import { TestBed } from '@angular/core/testing';

import { ListAppearancesService } from './view-appearances.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListAppearancesService = TestBed.get(ListAppearancesService);
    expect(service).toBeTruthy();
  });
});