import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { BreadcrumbsComponent } from '../breadcumns/breadcrumbs.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface FoodNode {
  name: string;
  value: string;
  children?: FoodNode[];
  selectable?: boolean;
  level?: number;
}

/**
 * Filter tree data based on search text
 * @param data Array of tree nodes to filter
 * @param filterText Text to filter nodes by
 * @returns Filtered tree data
 */
function filterTreeData(data: FoodNode[], filterText: string): FoodNode[] {
  if (!filterText) {
    return data;
  }

  return data.reduce<FoodNode[]>((filteredNodes, node) => {
    const matchesFilter = node.name.toLowerCase().includes(filterText.toLowerCase());

    if (node.children) {
      const filteredChildren = filterTreeData(node.children, filterText);
      if (matchesFilter || filteredChildren.length > 0) {
        filteredNodes.push({
          ...node,
          children: filteredChildren
        });
      }
    } else if (matchesFilter) {
      filteredNodes.push(node);
    }

    return filteredNodes;
  }, []);
}


/**
 * @title Tree with flat nodes (childrenAccessor)
 */
@Component({
  selector: 'app-nested-tree',
  templateUrl: 'nested-tree.component.html',
  styleUrls: ['nested-tree.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NestedTreeComponent,
      multi: true
    }
  ],
  imports: [MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    MatCheckboxModule,
    FormsModule,
    MatChipsModule,
    BreadcrumbsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NestedTreeComponent implements ControlValueAccessor {
  @ViewChild('tree') tree!: MatTree<FoodNode>;

  private originalDataSource: FoodNode[] = [];
  private _dataSource: FoodNode[] = [];
  @Input() set dataSource(value: FoodNode[]) {
    this._dataSource = value;
    this.originalDataSource = value;
    this.treeControl.dataNodes = this._dataSource;
  }
  get dataSource(): FoodNode[] {
    return this._dataSource;  
  }

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  filterValue = '';

  @Input() set multiple(value: boolean) {
    this._multiple = value;
    // Recreate selection model when multiple mode changes
    this.checklistSelection = new SelectionModel<FoodNode>(this._multiple);
    // Clear any existing selection
    this.emitSelectionChange();
  }
  get multiple(): boolean {
    return this._multiple;
  }
  private _multiple = false;

  private _independentParentChildSelection = false;

  get independentParentChildSelection(): boolean {
    return this._independentParentChildSelection;
  }

  set independentParentChildSelection(value: boolean) {
    if (this._independentParentChildSelection !== value) {
      this._independentParentChildSelection = value;
      // Reset all selections when the mode changes
      this.checklistSelection.clear();
    }
  }

  checklistSelection = new SelectionModel<FoodNode>(this.multiple);

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);

  @Input() maxHeight = '400px';  // Default height

  ngAfterViewInit() {
    this.expandAll();
  }

  filterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource = filterTreeData(this.originalDataSource, filterValue);
    this.expandAll();
  }

  clearFilter() {
    this.dataSource = this.originalDataSource;
  }

  expandAll() {
    // TODO: this.tree.expandAll(); 
    // should be enough after this issue is fixed: https://github.com/angular/components/issues/29865
    this.dataSource.forEach(node => {
      this.tree.expandDescendants(node);
    })
  }

  descendantsAllSelected(node: FoodNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const selectableLeafNodes = descendants.filter(n =>
      n.selectable !== false && !this.hasChild(0, n)
    );
    return selectableLeafNodes.length > 0 &&
      selectableLeafNodes.every(child => this.checklistSelection.isSelected(child));
  }

  descendantsPartiallySelected(node: FoodNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const selectableDescendants = descendants.filter(child => child.selectable !== false);
    const result = selectableDescendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  selectNode(node: FoodNode): void {
    if (!this.multiple && node.selectable !== false) {
      this.checklistSelection.clear();
      this.checklistSelection.toggle(node);
      this.emitSelectionChange();
      this.onTouched();
    }
  }

  leafItemSelectionToggle(node: FoodNode): void {
    if (node.selectable === false) return;

    if (this.multiple) {
      this.checklistSelection.toggle(node);
      if (!this.independentParentChildSelection) {
        this.updateParentSelection(this.originalDataSource, node);
      }
      this.emitSelectionChange();
    } else {
      this.selectNode(node);
    }
    this.onTouched();
  }

  private updateParentSelection(nodes: FoodNode[], targetNode: FoodNode): void {
    if (this.independentParentChildSelection) return;

    for (const node of nodes) {
      if (node.children) {
        const descendants = this.treeControl.getDescendants(node);
        if (descendants.includes(targetNode)) {
          // Don't add parent to selection model, just update UI via template binding
          this.checklistSelection.deselect(node);
        }
        this.updateParentSelection(node.children, targetNode);
      }
    }
  }

  parentItemSelectionToggle(node: FoodNode): void {
    if (node.selectable === false) return;

    if (this.multiple) {
      if (this.independentParentChildSelection) {
        this.checklistSelection.toggle(node);
        this.emitSelectionChange();
      } else {
        const descendants = this.treeControl.getDescendants(node);
        const selectableLeafNodes = descendants.filter(n =>
          n.selectable !== false && !this.hasChild(0, n)
        );

        const allLeafNodesSelected = selectableLeafNodes.every(
          node => this.checklistSelection.isSelected(node)
        );

        if (allLeafNodesSelected) {
          this.checklistSelection.deselect(...selectableLeafNodes);
        } else {
          this.checklistSelection.select(...selectableLeafNodes);
        }
        this.emitSelectionChange();
      }
    } else {
      this.selectNode(node);
    }
    this.onTouched();
  }

  // ControlValueAccessor implementation
  private onChange: (value: string | string[]) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(values: string | string[]): void {
    this.checklistSelection.clear();

    if (values) {
      if (this.multiple) {
        // Handle array of values for multiple selection
        (values as string[]).forEach(value => {
          const node = this.findNodeByValue(this.originalDataSource, value);
          if (node) {
            this.checklistSelection.select(node);
          }
        });
      } else {
        // Handle single value for single selection
        const value = values as string;
        const node = this.findNodeByValue(this.originalDataSource, value);
        if (node) {
          this.checklistSelection.select(node);
        }
      }
    }
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

  // Helper methods
  private emitSelectionChange(): void {
    if (this.multiple) {
      // Emit array of values for multiple selection
      const selectedValues = this.checklistSelection.selected.map(node => node.value);
      this.onChange(selectedValues);
    } else {
      // Emit single value for single selection
      const selectedValue = this.checklistSelection.selected[0]?.value ?? null;
      this.onChange(selectedValue);
    }
  }

  private findNodeByValue(nodes: FoodNode[], targetValue: string): FoodNode | null {
    for (const node of nodes) {
      if (node.value === targetValue) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeByValue(node.children, targetValue);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
}
