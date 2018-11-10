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

@NgModule({
  declarations: [
  AppComponent,
  MapComponent,
  StationComponent,
  DashboardComponent,
  NoSlotsDialogComponent,
  NoSlotsComponent,
  HeaderComponent
  ],
  imports: [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  MatComponentsModule,
  AgmCoreModule.forRoot({
    apiKey: environment.GMAPS_API_KEY
    })
  ],
  entryComponents: [NoSlotsDialogComponent],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
  })
export class AppModule {}
