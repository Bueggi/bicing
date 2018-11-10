import { Component, OnInit, Input } from '@angular/core';

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

  constructor () {}

  ngOnInit () {}
}
