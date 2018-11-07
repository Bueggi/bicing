import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { StationComponent } from './station/station.component';

@NgModule({
  declarations: [AppComponent, MapComponent, StationComponent],
  imports: [
  BrowserModule,
  HttpClientModule,
  MatCardModule,
  MatIconModule,
  AgmCoreModule.forRoot({
    apiKey: environment.GMAPS_API_KEY
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
  })
export class AppModule {}
