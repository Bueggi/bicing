import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Station } from '../station';
import { MatDialog } from '@angular/material/dialog';
import { NoSlotsDialogComponent } from '../no-slots-dialog/no-slots-dialog.component';
import { LessThanMinComponent } from '../less-than-min/less-than-min.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  })
export class DashboardComponent implements OnInit {
  // stations -> binded to map component
  stations: Station[];
  loadingStations: boolean = false;

  // minimun slots set by user to determine when it is going to be notified
  minimunSlots: number;

  // realtime stations status:
  updatedStations: Station[];
  nearbyStations: Station[];

  // variable to save intervalId and be able to clearInterval
  interval: any;

  // selectedStation -> binded to the station component
  selectedStation: Station;

  // variable -> binded to map component, when set map renders route (direction)
  destination: object;

  // variable to save latest data of selected station (initialized with selectedStation)
  checkedStation = this.selectedStation;

  // if noSlots is true -> render Go to near station
  noSlots: boolean = false;

  nearStationsId: number[];

  // element: either 'bikes' or 'slots'
  element: string;

  mock: Station = {
    id: 1,
    type: 'BIKE',
    latitude: 41.397952,
    longitude: 2.180042,
    streetName: 'Gran Via Corts Catalanes',
    streetNumber: '760',
    altitude: '21',
    slots: 6,
    bikes: 23,
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
    this.loadingStations = true;
    this.apiClientService.getStations().subscribe(response => {
      this.stations = response.stations.map(station => {
        return this.sanitizeStation(
          station,
          'id',
          'latitude',
          'longitude',
          'bikes',
          'slots'
        );
      });
      this.loadingStations = false;
    });
  }

  setMinimumSlots (min) {
    this.minimunSlots = min;
    console.log(this.minimunSlots);
  }

  clickedMarker (clickedStation) {
    this.apiClientService.getStations().subscribe(response => {
      const requestedStation = response.stations.find(
        el => el.id === clickedStation.id.toString()
      );
      this.selectedStation = this.sanitizeStation(
        requestedStation,
        'id',
        'latitude',
        'longitude',
        'bikes',
        'slots'
      );

      this.nearStationsId = this.selectedStation.nearbyStations
        .split(', ')
        .map(el => parseInt(el));

      this.checkNoSlots(this.selectedStation);
      if (this.noSlots) {
        this.clearCheckInterval();
      } else {
        this.checkSlots();
      }
    });
  }

  rideToStation () {
    if (this.selectedStation) {
      const newDestination = {};
      newDestination.latitude = this.selectedStation.latitude;
      newDestination.longitude = this.selectedStation.longitude;
      console.log(newDestination);

      this.destination = newDestination;
    }
  }

  //checkSlots creates an interval to check real time changes in slots
  checkSlots () {
    this.clearCheckInterval();

    this.interval = setInterval(() => {
      console.log('checking');

      this.apiClientService.getStations().subscribe(response => {
        // to keep track of the latest information about stations
        this.updatedStations = response.stations.map(station => {
          return this.sanitizeStation(
            station,
            'id',
            'latitude',
            'longitude',
            'bikes',
            'slots'
          );
        });

        this.nearbyStations = this.updatedStations.filter(el =>
          this.nearStationsId.includes(el.id)
        );

        // search for requested station
        const requestedStation = this.updatedStations.find(
          el => el.id === this.selectedStation.id
        );

        this.checkedStation = requestedStation;

        // if station slots number changes, reasing selected station to re-render
        if (
          this.checkedStation &&
          this.checkedStation.slots !== this.selectedStation.slots
        ) {
          this.selectedStation = this.checkedStation;
          this.checkNoSlots(this.selectedStation);
          if (this.noSlots) this.openDialog();
        }
        this.checkLessThanMinimum();
      });
    }, 10000);
  }

  clearCheckInterval () {
    if (this.interval) clearInterval(this.interval);
  }

  checkNoSlots (station) {
    this.noSlots = station.slots === 0 ? true : false;
  }

  checkLessThanMinimum () {
    if (this.selectedStation.slots < this.minimunSlots && !this.noSlots) {
      this.clearCheckInterval();
      this.dialog
        .open(LessThanMinComponent, {
          data: {
            stationData: this.selectedStation
          }
        })
        .afterClosed()
        .subscribe(() => {
          this.minimunSlots = this.selectedStation.slots - 1;
          this.checkSlots();
        });
    }
  }

  // opens no more slots dialoge: renders a dialogue with nearby stations
  openDialog () {
    this.clearCheckInterval();
    const nearbyStationsWithSlots = this.nearbyStations.filter(
      el => el.slots > 0
    );
    this.dialog
      .open(NoSlotsDialogComponent, {
        data: {
          stationData: this.selectedStation,
          nearbyStations: nearbyStationsWithSlots
        }
      })
      .afterClosed()
      .subscribe(result => {
        console.log(result);
        const newSelectedStation = this.stations.find(el => el.id === result);
        this.clickedMarker(newSelectedStation);
      });
  }

  // conververt string to number values of desired input station's keys
  sanitizeStation (requestedStation, ...keys) {
    keys.forEach(key => {
      requestedStation[key] = parseFloat(requestedStation[key]);
    });
    return requestedStation;
  }
}

// selectBikes () {
//   this.element = 'bikes';
// }
// selectSlots () {
//   this.element = 'slots';
// }
