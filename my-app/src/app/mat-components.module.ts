import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  exports: [
  BrowserAnimationsModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule
  ]
  })
export class MatComponentsModule {}
