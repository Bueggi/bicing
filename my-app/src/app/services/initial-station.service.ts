import { Injectable } from '@angular/core';
import { Station } from '../station';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
  })
export class InitialStationService {
  constructor () {}

  mockStation: Station = {
    id: 1,
    type: 'BIKE',
    latitude: 41.397952,
    longitude: 2.180042,
    streetName: 'Gran Via Corts Catalanes',
    streetNumber: '760',
    altitude: '21',
    slots: 6,
    bikes: 23,
    nearbyStations: '24, 369, 387, 426',
    status: 'OPN'
  };

  private stationSource = new BehaviorSubject<Station>(this.mockStation);
  currentStation = this.stationSource.asObservable();

  setInitStation (station: Station) {
    this.stationSource.next(station);
  }
}
