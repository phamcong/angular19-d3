import { Routes } from '@angular/router';
import { D3VizComponent } from './d3-visualization/d3-visualization.component';

export const routes: Routes = [
  { path: '', redirectTo: 'd3-viz', pathMatch: 'full' },
  { path: 'd3-viz', component: D3VizComponent },
];
