import { TestBed } from '@angular/core/testing';

import { GMapsServiceService } from './g-maps-service.service';

describe('GMapsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GMapsServiceService = TestBed.get(GMapsServiceService);
    expect(service).toBeTruthy();
  });
});
