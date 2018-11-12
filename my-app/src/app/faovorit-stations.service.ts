import { Injectable } from '@angular/core';

import { Station } from './station';

@Injectable({
  providedIn: 'root'
  })
export class FaovoritStationsService {
  constructor () {}

  favoriteStations: Station[] = [];

  add (station: Station) {
    this.favoriteStations.push(station);
  }

  clear () {
    this.favoriteStations = [];
  }
}
