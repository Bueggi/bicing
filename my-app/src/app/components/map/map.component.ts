import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { Station } from '../../station';
import { InitialStationService } from 'src/app/services/initial-station.service';
import { GMapsServiceService } from 'src/app/services/g-maps-service.service';
import { environment } from '../../../environments/environment.prod';
import MarkerClusterer from '@google/markerclusterer';
import { start } from 'repl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent implements AfterViewInit, OnInit, OnChanges {
  currentLat = 41.3851;
  currentLong = 2.1734;
  currentLocationMarker = '../../assets/bike-color.png';
  zoom = 15;
  streetViewControl = false;
  openInfoWindow = false;
  opacity = 0.9;
  mapsAPiUrl = `https://maps.googleapis.com/maps/api/js?key=${
    environment.GMAPS_API_KEY
  }`;
  map = null;
  marker = [];
  currentMarker;
  directionsService;
  directionsDisplay;

  // using agm-directions https://robby570.tw/Agm-Direction-Docs/index.html
  // when origin & destination are ser the map display the route
  // origin: set to geolocation coords (by getUserLocation function)
  origin: object;
  // destination: set when clicking go to destination
  @Input()
  destination: object;
  travelMode = 'BICYCLING';

  // nearest station to current location -> send to dashboard via service
  initialStation: Station;

  renderOptions = {
    suppressMarkers: true
  };

  @Input()
  stations: Station[];

  @Output()
  clickedStation = new EventEmitter<Station>();

  @ViewChild('mapElement')
  mapElm: ElementRef;

  constructor (
    private load: GMapsServiceService,
    private initialStationService: InitialStationService
  ) {}

  ngOnInit () {
    // console.log('INIT!');
  }

  ngOnChanges () {
    this.getUserLocation().then(() => this.getClosestStation());
    this.calculateRoute();
  }

  ngAfterViewInit () {
    this.setMapAndListeners();
  }

  clickedMarker (station) {
    this.clickedStation.emit(station);
  }

  calculateRoute () {
    if (this.destination) {
      const { travelMode } = this;
      const maps = window['google']['maps'];
      const origin = new maps.LatLng(...Object.values(this.origin));
      const destination = new maps.LatLng(...Object.values(this.destination));
      const request = { origin, destination, travelMode };
      this.directionsService.route(request, (result, status) => {
        if (status == 'OK') {
          this.directionsDisplay.setDirections(result);
        }
      });
    }
  }

  setMapAndListeners () {
    this.load.loadScript(this.mapsAPiUrl, 'gmap', () => {
      const maps = window['google']['maps'];
      this.directionsService = new maps.DirectionsService();
      this.directionsDisplay = new maps.DirectionsRenderer(this.renderOptions);
      this.map = new maps.Map(this.mapElm.nativeElement, {
        zoom: this.zoom,
        center: {
          lat: this.currentLat,
          lng: this.currentLong
        },
        zoomControl: true,
        mapTypeControl: false,
        panControl: false,
        scrollWheel: true,
        streetViewControl: false,
        scaleControl: true
      });
      this.directionsDisplay.setMap(this.map);
      this.map.addListener('bounds_changed', () => {
        // console.log('bounds changed');
        this.addCurrentMarkerToMap();
        this.addStationsToMap();
        this.addMarkerClustererToMap();
      });
    });
  }

  addCurrentMarkerToMap () {
    const maps = window['google']['maps'];
    this.currentMarker = new maps.Marker({
      position: {
        lat: this.currentLat,
        lng: this.currentLong
      },
      map: this.map,
      icon: this.currentLocationMarker
    });
  }

  addStationsToMap () {
    if (this.stations && this.map) {
      this.marker = [];
      this.stations.forEach(station => {
        if (
          this.map.getBounds().j.contains(station.longitude) &&
          this.map.getBounds().l.contains(station.latitude)
        ) {
          const maps = window['google']['maps'];
          const newMarker = new maps.Marker({
            position: {
              lat: station.latitude,
              lng: station.longitude
            },
            map: this.map,
            label: station.id.toString()
          });
          newMarker.addListener('click', () => this.clickedMarker(station));
          this.marker.push(newMarker);
        }
      });
    }
  }

  addMarkerClustererToMap () {
    if (window['google']) {
      const clusterer = new MarkerClusterer(this.map, this.marker, {
        imagePath:
          'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });
    }
  }

  // get user current location to center map
  async getUserLocation () {
    // delay with the objective of UX -> first position is city center & thi pans to location
    await navigator.geolocation.getCurrentPosition(position => {
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
      this.origin = {
        lat: this.currentLat,
        lng: this.currentLong
      };
    });
    if (this.map) {
      this.map.panTo({
        lat: this.currentLat,
        lng: this.currentLong
      });
    }
  }

  getClosestStation () {
    this.initialStation = this.findClosestMarker(
      this.currentLat,
      this.currentLong
    );
    this.initialStationService.setInitStation(this.initialStation);
  }

  rad (x) {
    return (x * Math.PI) / 180;
  }

  findClosestMarker (currentLat, currentLong) {
    var lat = currentLat;
    var lng = currentLong;
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    if (this.stations) {
      for (let i = 0; i < this.stations.length; i++) {
        const mlat = this.stations[i].latitude;
        const mlng = this.stations[i].longitude;
        const dLat = this.rad(mlat - lat);
        const dLong = this.rad(mlng - lng);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.rad(lat)) *
            Math.cos(this.rad(lat)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        distances[i] = d;
        if (closest === -1 || d < distances[closest]) {
          closest = i;
        }
      }
      return this.stations[closest];
    }
  }
}
