/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { WimService } from './wim.service';
var WimDirective = /** @class */ (function () {
    function WimDirective(elementRef, renderer2, wimService) {
        this.elementRef = elementRef;
        this.renderer2 = renderer2;
        this.wimService = wimService;
    }
    /**
     * @return {?}
     */
    WimDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var html = this.wimService.toHtml(this.wim || '');
        this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
    };
    WimDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[wim]',
                },] }
    ];
    /** @nocollapse */
    WimDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: WimService }
    ]; };
    WimDirective.propDecorators = {
        wim: [{ type: Input, args: ['wim',] }]
    };
    return WimDirective;
}());
export { WimDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ltLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC13aW0vIiwic291cmNlcyI6WyJsaWIvd2ltLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBTUUsc0JBQ1UsVUFBc0IsRUFDdEIsU0FBb0IsRUFDcEIsVUFBc0I7UUFGdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDN0IsQ0FBQzs7OztJQUVKLGtDQUFXOzs7SUFBWDs7WUFDUSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7O2dCQWZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsT0FBTztpQkFDbEI7Ozs7Z0JBTm1CLFVBQVU7Z0JBQW9CLFNBQVM7Z0JBRWxELFVBQVU7OztzQkFNaEIsS0FBSyxTQUFDLEtBQUs7O0lBWWQsbUJBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWJZLFlBQVk7OztJQUN2QiwyQkFBMEI7Ozs7O0lBR3hCLGtDQUE4Qjs7Ozs7SUFDOUIsaUNBQTRCOzs7OztJQUM1QixrQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBXaW1TZXJ2aWNlIH0gZnJvbSAnLi93aW0uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t3aW1dJyxcbn0pXG5leHBvcnQgY2xhc3MgV2ltRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCd3aW0nKSB3aW06IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHdpbVNlcnZpY2U6IFdpbVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGNvbnN0IGh0bWwgPSB0aGlzLndpbVNlcnZpY2UudG9IdG1sKHRoaXMud2ltIHx8ICcnKTtcbiAgICB0aGlzLnJlbmRlcmVyMi5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIGh0bWwpO1xuICB9XG59XG4iXX0=