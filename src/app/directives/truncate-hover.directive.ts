import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef,
  Host,
  Injector
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[truncateHover]',
  standalone: true,
  hostDirectives: [MatTooltip]
})
export class TruncateHoverDirective implements OnInit, AfterViewInit {
  @Input() truncateLimit: number = 3; // Default number of lines

  private originalText: string = '';
  private textContainer!: HTMLElement;
  private moreIndicator!: HTMLElement;
  private words: string[] = [];
  private maxAllowedHeight: number = 0;
  private tooltip!: MatTooltip;
  private moreSpan!: HTMLElement;
  private moreTooltip!: MatTooltip;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    @Host() private parentTooltip: MatTooltip,
    private injector: Injector
  ) {
    // Create the more span
    this.moreSpan = this.renderer.createElement('span');
    this.renderer.setStyle(this.moreSpan, 'display', 'inline');
    
    // Create tooltip using proper injection context
    this.moreTooltip = this.injector.get(MatTooltip);
  }

  ngOnInit() {
    this.initializeTruncateLimit();
    this.setupElements();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Read the text content after view is initialized
      this.originalText = this.el.nativeElement.textContent || '';
      this.words = this.originalText.split(' ');

      // Calculate max allowed height
      const computedStyle = window.getComputedStyle(this.textContainer);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 20;
      this.maxAllowedHeight = lineHeight * this.truncateLimit;

      // Start with empty content
      this.textContainer.textContent = '';
      this.addWordsUntilOverflow();

      // Set tooltip message after we have the full text
      this.moreTooltip.message = this.originalText;
      this.moreTooltip.disabled = false;
    }, 100);
  }

  private initializeTruncateLimit(): void {
    if (typeof this.truncateLimit !== 'number' || this.truncateLimit <= 0) {
      console.warn('Invalid truncate limit. Using default value of 3.');
      this.truncateLimit = 3;
    }
  }

  private setupElements(): void {
    this.textContainer = this.el.nativeElement;

    // Create more indicator
    this.moreIndicator = this.renderer.createElement('span');
    this.renderer.addClass(this.moreIndicator, 'more-indicator');
    this.renderer.setStyle(this.moreIndicator, 'color', '#0066cc');
    this.renderer.setStyle(this.moreIndicator, 'cursor', 'pointer');
    this.renderer.setProperty(this.moreIndicator, 'textContent', 'See more');
    
    // Setup more span (without setting text content here)
    this.moreSpan = this.renderer.createElement('span');
    this.renderer.setStyle(this.moreSpan, 'display', 'inline');
    this.renderer.setStyle(this.moreSpan, 'cursor', 'pointer');
  }

  private addWordsUntilOverflow(): void {
    let currentText = '';
    let i = 0;
    let lastSafeIndex = 0;
    const moreText = ' ... See more';
    
    // First pass: find the approximate breaking point
    while (i < this.words.length) {
      const nextWord = this.words[i];
      const testText = currentText + (currentText ? ' ' : '') + nextWord + moreText;
      
      this.textContainer.textContent = testText;
      const contentHeight = this.textContainer.getBoundingClientRect().height;

      if (contentHeight > this.maxAllowedHeight) {
        break;
      }

      currentText = currentText + (currentText ? ' ' : '') + nextWord;
      lastSafeIndex = i;
      i++;

      if (i === this.words.length) {
        // All words fit, no need for truncation
        this.textContainer.textContent = currentText;
        return;
      }
    }

    // Second pass: backtrack to ensure we have space for more indicator
    let finalText = '';
    for (i = 0; i <= lastSafeIndex; i++) {
      const testText = finalText + (finalText ? ' ' : '') + this.words[i] + moreText;
      this.textContainer.textContent = testText;
      const contentHeight = this.textContainer.getBoundingClientRect().height;

      if (contentHeight > this.maxAllowedHeight) {
        // Remove the last word and break
        finalText = this.words.slice(0, i).join(' ');
        break;
      }

      finalText += (finalText ? ' ' : '') + this.words[i];
      
      // If this is the last safe word, keep it
      if (i === lastSafeIndex) {
        break;
      }
    }

    // Set the final content with more indicator
    this.textContainer.textContent = finalText;
    
    this.moreTooltip.message = this.originalText;
    this.moreTooltip.position = 'above';
    this.moreTooltip.showDelay = 300;
    this.moreTooltip.hideDelay = 100;
    
    const ellipsis = this.renderer.createText(' ... ');
    this.renderer.appendChild(this.moreSpan, ellipsis);
    this.renderer.appendChild(this.moreSpan, this.moreIndicator);
    this.renderer.appendChild(this.textContainer, this.moreSpan);

    this.moreTooltip.disabled = false;

    // Configure tooltip to attach to the more indicator
    this.moreTooltip = this.injector.get(MatTooltip);
    this.moreTooltip.message = this.originalText;
    this.moreTooltip.position = 'above';
    this.moreTooltip.showDelay = 300;
    this.moreTooltip.hideDelay = 100;
    
    // Set the tooltip element reference to the more indicator
    (this.moreTooltip as any)._elementRef = new ElementRef(this.moreIndicator);
  }
}