import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatComponentsModule } from './mat-components.module';
import { AppComponent } from './app.component';

import { MapComponent } from './components/map/map.component';
import { FavoriteStationsComponent } from './components//favorite-stations/favorite-stations.component';
import { NearestStationsComponent } from './components/nearest-stations/nearest-stations.component';
import { StationComponent } from './components/station/station.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';

import { NoSlotsDialogComponent } from './view-components/no-slots-dialog/no-slots-dialog.component';
import { LessThanMinComponent } from './view-components/less-than-min/less-than-min.component';
import { PageNotFoundComponent } from './view-components/page-not-found/page-not-found.component';
import { NavbarComponent } from './view-components/navbar/navbar.component';

@NgModule({
  declarations: [
  AppComponent,
  MapComponent,
  StationComponent,
  DashboardComponent,
  NoSlotsDialogComponent,
  HeaderComponent,
  LessThanMinComponent,
  PageNotFoundComponent,
  FavoriteStationsComponent,
  NavbarComponent,
  NearestStationsComponent
  ],
  imports: [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  CommonModule,
  MatComponentsModule,
  AgmCoreModule.forRoot({
    apiKey: environment.GMAPS_API_KEY
    }),
  AgmDirectionModule,
  AppRoutingModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production
    })
  ],
  entryComponents: [NoSlotsDialogComponent, LessThanMinComponent],
  providers: [GoogleMapsAPIWrapper, AppComponent],
  bootstrap: [AppComponent]
  })
export class AppModule {}
