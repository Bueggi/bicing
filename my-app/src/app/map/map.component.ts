import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Station } from '../station';
import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent implements OnInit {
  // map initial properties: center & zoom
  currentLat: number = 41.3851;
  currentLong: number = 2.1734;
  currentLocationMarker: string = '../../assets/blue_marker.png';
  zoom: number = 14.5;

  origin: object;

  destination: object;

  // to convert markers to a bike image (not using it)
  image: object = {
    url: '../../assets/2019_TImberjack_NX_Eagle_27.5_Org-uc-1_.jpg',
    scaledSize: {
      width: 20,
      height: 20
    }
  };

  @Input()
  stations: Station[];

  @Output()
  clickedStation = new EventEmitter<Station>();

  constructor (private map: GoogleMapsAPIWrapper) {}

  ngOnInit () {
    this.getUserLocation();
  }

  clickedMarker (station) {
    this.clickedStation.emit(station);
    this.origin = {
      latitude: 41.395009,
      longitude: 2.196308
    };
    this.destination = {
      latitude: 41.395905,
      longitude: 2.192958
    };
  }

  // get user current location to center map
  getUserLocation () {
    // delay with the objective of UX -> first position is city center & thi pans to location
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.currentLat = position.coords.latitude;
          this.currentLong = position.coords.longitude;
        });
      }
      this.map.panTo({
        lat: this.currentLat,
        lng: this.currentLong
      });
    }, 1000);
  }
}
