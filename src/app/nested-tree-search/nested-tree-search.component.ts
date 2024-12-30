import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NestedTreeComponent } from '../nested-tree/nested-tree.component';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-nested-tree-search',
  templateUrl: './nested-tree-search.component.html',
  styleUrls: ['./nested-tree-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NestedTreeComponent,
    FormsModule,
    OverlayModule,
    MatChipsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NestedTreeSearchComponent),
      multi: true,
    },
  ],
})
export class NestedTreeSearchComponent implements ControlValueAccessor {
  @Input() dataSource: any[] = [];
  @Input() multiple = true;

  filteredDataSource: any[] = [];
  searchText: string = '';
  private searchSubject = new Subject<string>();

  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;
  @ViewChild('searchInput') searchInput!: MatFormField;

  private overlayRef: OverlayRef | null = null;
  triggerRect: DOMRect | null = null;

  private _value: any = this.multiple ? [] : null;
  disabled = false;

  // ControlValueAccessor implementation
  onChange = (_: any) => {};
  onTouch = () => {};

  private skipFilter = false;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((text) => {
        this.filterData(text);
      });
  }

  openDropdown() {
    if (this.overlayRef?.hasAttached()) {
      return;
    }

    this.triggerRect =
      this.searchInput._elementRef.nativeElement.getBoundingClientRect();

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.searchInput._elementRef)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: -20,
          },
        ]),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new TemplatePortal(
      this.dropdownTemplate,
      this.viewContainerRef
    );
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeDropdown();
    });
  }

  closeDropdown() {
    this.overlayRef?.detach();
  }

  onTreeSelectionChange(value: any) {
    this._value = this.multiple ? value : value;
    
    if (!this.multiple) {
      this.skipFilter = true;
      this.searchText = value?.name || '';
    }
    
    this.onChange(this._value);
    this.onTouch();
    this.closeDropdown();
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSearchInput(event: any) {
    if (this.skipFilter) {
      this.skipFilter = false;
      return;
    }
    this.searchText = event.target.value;
    this.searchSubject.next(this.searchText);
  }

  private filterData(text: string) {
    if (!text) {
      this.filteredDataSource = [];
      this.closeDropdown();
      return;
    }

    this.filteredDataSource = this.filterNodes(this.dataSource, text);
    if (this.filteredDataSource.length > 0) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  private filterNodes(nodes: any[], searchText: string): any[] {
    return nodes.reduce((filtered: any[], node) => {
      const nameMatch = node.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const childMatches = node.children
        ? this.filterNodes(node.children, searchText)
        : [];

      if (nameMatch || childMatches.length > 0) {
        const clone = { ...node };
        if (childMatches.length > 0) {
          clone.children = childMatches;
        }
        filtered.push(clone);
      }
      return filtered;
    }, []);
  }

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouch();
  }

  removeItem(item: any) {
    this._value = this._value.filter((val: any) => val !== item);
    this.onChange(this._value);
    this.onTouch();
  }
}
