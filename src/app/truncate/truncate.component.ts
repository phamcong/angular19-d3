import { Component, Input, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-truncate',
  templateUrl: './truncate.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./truncate.component.scss'],
})
export class TruncateComponent implements AfterViewInit, OnDestroy {
  @Input() text: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
  @Input() maxLines: number = 3;

  expanded: boolean = false;
  isTruncated: boolean = false;

  private resizeObserver: ResizeObserver | null = null;

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    this.cleanupResizeObserver();
  }

  private setupResizeObserver() {
    const element = document.querySelector('.line-clamp');
    if (element) {
      let previousWidth = element.clientWidth;
      
      this.resizeObserver = new ResizeObserver((entries) => {
        console.log('entries', entries);
        const entry = entries[0];
        const currentWidth = entry.contentRect.width;
        
        if (currentWidth !== previousWidth) {
          previousWidth = currentWidth;
          this.checkTruncation();
        }
      });
      
      this.resizeObserver.observe(element);
      // Initial check
      this.checkTruncation();
    }
  }

  private cleanupResizeObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private checkTruncation() {
    setTimeout(() => {
      const element = document.querySelector('.line-clamp');
      if (element) {
        this.isTruncated = element.scrollHeight > element.clientHeight;
        this.cd.detectChanges();
      }
    }, 100);
  }

  toggleText() {
    this.expanded = !this.expanded;
    this.cd.detectChanges();
  }
}
