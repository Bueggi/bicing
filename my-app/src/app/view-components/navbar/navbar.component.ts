import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  })
export class NavbarComponent implements OnInit {
  constructor () {}

  ngOnInit () {}

  navLinks = [
    { path: 'home', label: 'Map', icon: 'near_me' },
    { path: 'nearest-stations', label: 'Nearby', icon: 'train' },
    { path: 'favorite', label: 'Favorites', icon: 'favorite_border' }
  ];
}
