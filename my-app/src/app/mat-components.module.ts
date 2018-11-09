import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  exports: [
  BrowserAnimationsModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule
  ]
  })
export class MatComponentsModule {}
