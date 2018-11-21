import { TestBed } from '@angular/core/testing';

import { InitialStationService } from './initial-station.service';

describe('InitialStationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitialStationService = TestBed.get(InitialStationService);
    expect(service).toBeTruthy();
  });
});
