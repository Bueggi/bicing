import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material';

declare interface ProgressSpinnerData {
  mode: string;
  color: string;
  diameter: number;
  strokeWidth: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  })
export class HeaderComponent implements OnInit {
  @Input()
  loadingStations: boolean;

  progressSpinner: ProgressSpinnerData = {
    mode: 'indeterminate',
    color: 'warn',
    diameter: 40,
    strokeWidth: 5
  };

  selected: number;

  @Output()
  selectionChange = new EventEmitter<MatSelectChange>();

  @Output()
  rideToStation = new EventEmitter();

  constructor () {}

  selectMinSlots ($event) {
    this.selectionChange.emit($event.value);
  }

  ngOnInit () {}

  ride () {
    this.rideToStation.emit();
  }
}
