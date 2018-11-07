import { Component, OnInit } from '@angular/core';
import { Station } from '../station';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent implements OnInit {
  title: string = 'My first BICING project';
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
    console.log('station', station);
    this.selectedStation = station;
  }
}
