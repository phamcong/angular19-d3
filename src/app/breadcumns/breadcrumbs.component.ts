import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FoodNode } from '../nested-tree/nested-tree.component';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  template: `
    <div class="breadcrumbs" *ngIf="selectedNodes.length > 0">
      <div *ngFor="let path of getAllPaths()" class="breadcrumb-path">
        <span *ngFor="let node of path; let last = last" class="breadcrumb-item">
          <span [class.active]="last">{{ node.name }}</span>
          <span *ngIf="!last" class="separator">&gt;</span>
        </span>
      </div>
    </div>
  `,
  styles: [`
    .breadcrumbs {
      padding: 8px 0;
      margin-bottom: 16px;
    }
    
    .breadcrumb-path {
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .breadcrumb-item {
      color: rgba(0, 0, 0, 0.87);
      font-size: 16px;
    }
    
    .separator {
      margin: 0 8px;
      color: rgba(0, 0, 0, 0.54);
      font-size: 16px;
    }
    
    .active {
      font-weight: 500;
    }
  `]
})
export class BreadcrumbsComponent {
  @Input() selectedNodes: FoodNode[] = [];
  @Input() treeData: FoodNode[] = [];

  getAllPaths(): FoodNode[][] {
    return this.selectedNodes.map(node => this.getPath(node));
  }

  private getPath(node: FoodNode): FoodNode[] {
    const path: FoodNode[] = [];
    this.findPath(this.treeData, node, path);
    return path;
  }

  private findPath(nodes: FoodNode[], target: FoodNode, path: FoodNode[]): boolean {
    for (const node of nodes) {
      path.push(node);

      if (node === target) {
        return true;
      }

      if (node.children) {
        if (this.findPath(node.children, target, path)) {
          return true;
        }
      }

      path.pop();
    }

    return false;
  }
} 