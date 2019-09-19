import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

import { WimService } from './wim.service';

@Directive({
  selector: '[wim]',
})
export class WimDirective implements OnChanges {
  @Input('wim') wim: string;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private wimService: WimService
  ) {}

  ngOnChanges() {
    const html = this.wimService.toHtml(this.wim || '');
    this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
  }
}
