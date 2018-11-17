import { Injectable } from '@angular/core';
import { Station } from '../station';

@Injectable({
  providedIn: 'root'
  })
export class InitialStationService {
  constructor () {}

  initialStation: Station;

  setInitialStation (station) {
    this.initialStation = station;
  }

  getInitialStation () {
    return this.initialStation;
  }
}
