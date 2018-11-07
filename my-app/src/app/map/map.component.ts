import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  })
export class MapComponent implements OnInit {
  title: string = 'My first BICING project';
  lat: number = 41.382894;
  lng: number = 2.177432;
  zoom: number = 15;

  constructor () {}

  ngOnInit () {}
}
