import { Component, OnInit, Input } from '@angular/core';
import { Station } from '../station';

@Component({
  selector: 'app-no-slots',
  templateUrl: './no-slots.component.html',
  styleUrls: ['./no-slots.component.css']
  })
export class NoSlotsComponent implements OnInit {
  @Input()
  nearbyStations: Station[];
  @Input()
  station: Station;
  constructor () {}

  ngOnInit () {}
}
