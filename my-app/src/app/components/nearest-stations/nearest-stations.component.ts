import { Component, OnInit, OnChanges } from '@angular/core';
import { FavoriteStationsService } from '../../services/favorite-stations.service';
import { ApiClientService } from '../../services/api-client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nearest-stations',
  templateUrl: './nearest-stations.component.html',
  styleUrls: ['./nearest-stations.component.css']
  })
export class NearestStationsComponent implements OnInit, OnChanges {
  subscription: Subscription;

  constructor (
    public favoriteStationsService: FavoriteStationsService,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit () {
    console.log('hi', this.favoriteStationsService.nearestStations.length);
  }

  ngOnChanges () {
    // using apiClientService to update info every 10 sec
    // then sending to fav-StationsService to update and re-render
    this.subscription = this.apiClientService
      .checkStationsStatus()
      .subscribe(response => {
        response.stations = response.stations.map(station => {
          return this.sanitizeStation(
            station,
            'id',
            'latitude',
            'longitude',
            'bikes',
            'slots'
          );
        });
        this.favoriteStationsService.updateNearestStations(response.stations);
      });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  sanitizeStation (requestedStation, ...keys) {
    keys.forEach(key => {
      requestedStation[key] = parseFloat(requestedStation[key]);
    });
    return requestedStation;
  }
}
