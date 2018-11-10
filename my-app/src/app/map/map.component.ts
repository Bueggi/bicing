import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Station } from '../station';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent implements OnInit {
  title: string = 'Select destiny station';
  // map initial properties: center & zoom
  currentLat: number;
  currentLong: number;
  zoom: number = 14.5;

  image: object = {
    url: '../../assets/2019_TImberjack_NX_Eagle_27.5_Org-uc-1_.jpg',
    scaledSize: {
      width: 20,
      height: 20
    }
  };

  // '../../assets/2019_TImberjack_NX_Eagle_27.5_Org-uc-1_.jpg';

  @Input()
  stations: Station[];

  @Output()
  clickedStation = new EventEmitter<Station>();

  constructor () {}

  ngOnInit () {
    this.getUserLocation();
  }

  clickedMarker (station) {
    this.clickedStation.emit(station);
  }

  getUserLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
    }
  }
}
