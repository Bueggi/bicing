import { Component, Input, EventEmitter, Output, OnInit, ViewChild, AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { Station } from '../../station';
import { FavoriteStationsService } from '../../services/favorite-stations.service';
import { GMapsServiceService } from 'src/app/services/g-maps-service.service';
import { environment } from '../../../environments/environment.prod';
import MarkerClusterer from '@google/markerclusterer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent implements AfterViewInit, OnChanges, OnInit {
  // map initial properties: center & zoom
  currentLat = 41.3851;
  currentLong = 2.1734;
  currentLocationMarker = '../../assets/blue_marker.png';
  zoom = 14.5;
  streetViewControl = false;
  openInfoWindow = false;
  opacity = 0.9;
  mapsAPiUrl = `https://maps.googleapis.com/maps/api/js?key=${environment.GMAPS_API_KEY}`;
  map = null;
  marker = [];

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

  @ViewChild('mapElement') mapElm: ElementRef;

  constructor (
    private load: GMapsServiceService,
    // public map: GoogleMapsAPIWrapper,
    private favoriteStationsService: FavoriteStationsService
  ) {}

  ngAfterViewInit () {
    this.load.loadScript(this.mapsAPiUrl, 'gmap', () => {
      const maps = window['google']['maps'];
      this.map = new maps.Map(
        this.mapElm.nativeElement,
        {
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
        this.map.addListener('bounds_changed', () => {
          console.log('bounds changed');
          this.addStationsToMap();
        });
      });
  }

  ngOnChanges() {
    this.getUserLocation();
    this.addStationsToMap();
    this.addMarkerClustererToMap();
  }

  clickedMarker (station) {
    this.clickedStation.emit(station);
  }

  addStationsToMap () {
    if (this.stations && this.map) {
      this.marker = [];
      this.stations.forEach(station => {
        if (this.map.getBounds().j.contains(station.longitude)
        && this.map.getBounds().l.contains(station.latitude)) {
          const maps = window['google']['maps'];
          const newMarker = new maps.Marker({
            position: {
              lat: station.latitude, lng: station.longitude},
              map: this.map,
              label: station.slots.toString(),
            });
            newMarker.addListener('click', () => this.clickedMarker(station));
          this.marker.push(newMarker);
        }
      });
    }
  }

  addMarkerClustererToMap () {
    if (window['google']) {
      const clusterer = new MarkerClusterer(
        this.map,
        this.marker,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
  }


  // get user current location to center map
  getUserLocation () {
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
    const lat = currentLat;
    const lng = currentLong;
    const R = 6371; // radius of earth in km
    const distances = [];
    let closest = -1;
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
