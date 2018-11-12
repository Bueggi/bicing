import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { environment } from 'src/environments/environment';
import { StationComponent } from './station/station.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatComponentsModule } from './mat-components.module';
import { NoSlotsDialogComponent } from './no-slots-dialog/no-slots-dialog.component';
import { NoSlotsComponent } from './no-slots/no-slots.component';
import { HeaderComponent } from './header/header.component';
import { LessThanMinComponent } from './less-than-min/less-than-min.component';
import { DirectionsMapDirective } from './direction/direction.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FavoriteStationsComponent } from './favorite-stations/favorite-stations.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
  AppComponent,
  MapComponent,
  StationComponent,
  DashboardComponent,
  NoSlotsDialogComponent,
  NoSlotsComponent,
  HeaderComponent,
  LessThanMinComponent,
  DirectionsMapDirective,
  PageNotFoundComponent,
  FavoriteStationsComponent
  ],
  imports: [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  MatComponentsModule,
  AgmCoreModule.forRoot({
    apiKey: environment.GMAPS_API_KEY
    }),
  AppRoutingModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production
    })
  ],
  entryComponents: [NoSlotsDialogComponent, LessThanMinComponent],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
  })
export class AppModule {}
