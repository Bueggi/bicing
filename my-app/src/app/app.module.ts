import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { StationComponent } from './station/station.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
  AppComponent,
  MapComponent,
  StationComponent,
  DashboardComponent
  ],
  imports: [
  BrowserModule,
  HttpClientModule,
  NoopAnimationsModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  AgmCoreModule.forRoot({
    apiKey: environment.GMAPS_API_KEY
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
  })
export class AppModule {}
