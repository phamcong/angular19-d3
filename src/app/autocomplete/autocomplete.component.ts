import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocomplete,
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatIconModule,
  ],
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  searchControl = new FormControl('');
  filteredOptions$!: Observable<any[]>;

  exampleOptions = [
    {
      name: 'Electronics',
      children: [
        {
          name: 'Computers',
          children: [
            { 
              name: 'Laptops',
              children: [
                { name: 'Gaming Laptops' },
                { name: 'Business Laptops' },
                { name: 'Student Laptops' }
              ]
            },
            { 
              name: 'Desktops',
              children: [
                { name: 'Gaming PCs' },
                { name: 'Workstations' },
                { name: 'All-in-Ones' }
              ]
            },
            { 
              name: 'Tablets',
              children: [
                { name: 'Android Tablets' },
                { name: 'iPads' },
                { name: 'Windows Tablets' }
              ]
            },
          ],
        },
        {
          name: 'Phones',
          children: [
            { 
              name: 'Smartphones',
              children: [
                { name: 'Android Phones' },
                { name: 'iPhones' },
                { name: 'Foldable Phones' }
              ]
            },
            { 
              name: 'Feature Phones',
              children: [
                { name: 'Basic Phones' },
                { name: 'Rugged Phones' }
              ]
            }
          ],
        },
      ],
    },
    {
      name: 'Clothing',
      children: [
        {
          name: "Men's Wear",
          children: [
            { 
              name: 'Shirts',
              children: [
                { name: 'Casual Shirts' },
                { name: 'Formal Shirts' },
                { name: 'T-Shirts' }
              ]
            },
            { 
              name: 'Pants',
              children: [
                { name: 'Jeans' },
                { name: 'Trousers' },
                { name: 'Shorts' }
              ]
            },
            { 
              name: 'Accessories',
              children: [
                { name: 'Belts' },
                { name: 'Watches' },
                { name: 'Ties' }
              ]
            },
          ],
        },
        {
          name: "Women's Wear",
          children: [
            { 
              name: 'Dresses',
              children: [
                { name: 'Casual Dresses' },
                { name: 'Evening Dresses' },
                { name: 'Summer Dresses' }
              ]
            },
            { 
              name: 'Tops',
              children: [
                { name: 'Blouses' },
                { name: 'T-Shirts' },
                { name: 'Sweaters' }
              ]
            },
            { 
              name: 'Skirts',
              children: [
                { name: 'Mini Skirts' },
                { name: 'Midi Skirts' },
                { name: 'Maxi Skirts' }
              ]
            }
          ],
        },
      ],
    },
  ];
  @Input() options: any[] = this.exampleOptions;

  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  ngOnInit() {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterTree(this.options, value || '', 0))
      );
  }

  private filterTree(nodes: any[], searchText: string, level: number): any[] {
    return nodes.reduce((filtered: any[], node) => {
      const nameMatch = node.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const childMatches = node.children
        ? this.filterTree(node.children, searchText, level + 1)
        : [];

      if (nameMatch || childMatches.length > 0) {
        const clone = {
          ...node,
          level,
          children: childMatches,
          expanded: true,
        };
        filtered.push(clone);
      }
      return filtered;
    }, []);
  }

  onOptionSelected(
    event: MatAutocompleteSelectedEvent,
    trigger: MatAutocompleteTrigger
  ) {
    console.log('onOptionSelected: ', event);
    if (!event.option.disabled) {
      this.searchControl.setValue(event.option.value);
      trigger.closePanel();
    }
  }

  onPanelClosed() {
    // Optional cleanup if needed
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }
}
