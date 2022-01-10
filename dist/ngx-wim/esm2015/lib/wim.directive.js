/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { WimService } from './wim.service';
export class WimDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer2
     * @param {?} wimService
     */
    constructor(elementRef, renderer2, wimService) {
        this.elementRef = elementRef;
        this.renderer2 = renderer2;
        this.wimService = wimService;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        /** @type {?} */
        const html = this.wimService.toHtml(this.wim || '');
        this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
    }
}
WimDirective.decorators = [
    { type: Directive, args: [{
                selector: '[wim]',
            },] }
];
/** @nocollapse */
WimDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: WimService }
];
WimDirective.propDecorators = {
    wim: [{ type: Input, args: ['wim',] }]
};
if (false) {
    /** @type {?} */
    WimDirective.prototype.wim;
    /**
     * @type {?}
     * @private
     */
    WimDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    WimDirective.prototype.renderer2;
    /**
     * @type {?}
     * @private
     */
    WimDirective.prototype.wimService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13aW0vIiwic291cmNlcyI6WyJsaWIvd2ltLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE1BQU0sT0FBTyxZQUFZOzs7Ozs7SUFHdkIsWUFDVSxVQUFzQixFQUN0QixTQUFvQixFQUNwQixVQUFzQjtRQUZ0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUM3QixDQUFDOzs7O0lBRUosV0FBVzs7Y0FDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7OztZQWZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTzthQUNsQjs7OztZQU5tQixVQUFVO1lBQW9CLFNBQVM7WUFFbEQsVUFBVTs7O2tCQU1oQixLQUFLLFNBQUMsS0FBSzs7OztJQUFaLDJCQUEwQjs7Ozs7SUFHeEIsa0NBQThCOzs7OztJQUM5QixpQ0FBNEI7Ozs7O0lBQzVCLGtDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFdpbVNlcnZpY2UgfSBmcm9tICcuL3dpbS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3dpbV0nLFxufSlcbmV4cG9ydCBjbGFzcyBXaW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoJ3dpbScpIHdpbTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgd2ltU2VydmljZTogV2ltU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgY29uc3QgaHRtbCA9IHRoaXMud2ltU2VydmljZS50b0h0bWwodGhpcy53aW0gfHwgJycpO1xuICAgIHRoaXMucmVuZGVyZXIyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgaHRtbCk7XG4gIH1cbn1cbiJdfQ==