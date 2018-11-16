import { TestBed } from '@angular/core/testing';

import { FavoriteStationsService } from './favorite-stations.service';

describe('FavoriteStationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteStationsService = TestBed.get(
      FavoriteStationsService
    );
    expect(service).toBeTruthy();
  });
});
