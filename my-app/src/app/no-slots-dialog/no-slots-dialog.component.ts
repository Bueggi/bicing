import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-no-slots-dialog',
  templateUrl: './no-slots-dialog.component.html',
  styleUrls: ['./no-slots-dialog.component.css']
  })
export class NoSlotsDialogComponent implements OnInit {
  constructor (@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit () {}
}
