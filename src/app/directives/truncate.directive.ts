import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[truncate]',
  standalone: true,
})
export class TruncateDirective implements OnInit, AfterViewInit {
  @Input() truncate: string = '';
  @Input() truncateLimit: number = 3;

  private expanded = false;
  private originalText = '';
  private wrapper!: HTMLDivElement;
  private textContainer!: HTMLSpanElement;
  private toggleButton!: HTMLAnchorElement;
  private isOverflowing = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.initializeTruncateLimit();
    this.originalText = this.el.nativeElement.textContent || '';
    this.setupElements();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Get line height and calculate heights
      const computedStyle = window.getComputedStyle(this.textContainer);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 20;
      const maxAllowedHeight = lineHeight * this.truncateLimit;

      // Temporarily remove line clamp
      this.renderer.removeStyle(this.textContainer, '-webkit-line-clamp');
      this.renderer.removeStyle(this.textContainer, 'display');
      this.renderer.setStyle(this.textContainer, 'display', 'block');

      // Get the actual content height
      const contentHeight = this.textContainer.getBoundingClientRect().height;

      // Restore line clamp
      this.renderer.removeStyle(this.textContainer, 'display');
      this.renderer.setStyle(this.textContainer, 'display', '-webkit-box');
      this.renderer.setStyle(
        this.textContainer,
        '-webkit-line-clamp',
        this.truncateLimit
      );

      console.log('Line height:', lineHeight);
      console.log('Max allowed height:', maxAllowedHeight);
      console.log('Content height:', contentHeight);

      // Show button if content exceeds max allowed height
      if (contentHeight > maxAllowedHeight + 1) {
        this.renderer.setStyle(this.toggleButton, 'display', 'inline');
      } else {
        this.renderer.setStyle(this.toggleButton, 'display', 'none');
      }
    }, 100);
  }

  private initializeTruncateLimit(): void {
    if (this.truncate && !isNaN(Number(this.truncate))) {
      this.truncateLimit = Number(this.truncate);
    }
  }

  private setupElements(): void {
    this.setupWrapper();
    this.setupContainer();
    this.setupToggleButton();
  }

  private setupWrapper(): void {
    this.wrapper = this.renderer.createElement('div');
    this.applyWrapperStyles();
    this.moveElementToWrapper();
  }

  private applyWrapperStyles(): void {
    this.renderer.setStyle(this.wrapper, 'width', '100%');
    this.renderer.setStyle(this.wrapper, 'word-break', 'break-word');
  }

  private moveElementToWrapper(): void {
    this.renderer.insertBefore(
      this.el.nativeElement.parentNode,
      this.wrapper,
      this.el.nativeElement
    );
    this.renderer.appendChild(this.wrapper, this.el.nativeElement);
  }

  private setupContainer(): void {
    this.el.nativeElement.textContent = '';
    this.textContainer = this.renderer.createElement('span');
    this.applyContainerStyles();
    this.setContainerContent();
  }

  private applyContainerStyles(): void {
    const styles = {
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      'word-break': 'break-word',
      'text-overflow': 'ellipsis',
      'white-space': 'normal',
      'line-height': '1.2em',
    };

    Object.entries(styles).forEach(([property, value]) => {
      this.renderer.setStyle(this.textContainer, property, value);
    });
  }

  private setContainerContent(): void {
    this.renderer.setProperty(
      this.textContainer,
      'textContent',
      this.originalText
    );
    this.renderer.appendChild(this.el.nativeElement, this.textContainer);
  }

  private setupToggleButton(): void {
    this.toggleButton = this.renderer.createElement('a');
    this.applyToggleButtonStyles();
    this.setupToggleButtonBehavior();
  }

  private applyToggleButtonStyles(): void {
    const styles = {
      'text-decoration': 'none',
      cursor: 'pointer',
      'margin-left': '4px',
      display: 'none',
      color: '#0066cc',
    };

    Object.entries(styles).forEach(([property, value]) => {
      this.renderer.setStyle(this.toggleButton, property, value);
    });

    this.renderer.setProperty(this.toggleButton, 'textContent', 'See more');
  }

  private setupToggleButtonBehavior(): void {
    this.renderer.listen(this.toggleButton, 'click', (event) => {
      event.preventDefault();
      this.toggleText();
    });
    this.renderer.appendChild(this.el.nativeElement, this.toggleButton);
  }

  private checkAndHandleOverflow(): void {
    setTimeout(() => {
      this.removeClampStyles();
      const { maxAllowedHeight, actualHeight } = this.calculateHeights();
      this.isOverflowing = actualHeight > maxAllowedHeight;
      this.updateDisplay();
    });
  }

  private removeClampStyles(): void {
    this.renderer.removeStyle(this.textContainer, '-webkit-line-clamp');
    this.renderer.removeStyle(this.textContainer, 'max-height');
  }

  private calculateHeights(): {
    maxAllowedHeight: number;
    actualHeight: number;
  } {
    const computedStyle = window.getComputedStyle(this.textContainer);
    const lineHeight = parseInt(computedStyle.lineHeight) || 20;
    const maxAllowedHeight = lineHeight * this.truncateLimit;
    const actualHeight = this.textContainer.scrollHeight;

    return { maxAllowedHeight, actualHeight };
  }

  private updateDisplay(): void {
    if (this.isOverflowing) {
      this.updateLineClamp(false);
      this.renderer.setStyle(this.toggleButton, 'display', 'inline');
    } else {
      this.renderer.setStyle(this.toggleButton, 'display', 'none');
    }
  }

  private toggleText(): void {
    this.expanded = !this.expanded;
    this.updateLineClamp(this.expanded);
    this.updateToggleButtonText();
  }

  private updateLineClamp(expanded: boolean): void {
    if (expanded) {
      this.removeClampStyles();
    } else {
      this.renderer.setStyle(
        this.textContainer,
        '-webkit-line-clamp',
        this.truncateLimit
      );
      this.renderer.setStyle(
        this.textContainer,
        'max-height',
        `${this.truncateLimit * 1.2}em`
      );
    }
  }

  private updateToggleButtonText(): void {
    this.renderer.setProperty(
      this.toggleButton,
      'textContent',
      this.expanded ? 'See less' : 'See more'
    );
  }
}
