import { Component, OnInit } from '@angular/core';
import { Station } from '../station';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent implements OnInit {
  title: string = 'Select destiny station';
  // map initial properties: center & zoom
  lat: number = 41.382894;
  lng: number = 2.177432;
  zoom: number = 15;

  stations: Station[];
  selectedStation: Station;

  constructor (private apiClientService: ApiClientService) {}

  ngOnInit () {
    this.addStations();
  }

  addStations () {
    this.apiClientService.getStations().subscribe(response => {
      this.stations = response.stations.map(station => ({
        ...station,
        latitude: parseFloat(station.latitude),
        longitude: parseFloat(station.longitude)
      }));
    });
  }

  clickedMarker ($event, station) {
    // request information again to get real time data
    this.apiClientService.getStations().subscribe(response => {
      const requestedStation = response.stations.find(el => {
        return el.id === station.id.toString();
      });
      requestedStation.latitude = parseFloat(station.latitude);
      requestedStation.longitude = parseFloat(station.longitude);
      this.selectedStation = requestedStation;
    });
  }
}
