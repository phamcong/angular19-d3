import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[truncateManual]',
  standalone: true,
})
export class TruncateManualDirective implements OnInit, AfterViewInit {
  @Input() truncateLimit: number = 3; // Default number of lines

  private originalText: string = '';
  private expanded: boolean = false;
  private textContainer!: HTMLElement;
  private toggleButton!: HTMLElement;
  private words: string[] = [];
  private maxAllowedHeight: number = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.initializeTruncateLimit();
    this.originalText = this.el.nativeElement.textContent || '';
    this.words = this.originalText.split(' ');
    this.setupElements();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Calculate max allowed height
      const computedStyle = window.getComputedStyle(this.textContainer);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 20;
      this.maxAllowedHeight = lineHeight * this.truncateLimit;

      console.log('this.maxAllowedHeight: ', this.maxAllowedHeight);

      // Start with empty content
      this.textContainer.textContent = '';
      this.addWordsUntilOverflow();
    }, 100);
  }

  private initializeTruncateLimit(): void {
    if (typeof this.truncateLimit !== 'number' || this.truncateLimit <= 0) {
      console.warn('Invalid truncate limit. Using default value of 3.');
      this.truncateLimit = 3;
    }
  }

  private setupElements(): void {
    // Create container for text content
    this.textContainer = this.el.nativeElement;

    // Create toggle button as a span (for inline display)
    this.toggleButton = this.renderer.createElement('span');
    this.renderer.addClass(this.toggleButton, 'toggle-button');
    this.renderer.setStyle(this.toggleButton, 'color', 'blue');
    this.renderer.setStyle(this.toggleButton, 'cursor', 'pointer');
    this.renderer.listen(this.toggleButton, 'click', () => this.toggleText());
  }

  private addWordsUntilOverflow(): void {
    let currentText = '';
    let i = 0;
    let lastSafeIndex = 0;
    const toggleText = ' ... Show more';
    
    // First pass: find the approximate breaking point
    while (i < this.words.length) {
      const nextWord = this.words[i];
      const testText = currentText + (currentText ? ' ' : '') + nextWord + toggleText;
      
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

    // Second pass: backtrack to ensure we have space for toggle text
    let finalText = '';
    for (i = 0; i <= lastSafeIndex; i++) {
      const testText = finalText + (finalText ? ' ' : '') + this.words[i] + toggleText;
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

    // Set the final content with toggle button
    this.textContainer.textContent = finalText;
    
    // Add the toggle button inline
    const toggleSpan = this.renderer.createElement('span');
    this.renderer.setStyle(toggleSpan, 'display', 'inline');
    this.toggleButton.textContent = 'Show more';
    
    const ellipsis = this.renderer.createText(' ... ');
    this.renderer.appendChild(toggleSpan, ellipsis);
    this.renderer.appendChild(toggleSpan, this.toggleButton);
    this.renderer.appendChild(this.textContainer, toggleSpan);
  }

  private toggleText(): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.textContainer.textContent = this.originalText + ' ';
      this.toggleButton.textContent = 'Show less';
      const toggleSpan = this.renderer.createElement('span');
      this.renderer.appendChild(toggleSpan, this.toggleButton);
      this.renderer.appendChild(this.textContainer, toggleSpan);
    } else {
      this.textContainer.textContent = '';
      this.addWordsUntilOverflow();
    }
  }
}