import { TestBed } from '@angular/core/testing';

import { HrDataService } from './hr-data.service';

describe('HrDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrDataService = TestBed.get(HrDataService);
    expect(service).toBeTruthy();
  });
});
