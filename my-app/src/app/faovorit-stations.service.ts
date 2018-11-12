import { Injectable } from '@angular/core';

import { Station } from './station';

@Injectable({
  providedIn: 'root'
  })
export class FaovoritStationsService {
  constructor () {}

  favoriteStations: Station[] = [];

  add (station: Station) {
    const isAlreadyFav = this.favoriteStations.find(el => el.id === station.id);
    if (!isAlreadyFav) this.favoriteStations.push(station);
  }

  remove (station: Station) {
    this.favoriteStations = this.favoriteStations.filter(
      el => el.id !== station.id
    );
  }
}
