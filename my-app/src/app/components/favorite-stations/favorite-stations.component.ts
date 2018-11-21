import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoriteStationsService } from '../../services/favorite-stations.service';
import { ApiClientService } from '../../services/api-client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-stations',
  templateUrl: './favorite-stations.component.html',
  styleUrls: ['./favorite-stations.component.css']
  })
export class FavoriteStationsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor (
    public favoriteStationsService: FavoriteStationsService,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit () {
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
        this.favoriteStationsService.updateFavoriteStations(response.stations);
      });
  }

  ngOnDestroy () {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  sanitizeStation (requestedStation, ...keys) {
    keys.forEach(key => {
      requestedStation[key] = parseFloat(requestedStation[key]);
    });
    return requestedStation;
  }
}
