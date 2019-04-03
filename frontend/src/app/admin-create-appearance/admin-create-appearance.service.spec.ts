import { TestBed } from '@angular/core/testing';

import { AdminCreateAppearanceService } from './admin-create-appearance.service';

describe('AdminCreateAppearanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminCreateAppearanceService = TestBed.get(AdminCreateAppearanceService);
    expect(service).toBeTruthy();
  });
});
