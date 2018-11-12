import { Component, OnInit, Input } from '@angular/core';
import { Station } from '../station';
import { FaovoritStationsService } from '../faovorit-stations.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
  })
export class StationComponent implements OnInit {
  @Input()
  station: Station;

  constructor (private favoriteStationsService: FaovoritStationsService) {}

  ngOnInit () {}

  addToFavorites (station) {
    this.station.addedTofavourite = true;
    this.favoriteStationsService.add(station);
  }

  removeFromFavorites (station) {
    this.station.addedTofavourite = false;
    this.favoriteStationsService.remove(station);
  }
}
