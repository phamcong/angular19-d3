import { Component } from '@angular/core';
import { TruncateDirective } from '../directives/truncate.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TruncateDirective],
})
export class HomeComponent {}
