import { Routes } from '@angular/router';
import { D3VizComponent } from './d3-visualization/d3-visualization.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'd3-viz', component: D3VizComponent },
];
