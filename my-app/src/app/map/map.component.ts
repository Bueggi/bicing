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
  image: object = {
    url: '../../assets/2019_TImberjack_NX_Eagle_27.5_Org-uc-1_.jpg',
    scaledSize: {
      width: 20,
      height: 20
    }
  };

  // '../../assets/2019_TImberjack_NX_Eagle_27.5_Org-uc-1_.jpg';

  stations: Station[];
  selectedStation: Station;
  interval: any;
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

  clickedMarker ($event, clickedStation) {
    this.findStationById(clickedStation, 'selectedStation');
    this.checkSlots();
  }

  checkSlots () {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      console.log('checking');
      // this.findStationById(this.selectedStation, 'checkedStation');
      // if (
      //   this.checkedStation &&
      //   this.checkedStation.slots !== this.selectedStation.slots
      // ) {
      //   this.selectedStation = this.checkedStation;
      // }
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

  display () {
    console.log('hello');
  }
}
