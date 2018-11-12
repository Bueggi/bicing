import { TestBed } from '@angular/core/testing';

import { FaovoritStationsService } from './faovorit-stations.service';

describe('FaovoritStationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaovoritStationsService = TestBed.get(FaovoritStationsService);
    expect(service).toBeTruthy();
  });
});
