import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Station } from '../station';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent {
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

  @Input()
  stations: Station[];

  @Output()
  clickedStation = new EventEmitter<Station>();

  constructor () {}

  clickedMarker (station) {
    this.clickedStation.emit(station);
  }
}
