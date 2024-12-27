import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
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
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTreeComponent {
  @ViewChild('tree') tree!: MatTree<FoodNode>;

  dataSource = TREE_DATA;

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  filterValue = '';

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
}
