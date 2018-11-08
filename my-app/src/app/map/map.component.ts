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
  interval: any;

  constructor (private apiClientService: ApiClientService) {}

  ngOnInit () {
    this.addStations();
  }

  // on init get all station from Bicing api via my koa server
  addStations () {
    this.apiClientService.getStations().subscribe(response => {
      this.stations = response.stations.map(station => ({
        ...station,
        latitude: parseFloat(station.latitude),
        longitude: parseFloat(station.longitude)
      }));
    });
  }

  clickedMarker ($event, clickedStation) {
    this.selectedStation = this.findStationById(clickedStation);
    this.checkSlots(clickedStation);
  }

  checkSlots (clickedStation) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(clickedStation => {
      console.log('checking');
      // not working
      const checkedStation = this.findStationById(clickedStation);
      if (checkedStation.slots !== this.selectedStation.slots) {
        this.selectedStation = checkedStation;
      }
    }, 5000);
  }

  findStationById (clickedStation) {
    // request information again to get real time data
    this.apiClientService.getStations().subscribe(response => {
      let requestedStation = response.stations.find(
        el => el.id === clickedStation.id.toString()
      );
      clickedStation = this.sanitizeStation(requestedStation, 'bikes', 'slots');
      console.log('findById', clickedStation);
    });
    return clickedStation;
  }

  sanitizeStation (requestedStation, ...keys) {
    // conververts string to number values (of desired keys)
    keys.forEach(key => {
      requestedStation[key] = parseFloat(requestedStation[key]);
    });
    return requestedStation;
  }
}
