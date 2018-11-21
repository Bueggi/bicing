import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FavoriteStationsComponent } from './components/favorite-stations/favorite-stations.component';
import { NearestStationsComponent } from './components/nearest-stations/nearest-stations.component';
import { PageNotFoundComponent } from './view-components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'favorite', component: FavoriteStationsComponent },
  { path: 'nearest-stations', component: NearestStationsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule {}
