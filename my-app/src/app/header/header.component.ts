import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  })
export class HeaderComponent implements OnInit {
  @Input()
  loadingStations: boolean;

  progressSpinner: object = {
    mode: 'indeterminate',
    color: 'warn',
    diameter: 70,
    strokeWidth: 5
  };

  selected: number;

  @Output()
  selectionChange = new EventEmitter<MatSelectChange>();

  constructor () {}

  selectMinSlots ($event) {
    this.selectionChange.emit($event.value);
  }

  ngOnInit () {}
}
