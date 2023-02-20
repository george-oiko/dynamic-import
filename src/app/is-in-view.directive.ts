import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subject, takeUntil, combineLatest, startWith } from 'rxjs';

@Directive({
  selector: '[appIsInView]'
})
export class IsInViewDirective implements AfterViewInit, OnDestroy {
  @Output() inView = new EventEmitter<boolean>();
  unsubscribe$ = new Subject<void>();
  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    fromEvent(window, 'scroll').pipe(startWith(0), takeUntil(this.unsubscribe$)).subscribe(event => {
      const windowHeight = window.innerHeight;
      const boundedRect = this.element.nativeElement.getBoundingClientRect();

    if (boundedRect.top >= 0 && boundedRect.bottom <= windowHeight) {
        this.inView.emit(true);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }

}
