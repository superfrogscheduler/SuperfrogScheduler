import { TestBed } from '@angular/core/testing';

import { SuperfrogClassScheduleService } from './superfrog-class-schedule.service';

describe('SuperfrogClassScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperfrogClassScheduleService = TestBed.get(SuperfrogClassScheduleService);
    expect(service).toBeTruthy();
  });
});
