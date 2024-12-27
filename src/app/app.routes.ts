import { Routes } from '@angular/router';
import { D3VizComponent } from './d3-visualization/d3-visualization.component';
import { HomeComponent } from './home/home.component';
import { NestedTreeComponent } from './nested-tree/nested-tree.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'd3-viz', component: D3VizComponent },
  { path: 'nested-tree', component: NestedTreeComponent },
];