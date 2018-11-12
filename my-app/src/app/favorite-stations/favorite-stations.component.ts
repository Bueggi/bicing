import { Component, OnInit } from '@angular/core';
import { Station } from '../station';
import { FaovoritStationsService } from '../faovorit-stations.service';

@Component({
  selector: 'app-favorite-stations',
  templateUrl: './favorite-stations.component.html',
  styleUrls: ['./favorite-stations.component.css']
  })
export class FavoriteStationsComponent implements OnInit {
  stations: Station[] = [
    {
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
    },
    {
      id: 2,
      type: 'BIKE',
      latitude: 41.39553,
      longitude: 2.17706,
      streetName: 'Roger de Flor/ Gran Vía',
      streetNumber: '126',
      altitude: '21',
      slots: 12,
      bikes: 14,
      nearbyStations: '360, 368, 387, 414',
      status: 'OPN'
    }
  ];

  constructor (public favoriteStationsService: FaovoritStationsService) {}

  ngOnInit () {}
}
