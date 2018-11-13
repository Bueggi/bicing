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
    if (!isAlreadyFav) {
      // station.addedTofavourite = true;
      this.favoriteStations.push(station);
    }
  }

  remove (station: Station) {
    this.favoriteStations = this.favoriteStations.filter(
      el => el.id !== station.id
    );
  }

  isFavorite (station) {
    const isAlreadyFav = this.favoriteStations.find(el => el.id === station.id);
    return Boolean(isAlreadyFav);
  }

  // update slots status
  updateFavoriteStations (stations) {
    stations.forEach(el => {
      this.favoriteStations.forEach(favStation => {
        if (el.id === favStation.id) {
          favStation.slots = el.slots;
          favStation.bikes = el.bikes;
        }
      });
    });
  }
}
