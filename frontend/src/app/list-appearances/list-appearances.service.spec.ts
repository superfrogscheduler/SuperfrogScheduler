import { TestBed } from '@angular/core/testing';

import { ListAppearanceService } from './list-appearances.service';

describe('RequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListAppearanceService = TestBed.get(ListAppearanceService);
    expect(service).toBeTruthy();
  });
});
