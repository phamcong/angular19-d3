import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTree, MatTreeModule } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
  selectable?: boolean;
  level?: number;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli', selectable: false }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

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
  imports: [MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    NgFor,
    MatCheckboxModule,
    FormsModule,
    MatChipsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NestedTreeComponent {
  @ViewChild('tree') tree!: MatTree<FoodNode>;

  dataSource = TREE_DATA;

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  filterValue = '';

  multiple = true;

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

  ngAfterViewInit() {
    this.expandAll();
  }

  filterChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource = filterTreeData(TREE_DATA, filterValue);
    this.expandAll();
  }

  clearFilter() {
    this.dataSource = TREE_DATA;
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
    }
  }

  leafItemSelectionToggle(node: FoodNode): void {
    if (node.selectable === false) return;
    
    if (this.multiple) {
      this.checklistSelection.toggle(node);
      if (!this.independentParentChildSelection) {
        this.updateParentSelection(TREE_DATA, node);
      }
    } else {
      this.selectNode(node);
    }
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
      } else {
        const descendants = this.treeControl.getDescendants(node);
        const selectableLeafNodes = descendants.filter(n => 
          n.selectable !== false && !this.hasChild(0, n)
        );
        
        // Check if ALL leaf nodes are currently selected
        const allLeafNodesSelected = selectableLeafNodes.every(
          node => this.checklistSelection.isSelected(node)
        );
        
        if (allLeafNodesSelected) {
          this.checklistSelection.deselect(...selectableLeafNodes);
        } else {
          this.checklistSelection.select(...selectableLeafNodes);
        }
      }
    } else {
      this.selectNode(node);
    }
  }
}
