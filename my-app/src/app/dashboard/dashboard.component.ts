import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Station } from '../station';
import { MatDialog } from '@angular/material/dialog';
import { NoSlotsDialogComponent } from '../no-slots-dialog/no-slots-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  })
export class DashboardComponent implements OnInit {
  // stations -> binded to map component
  stations: Station[];

  // variable to save intervalId and be able to clearInterval
  interval: any;

  // selectedStation -> binded to the station component
  selectedStation: Station;

  // variable to save latest data of selected station (initialized with selectedStation)
  checkedStation = this.selectedStation;

  // if noSlots is true -> render Go to near station
  noSlots: boolean = false;
  nearStations: number[];

  // element: either 'bikes' or 'slots'
  element: string;

  mock: Station = {
    id: '1',
    type: 'BIKE',
    latitude: 41.397952,
    longitude: 2.180042,
    streetName: 'Gran Via Corts Catalanes',
    streetNumber: '760',
    altitude: '21',
    slots: '6',
    bikes: '23',
    nearbyStations: '24, 369, 387, 426',
    status: 'OPN'
  };

  constructor (
    private apiClientService: ApiClientService,
    private dialog: MatDialog
  ) {}

  ngOnInit () {
    this.addStations();
  }

  // on init get all station from Bicing api via my koa server
  addStations () {
    this.apiClientService.getStations().subscribe(response => {
      this.stations = response.stations.map(station => {
        return this.sanitizeStation(
          station,
          'latitude',
          'longitude',
          'bikes',
          'slots'
        );
      });
    });
  }

  clickedMarker (clickedStation) {
    this.apiClientService.getStations().subscribe(response => {
      const requestedStation = response.stations.find(
        el => el.id === clickedStation.id.toString()
      );
      this.selectedStation = this.sanitizeStation(
        requestedStation,
        'bikes',
        'slots'
      );

      this.nearStations = clickedStation.nearbyStations
        .split(', ')
        .map(el => parseInt(el));

      this.checkNoSlots(this.selectedStation);
      if (this.noSlots) {
        if (this.interval) clearInterval(this.interval);
      } else {
        this.checkSlots();
      }
    });
  }

  //checkSlots creates an interval to check real time changes in slots
  checkSlots () {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      console.log('checking');

      this.apiClientService.getStations().subscribe(response => {
        const requestedStation = response.stations.find(
          el => el.id === this.selectedStation.id.toString()
        );
        this.checkedStation = this.sanitizeStation(
          requestedStation,
          'bikes',
          'slots'
        );

        if (
          this.checkedStation &&
          this.checkedStation.slots !== this.selectedStation.slots
        ) {
          this.selectedStation = this.checkedStation;
          this.checkNoSlots(this.selectedStation);
          if (this.noSlots) this.openDialog();
        }
      });
    }, 10000);
  }

  // findStationById (clickedStation, assignTo) {
  //   // request information again to get real time data
  //   this.apiClientService.getStations().subscribe(response => {
  //     const requestedStation = response.stations.find(
  //       el => el.id === clickedStation.id.toString()
  //     );
  //     this[assignTo] = this.sanitizeStation(requestedStation, 'bikes', 'slots');
  //   });
  // }

  // conververt string to number values of desired input station's keys
  sanitizeStation (requestedStation, ...keys) {
    keys.forEach(key => {
      requestedStation[key] = parseFloat(requestedStation[key]);
    });
    return requestedStation;
  }

  checkNoSlots (station) {
    this.noSlots = station.slots === 0 ? true : false;
  }

  selectBikes () {
    this.element = 'bikes';
  }
  selectSlots () {
    this.element = 'slots';
  }

  openDialog () {
    this.dialog
      .open(NoSlotsDialogComponent, {
        data: {
          stationData: this.selectedStation
        }
      })
      .afterClosed()
      .subscribe(result => console.log(result));
  }
}
