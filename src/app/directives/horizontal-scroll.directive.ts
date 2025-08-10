import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appHorizontalScroll]',
  standalone: true,
})
export class HorizontalScroll implements OnInit, OnDestroy {
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private mouseMoveListener?: (e: MouseEvent) => void;
  private mouseUpListener?: () => void;
  private mouseLeaveListener?: () => void;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;

    element.style.userSelect = 'none';
    element.style.cursor = 'grab';

    // mousedown
    element.addEventListener('mousedown', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractiveELement =
        target.matches('button, input, textarea, select, a') ||
        target.closest('button, input, textarea, select, a');

      if (isInteractiveELement) {
        return;
      }

      this.isDown = true;
      element.style.cursor = 'grabbing';

      this.startX = e.pageX - element.offsetLeft;
      this.scrollLeft = element.scrollLeft;

      e.preventDefault();
    });

    // mousemove
    this.mouseMoveListener = (e: MouseEvent) => {
      if (!this.isDown) return;
      e.preventDefault();

      const x = e.pageX - element.offsetLeft;
      const walk = x - this.startX;
      element.scrollLeft = this.scrollLeft - walk;
    };
    document.addEventListener('mousemove', this.mouseMoveListener);

    // mouseup
    this.mouseUpListener = () => {
      this.isDown = false;
      element.style.cursor = 'grab';
    };
    document.addEventListener('mouseup', this.mouseUpListener);

    // mouseleave
    this.mouseLeaveListener = () => {
      this.isDown = false;
      element.style.cursor = 'grab';
    };
    element.addEventListener('mouseLeave', this.mouseLeaveListener);

    // mobile
    element.addEventListener('touchstart', (e: TouchEvent) => {
      this.isDown = true;
      this.startX = e.touches[0].pageX - element.offsetLeft;
      this.scrollLeft = element.scrollLeft;
    });

    element.addEventListener('touchmove', (e: TouchEvent) => {
      if (!this.isDown) return;
      e.preventDefault();

      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = x - this.startX;
      element.scrollLeft = this.scrollLeft - walk;
    });

    element.addEventListener('touchend', () => {
      this.isDown = false;
    });
  }

  ngOnDestroy(): void {
    if (this.mouseMoveListener) {
      document.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseUpListener) {
      document.removeEventListener('mouseup', this.mouseUpListener);
    }
    if (this.mouseLeaveListener) {
      this.el.nativeElement.removeEventListener(
        'mouseleave',
        this.mouseLeaveListener
      );
    }
  }
}
