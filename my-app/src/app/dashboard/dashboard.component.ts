import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Station } from '../station';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  })
export class DashboardComponent implements OnInit {
  stations: Station[];
  interval: any;
  selectedStation: Station;
  checkedStation = this.selectedStation;

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

  clickedMarker (clickedStation) {
    this.findStationById(clickedStation, 'selectedStation');
    this.checkSlots();
  }

  checkSlots () {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      console.log('checking');
      this.findStationById(this.selectedStation, 'checkedStation');
      if (
        this.checkedStation &&
        this.checkedStation.slots !== this.selectedStation.slots
      ) {
        this.selectedStation = this.checkedStation;
      }
    }, 10000);
  }

  findStationById (clickedStation, assignTo) {
    // request information again to get real time data
    this.apiClientService.getStations().subscribe(response => {
      const requestedStation = response.stations.find(
        el => el.id === clickedStation.id.toString()
      );
      this[assignTo] = this.sanitizeStation(requestedStation, 'bikes', 'slots');
    });
  }

  sanitizeStation (requestedStation, ...keys) {
    // conververts string to number values (of desired keys)
    keys.forEach(key => {
      requestedStation[key] = parseFloat(requestedStation[key]);
    });
    return requestedStation;
  }
}
