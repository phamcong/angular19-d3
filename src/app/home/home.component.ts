import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FoodNode } from '../nested-tree/nested-tree.component';
import { NestedSelectComponent } from '../nested-select/nested-select.component';
import { NestedTreeSearchComponent } from '../nested-tree-search/nested-tree-search.component';
import { TruncateManualDirective } from '../directives/truncate-manual.directive';
import { TruncateDirective } from '../directives/truncate.directive';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { TruncateComponent } from '../truncate/truncate.component';
import { TruncateHoverDirective } from '../directives/truncate-hover.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    NestedSelectComponent,
    FormsModule,
    NestedTreeSearchComponent,
    TruncateDirective,
    AutocompleteComponent,
    TruncateComponent,
    MatTooltipModule,
    TruncateHoverDirective
  ],
})
export class HomeComponent {
  treeData: FoodNode[] = [
    {
      name: 'Fruit',
      value: 'fruit',
      children: [
        { name: 'Apple', value: 'apple' },
        { name: 'Banana', value: 'banana' },
        { name: 'Fruit loops', value: 'fruit-loops' },
      ],
    },
    {
      name: 'Vegetable',
      value: 'vegetable',
      children: [
        { name: 'Tomato', value: 'tomato' },
        { name: 'Potato', value: 'potato' },
        {
          name: 'Green',
          value: 'green',
          children: [
            { name: 'Lettuce', value: 'lettuce' },
            { name: 'Spinach', value: 'spinach' },
            { name: 'Cucumber', value: 'cucumber' },
          ],
        },
      ],
    },
  ];

  selectedValue: string = 'apple';
  selectedValues: string[] = ['apple', 'banana'];
  multiple = true;
  longText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.';

  onSelectionChange(values: string | string[]) {
    if (this.multiple) {
      console.log('Multiple selection:', values as string[]);
      this.selectedValues = values as string[];
    } else {
      console.log('Single selection:', values as string);
      this.selectedValue = values as string;
    }
  }
}
