import { Component, Input, EventEmitter, Output, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Station } from '../../station';
import { GoogleMapsAPIWrapper, LatLngLiteral, AgmMap, LatLngBoundsLiteral, LatLngBounds } from '@agm/core';
import { FavoriteStationsService } from '../../services/favorite-stations.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent implements OnInit, AfterViewInit {
  // map initial properties: center & zoom
  currentLat: number = 41.3851;
  currentLong: number = 2.1734;
  currentLocationMarker: string = '../../assets/blue_marker.png';
  zoom: number = 14.5;
  streetViewControl: boolean = false;
  openInfoWindow: boolean = false;
  opacity: number = 0.9;

  // using agm-directions https://robby570.tw/Agm-Direction-Docs/index.html
  // when origin & destination are ser the map display the route
  // origin: set to geolocation coords (by getUserLocation function)
  origin: object;
  // destination: set when clicking go to destination
  @Input()
  destination: object;
  travelMode: string = 'BICYCLING';

  @ViewChild('AgmMap') agmMap: AgmMap;



  // nearest station to current location -> send to dashboard via service
  initialStation: Station;

  renderOptions = {
    suppressMarkers: true
  };

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

  constructor (
    public map: GoogleMapsAPIWrapper,
    private favoriteStationsService: FavoriteStationsService
  ) {}

  ngOnInit () {
    this.getUserLocation();

  }

  ngAfterViewInit() {
    console.log('///////////////////////// ASDF');
    this.map.getBounds().then(data => console.log('///////////////////', data), err => console.log(err));
  }

  clickedMarker (station) {
    this.clickedStation.emit(station);
  }

  // get user current location to center map
  getUserLocation () {
    console.log('got here');
    console.log(this.map);

    this.map.getBounds().then(data => console.log('DATA', data), err => console.log(err));
    // console.log('getBounds', this.map.getBounds().then(data => console.log('DATA', data)));

    // delay with the objective of UX -> first position is city center & thi pans to location
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.currentLat = position.coords.latitude;
          this.currentLong = position.coords.longitude;
          this.origin = {
            lat: this.currentLat,
            lng: this.currentLong
          };
        });
      }

      this.map.panTo({
        lat: this.currentLat,
        lng: this.currentLong
      });



      // finds nearest station to current location (would be nice to do it without setTimeout :))
      setTimeout(() => {
        this.initialStation = this.find_closest_marker(
          this.currentLat,
          this.currentLong
        );
        this.favoriteStationsService.setInitialStation(this.initialStation);
      }, 700);
    }, 300);
  }

  rad (x) {
    return (x * Math.PI) / 180;
  }
  find_closest_marker (currentLat, currentLong) {
    var lat = currentLat;
    var lng = currentLong;
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for (let i = 0; i < this.stations.length; i++) {
      var mlat = this.stations[i].latitude;
      var mlng = this.stations[i].longitude;
      var dLat = this.rad(mlat - lat);
      var dLong = this.rad(mlng - lng);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.rad(lat)) *
          Math.cos(this.rad(lat)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      distances[i] = d;
      if (closest == -1 || d < distances[closest]) {
        closest = i;
      }
    }
    return this.stations[closest];
  }
}
