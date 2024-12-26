import { Component } from '@angular/core';
import { TruncateDirective } from '../directives/truncate.directive';
import { TruncateManualDirective } from '../directives/truncate-manual.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TruncateDirective, TruncateManualDirective],
})
export class HomeComponent { }
