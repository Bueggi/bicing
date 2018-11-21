import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-less-than-min',
  templateUrl: './less-than-min.component.html',
  styleUrls: ['./less-than-min.component.css']
  })
export class LessThanMinComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit () {}
}
