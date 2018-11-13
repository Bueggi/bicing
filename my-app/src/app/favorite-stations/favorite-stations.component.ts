import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaovoritStationsService } from '../faovorit-stations.service';
import { ApiClientService } from '../api-client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-stations',
  templateUrl: './favorite-stations.component.html',
  styleUrls: ['./favorite-stations.component.css']
  })
export class FavoriteStationsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor (
    public favoriteStationsService: FaovoritStationsService,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit () {
    this.subscription = this.apiClientService
      .checkStationsStatus()
      .subscribe(result => console.log(result));
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
