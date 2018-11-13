import { Injectable } from '@angular/core';

import { Station } from './station';

@Injectable({
  providedIn: 'root'
  })
export class FaovoritStationsService {
  constructor () {}

  favoriteStations: Station[] = [];

  nearestStations: Station[] = [];

  // initialStation -> should be another service
  initialStation: Station;

  // add favorite
  add (station: Station) {
    const isAlreadyFav = this.favoriteStations.find(el => el.id === station.id);
    if (!isAlreadyFav) {
      // station.addedTofavourite = true;
      this.favoriteStations.push(station);
    }
  }

  // remove favorite
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

  addNearestStations (stationsArray: Station[]) {
    this.nearestStations = stationsArray;
  }

  updateNearestStations (stations) {
    stations.forEach(el => {
      this.nearestStations.forEach(nearStation => {
        if (el.id === nearStation.id) {
          nearStation.slots = el.slots;
          nearStation.bikes = el.bikes;
        }
      });
    });
  }

  setInitialStation (station) {
    this.initialStation = station;
  }

  getInitialStation () {
    return this.initialStation;
  }
}
