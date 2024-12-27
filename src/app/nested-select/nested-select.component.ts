import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FoodNode, NestedTreeComponent } from '../nested-tree/nested-tree.component';

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    value: 'fruit',
    children: [
      { name: 'Apple', value: 'apple' },
      { name: 'Banana', value: 'banana' },
      { name: 'Fruit loops', value: 'fruit-loops' }
    ],
  },
  {
    name: 'Vegetables',
    value: 'vegetables',
    children: [
      {
        name: 'Green',
        value: 'green',
        children: [
          { name: 'Broccoli', value: 'broccoli', selectable: false },
          { name: 'Brussels sprouts', value: 'brussels-sprouts' }
        ],
      },
      {
        name: 'Orange',
        value: 'orange',
        children: [
          { name: 'Pumpkins', value: 'pumpkins' },
          { name: 'Carrots', value: 'carrots' }
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-nested-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    OverlayModule,
    NestedTreeComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NestedSelectComponent,
      multi: true
    }
  ],
  templateUrl: './nested-select.component.html',
  styleUrls: ['./nested-select.component.scss']
})
export class NestedSelectComponent implements ControlValueAccessor {
  @Input() label = 'Select items';
  @Input() multiple = false;
  @Input() dataSource: FoodNode[] = TREE_DATA;

  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

  private overlayRef: OverlayRef | null = null;

  displayValue = '';
  value: string | string[] = this.multiple ? [] : '';

  constructor(private overlay: Overlay, private _viewContainerRef: ViewContainerRef) { }

  openDropdown(event: MouseEvent) {
    event.stopPropagation();

    if (this.overlayRef?.hasAttached()) {
      this.closeDropdown();
      return;
    }

    const triggerRect = this.trigger.nativeElement.getBoundingClientRect();
    const positions = [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 24
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -8
      }
    ] as ConnectedPosition[];
    
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.trigger.nativeElement)
        .withPositions(positions)
        .withPush(true)  // Enable pushing if there's not enough space
        .withViewportMargin(8)  // Add margin from viewport edges
        .withDefaultOffsetY(8)  // Default vertical offset
        .withTransformOriginOn('.select-panel'),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: triggerRect.width,
      minWidth: Math.max(triggerRect.width, 300),
      panelClass: 'select-panel-class'  // Add this for global styling if needed
    });

    const portal = new TemplatePortal(this.dropdownTemplate, this._viewContainerRef);
    this.overlayRef.attach(portal);

    // Handle backdrop clicks
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeDropdown();
    });
  }

  closeDropdown() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private updateDisplayValue() {
    if (this.multiple) {
      const values = (this.value ?? []) as string[];
      this.displayValue = values.length
        ? `${values.length} item${values.length > 1 ? 's' : ''} selected`
        : '';
    } else {
      const selectedValue = this.value as string;
      const selectedNode = this.findNodeByValue(this.dataSource, selectedValue);
      this.displayValue = selectedNode?.name || '';
    }
  }

  private findNodeByValue(nodes: FoodNode[], value: string): FoodNode | null {
    for (const node of nodes) {
      if (node.value === value) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeByValue(node.children, value);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  // ControlValueAccessor implementation
  private onChange: (value: string | string[]) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: string | string[]): void {
    this.value = value;
    this.updateDisplayValue();
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }

  onTreeSelectionChange(newValue: string | string[]) {
    this.value = newValue;
    this.updateDisplayValue();
    this.onChange(newValue);
  }
} 