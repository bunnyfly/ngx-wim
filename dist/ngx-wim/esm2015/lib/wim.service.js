/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
// Delimiters must be have whitespace or line-boundary around them.
/** @type {?} */
const WHITESPACE_OR_LINE_BREAK = /(?:^|\s|$)/;
// Common surrounding characters can sit between the whitespace/line-boundary and the delimiter,
// like quotes, parens, etc.
// NOTE: Since HTML escaping may have been performed, need to match both literal and escaped chars.
// TODO: _*nested*_ delimiter support is hacky. Bolster logic for it.
/** @type {?} */
const ALLOWED_LEFT_SURROUND = /(?:\(|'|&#039;|"|&quot;|&#34;|‘|&#8216;|“|&#8220;|_|<em>|\*|<strong>){0,3}/;
/** @type {?} */
const ALLOWED_RIGHT_SURROUND = /(?:\)|'|&#039;|"|&quot;|&#34;|’|&#8217;|”|&#8221;|_|<\/em>|\*|<\/strong>|[,.?!:]){0,3}/;
// Returns a regex matching the delimiters and the text they wrap. The wrapped text may not include
// the delimiter.
/** @type {?} */
const WRAPPED_INLINE_MATCH = (/**
 * @param {?} d
 * @return {?}
 */
d => 
// Open delimiter
`\\${d}` +
    // Capture the text between delimiters.
    `(` +
    // Text between starts with non-whitespace.
    `[^\\s${d}]` +
    // Text between must not contain line-breaks or large-whitespace.
    `(?:[^\\r\\n\\t\\f\\v${d}]*` +
    // Text between ends with non-whitespace.
    `[^\\s${d}])?` +
    `)` +
    // Close delimiter
    `\\${d}`);
const ɵ0 = WRAPPED_INLINE_MATCH;
// A full regex to match a delimiter. Capture groups:
// 0: Text before opening delimiter.
// 1: Text between delimiters.
// 2: Text after closing delimiter.
/** @type {?} */
const INLINE_DELIMITER_REGEX = (/**
 * @param {?} d
 * @return {?}
 */
d => new RegExp('(' +
    WHITESPACE_OR_LINE_BREAK.source +
    ALLOWED_LEFT_SURROUND.source +
    ')' +
    WRAPPED_INLINE_MATCH(d) +
    '(' +
    ALLOWED_RIGHT_SURROUND.source +
    WHITESPACE_OR_LINE_BREAK.source +
    ')', 'gm'));
const ɵ1 = INLINE_DELIMITER_REGEX;
/** @type {?} */
const STRONG_REGEX = INLINE_DELIMITER_REGEX('*');
/** @type {?} */
const EM_REGEX = INLINE_DELIMITER_REGEX('_');
// There is no general regex that can capture URLs-in-text perfectly. This is our good-enough
// approximation.
// TODO: Allow URL preceeded/followed by parenthesis, quotes, etc.
// TODO: Allow IDN/Unicode domains.
/** @type {?} */
const URL_REGEX_PATH_FINAL_CHARS = 'a-z0-9\\/\\-+&@#%=~_|$';
/** @type {?} */
const URL_REGEX_FOLLOWING_CHARS = '?!:,.';
/** @type {?} */
const URL_REGEX_PATH_CHARS = URL_REGEX_PATH_FINAL_CHARS + URL_REGEX_FOLLOWING_CHARS;
/** @type {?} */
const URL_REGEX = new RegExp(
// Capture group $1: URL is preceeded by line-boundary or whitespace.
'(^|\\s)' +
    // Capture group $2: the URL.
    '(' +
    // Optional protocols http://, https://, and ftp://
    '(?:https?://|ftp://)?' +
    // Domain plus any subdomains
    '(?:[a-z0-9\\-]{1,63}\\.)+' +
    // TLD
    '[a-z]{1,63}' +
    // Optional path. The final character's set is limited to prevent some ending punctuation.
    // E.g., the final period of "foo.com/bar.baz." shouldn't be included in the URL.
    `(?:[${URL_REGEX_PATH_CHARS}]*[${URL_REGEX_PATH_FINAL_CHARS}])?` +
    // End of URL capture group.
    ')' +
    // Capture group $3: URL is followed by line-boundary, whitespace, or "following char."
    `($|\\s|[${URL_REGEX_FOLLOWING_CHARS}])`, 'gi');
export class WimService {
    /**
     * @param {?} domSanitizer
     */
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    static escapeHtml(message) {
        // NOTE: Weird bug workaround. Angular complains `Expression form not supported` with some
        // static methods. Either storing the param as a const before using it or adding `// @dynamic`
        // to the class avoids it.
        /** @type {?} */
        const msg = message;
        return msg
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    /**
     * @param {?} message
     * @param {?=} options
     * @return {?}
     */
    toHtml(message, options = {}) {
        if (!options.noEscape) {
            message = WimService.escapeHtml(message);
        }
        // Links!
        // TODO: Prevent escaping link chars like &.
        message = message.replace(URL_REGEX, (/**
         * @param {?} x
         * @param {?} preceeding
         * @param {?} url
         * @param {?} following
         * @return {?}
         */
        (x, preceeding, url, following) => {
            // If the URL doesn't have a protocol, prepend the relative protocol, '//'.
            /** @type {?} */
            const href = url.match(/^((http|https|ftp):\/\/)/i) ? url : '//' + url;
            return `${preceeding}<a target="_blank" href="${href}">${url}</a>${following}`;
        }));
        // Inline delimiters like *bold* and _italic_.
        message = message.replace(STRONG_REGEX, '$1<strong>$2</strong>$3');
        message = message.replace(EM_REGEX, '$1<em>$2</em>$3');
        // Breaks
        message = message.replace(/\n/g, '<br>');
        if (!options.noSanitize) {
            message = this.domSanitizer.sanitize(SecurityContext.HTML, message);
        }
        return message;
    }
}
WimService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
WimService.ctorParameters = () => [
    { type: DomSanitizer }
];
/** @nocollapse */ WimService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WimService_Factory() { return new WimService(i0.ɵɵinject(i1.DomSanitizer)); }, token: WimService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    WimService.prototype.domSanitizer;
}
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ltLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2ltLyIsInNvdXJjZXMiOlsibGliL3dpbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7O01BUW5ELHdCQUF3QixHQUFHLFlBQVk7Ozs7OztNQUt2QyxxQkFBcUIsR0FBRyw0RUFBNEU7O01BQ3BHLHNCQUFzQixHQUFHLHdGQUF3Rjs7OztNQUdqSCxvQkFBb0I7Ozs7QUFBRyxDQUFDLENBQUMsRUFBRTtBQUMvQixpQkFBaUI7QUFDakIsS0FBSyxDQUFDLEVBQUU7SUFDUix1Q0FBdUM7SUFDdkMsR0FBRztJQUNILDJDQUEyQztJQUMzQyxRQUFRLENBQUMsR0FBRztJQUNaLGlFQUFpRTtJQUNqRSx1QkFBdUIsQ0FBQyxJQUFJO0lBQzVCLHlDQUF5QztJQUN6QyxRQUFRLENBQUMsS0FBSztJQUNkLEdBQUc7SUFDSCxrQkFBa0I7SUFDbEIsS0FBSyxDQUFDLEVBQUUsQ0FBQTs7Ozs7OztNQU1KLHNCQUFzQjs7OztBQUFHLENBQUMsQ0FBQyxFQUFFLENBQ2pDLElBQUksTUFBTSxDQUNSLEdBQUc7SUFDRCx3QkFBd0IsQ0FBQyxNQUFNO0lBQy9CLHFCQUFxQixDQUFDLE1BQU07SUFDNUIsR0FBRztJQUNILG9CQUFvQixDQUFDLENBQUMsQ0FBQztJQUN2QixHQUFHO0lBQ0gsc0JBQXNCLENBQUMsTUFBTTtJQUM3Qix3QkFBd0IsQ0FBQyxNQUFNO0lBQy9CLEdBQUcsRUFDTCxJQUFJLENBQ0wsQ0FBQTs7O01BRUcsWUFBWSxHQUFHLHNCQUFzQixDQUFDLEdBQUcsQ0FBQzs7TUFDMUMsUUFBUSxHQUFHLHNCQUFzQixDQUFDLEdBQUcsQ0FBQzs7Ozs7O01BTXRDLDBCQUEwQixHQUFHLHdCQUF3Qjs7TUFDckQseUJBQXlCLEdBQUcsT0FBTzs7TUFDbkMsb0JBQW9CLEdBQUcsMEJBQTBCLEdBQUcseUJBQXlCOztNQUM3RSxTQUFTLEdBQUcsSUFBSSxNQUFNO0FBQzFCLHFFQUFxRTtBQUNyRSxTQUFTO0lBQ1AsNkJBQTZCO0lBQzdCLEdBQUc7SUFDSCxtREFBbUQ7SUFDbkQsdUJBQXVCO0lBQ3ZCLDZCQUE2QjtJQUM3QiwyQkFBMkI7SUFDM0IsTUFBTTtJQUNOLGFBQWE7SUFDYiwwRkFBMEY7SUFDMUYsaUZBQWlGO0lBQ2pGLE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLEtBQUs7SUFDaEUsNEJBQTRCO0lBQzVCLEdBQUc7SUFDSCx1RkFBdUY7SUFDdkYsV0FBVyx5QkFBeUIsSUFBSSxFQUMxQyxJQUFJLENBQ0w7QUFLRCxNQUFNLE9BQU8sVUFBVTs7OztJQUNyQixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7Ozs7OztJQUUxQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWU7Ozs7O2NBSWpDLEdBQUcsR0FBRyxPQUFPO1FBQ25CLE9BQU8sR0FBRzthQUNQLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO2FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQWUsRUFBRSxVQUFzQixFQUFFO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFDO1FBRUQsU0FBUztRQUNULDRDQUE0QztRQUM1QyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7Ozs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRTs7O2tCQUUvRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHO1lBQ3RFLE9BQU8sR0FBRyxVQUFVLDRCQUE0QixJQUFJLEtBQUssR0FBRyxPQUFPLFNBQVMsRUFBRSxDQUFDO1FBQ2pGLENBQUMsRUFBQyxDQUFDO1FBRUgsOENBQThDO1FBQzlDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZELFNBQVM7UUFDVCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDdkIsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckU7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUExQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBbkZRLFlBQVk7Ozs7Ozs7O0lBcUZQLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFNlY3VyaXR5Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmV4cG9ydCB0eXBlIFdpbU9wdGlvbnMgPSB7XG4gIG5vRXNjYXBlPzogYm9vbGVhbjtcbiAgbm9TYW5pdGl6ZT86IGJvb2xlYW47XG59O1xuXG4vLyBEZWxpbWl0ZXJzIG11c3QgYmUgaGF2ZSB3aGl0ZXNwYWNlIG9yIGxpbmUtYm91bmRhcnkgYXJvdW5kIHRoZW0uXG5jb25zdCBXSElURVNQQUNFX09SX0xJTkVfQlJFQUsgPSAvKD86XnxcXHN8JCkvO1xuLy8gQ29tbW9uIHN1cnJvdW5kaW5nIGNoYXJhY3RlcnMgY2FuIHNpdCBiZXR3ZWVuIHRoZSB3aGl0ZXNwYWNlL2xpbmUtYm91bmRhcnkgYW5kIHRoZSBkZWxpbWl0ZXIsXG4vLyBsaWtlIHF1b3RlcywgcGFyZW5zLCBldGMuXG4vLyBOT1RFOiBTaW5jZSBIVE1MIGVzY2FwaW5nIG1heSBoYXZlIGJlZW4gcGVyZm9ybWVkLCBuZWVkIHRvIG1hdGNoIGJvdGggbGl0ZXJhbCBhbmQgZXNjYXBlZCBjaGFycy5cbi8vIFRPRE86IF8qbmVzdGVkKl8gZGVsaW1pdGVyIHN1cHBvcnQgaXMgaGFja3kuIEJvbHN0ZXIgbG9naWMgZm9yIGl0LlxuY29uc3QgQUxMT1dFRF9MRUZUX1NVUlJPVU5EID0gLyg/OlxcKHwnfCYjMDM5O3xcInwmcXVvdDt8JiMzNDt84oCYfCYjODIxNjt84oCcfCYjODIyMDt8X3w8ZW0+fFxcKnw8c3Ryb25nPil7MCwzfS87XG5jb25zdCBBTExPV0VEX1JJR0hUX1NVUlJPVU5EID0gLyg/OlxcKXwnfCYjMDM5O3xcInwmcXVvdDt8JiMzNDt84oCZfCYjODIxNzt84oCdfCYjODIyMTt8X3w8XFwvZW0+fFxcKnw8XFwvc3Ryb25nPnxbLC4/ITpdKXswLDN9Lztcbi8vIFJldHVybnMgYSByZWdleCBtYXRjaGluZyB0aGUgZGVsaW1pdGVycyBhbmQgdGhlIHRleHQgdGhleSB3cmFwLiBUaGUgd3JhcHBlZCB0ZXh0IG1heSBub3QgaW5jbHVkZVxuLy8gdGhlIGRlbGltaXRlci5cbmNvbnN0IFdSQVBQRURfSU5MSU5FX01BVENIID0gZCA9PlxuICAvLyBPcGVuIGRlbGltaXRlclxuICBgXFxcXCR7ZH1gICtcbiAgLy8gQ2FwdHVyZSB0aGUgdGV4dCBiZXR3ZWVuIGRlbGltaXRlcnMuXG4gIGAoYCArXG4gIC8vIFRleHQgYmV0d2VlbiBzdGFydHMgd2l0aCBub24td2hpdGVzcGFjZS5cbiAgYFteXFxcXHMke2R9XWAgK1xuICAvLyBUZXh0IGJldHdlZW4gbXVzdCBub3QgY29udGFpbiBsaW5lLWJyZWFrcyBvciBsYXJnZS13aGl0ZXNwYWNlLlxuICBgKD86W15cXFxcclxcXFxuXFxcXHRcXFxcZlxcXFx2JHtkfV0qYCArXG4gIC8vIFRleHQgYmV0d2VlbiBlbmRzIHdpdGggbm9uLXdoaXRlc3BhY2UuXG4gIGBbXlxcXFxzJHtkfV0pP2AgK1xuICBgKWAgK1xuICAvLyBDbG9zZSBkZWxpbWl0ZXJcbiAgYFxcXFwke2R9YDtcblxuLy8gQSBmdWxsIHJlZ2V4IHRvIG1hdGNoIGEgZGVsaW1pdGVyLiBDYXB0dXJlIGdyb3Vwczpcbi8vIDA6IFRleHQgYmVmb3JlIG9wZW5pbmcgZGVsaW1pdGVyLlxuLy8gMTogVGV4dCBiZXR3ZWVuIGRlbGltaXRlcnMuXG4vLyAyOiBUZXh0IGFmdGVyIGNsb3NpbmcgZGVsaW1pdGVyLlxuY29uc3QgSU5MSU5FX0RFTElNSVRFUl9SRUdFWCA9IGQgPT5cbiAgbmV3IFJlZ0V4cChcbiAgICAnKCcgK1xuICAgICAgV0hJVEVTUEFDRV9PUl9MSU5FX0JSRUFLLnNvdXJjZSArXG4gICAgICBBTExPV0VEX0xFRlRfU1VSUk9VTkQuc291cmNlICtcbiAgICAgICcpJyArXG4gICAgICBXUkFQUEVEX0lOTElORV9NQVRDSChkKSArXG4gICAgICAnKCcgK1xuICAgICAgQUxMT1dFRF9SSUdIVF9TVVJST1VORC5zb3VyY2UgK1xuICAgICAgV0hJVEVTUEFDRV9PUl9MSU5FX0JSRUFLLnNvdXJjZSArXG4gICAgICAnKScsXG4gICAgJ2dtJ1xuICApO1xuXG5jb25zdCBTVFJPTkdfUkVHRVggPSBJTkxJTkVfREVMSU1JVEVSX1JFR0VYKCcqJyk7XG5jb25zdCBFTV9SRUdFWCA9IElOTElORV9ERUxJTUlURVJfUkVHRVgoJ18nKTtcblxuLy8gVGhlcmUgaXMgbm8gZ2VuZXJhbCByZWdleCB0aGF0IGNhbiBjYXB0dXJlIFVSTHMtaW4tdGV4dCBwZXJmZWN0bHkuIFRoaXMgaXMgb3VyIGdvb2QtZW5vdWdoXG4vLyBhcHByb3hpbWF0aW9uLlxuLy8gVE9ETzogQWxsb3cgVVJMIHByZWNlZWRlZC9mb2xsb3dlZCBieSBwYXJlbnRoZXNpcywgcXVvdGVzLCBldGMuXG4vLyBUT0RPOiBBbGxvdyBJRE4vVW5pY29kZSBkb21haW5zLlxuY29uc3QgVVJMX1JFR0VYX1BBVEhfRklOQUxfQ0hBUlMgPSAnYS16MC05XFxcXC9cXFxcLSsmQCMlPX5ffCQnO1xuY29uc3QgVVJMX1JFR0VYX0ZPTExPV0lOR19DSEFSUyA9ICc/ITosLic7XG5jb25zdCBVUkxfUkVHRVhfUEFUSF9DSEFSUyA9IFVSTF9SRUdFWF9QQVRIX0ZJTkFMX0NIQVJTICsgVVJMX1JFR0VYX0ZPTExPV0lOR19DSEFSUztcbmNvbnN0IFVSTF9SRUdFWCA9IG5ldyBSZWdFeHAoXG4gIC8vIENhcHR1cmUgZ3JvdXAgJDE6IFVSTCBpcyBwcmVjZWVkZWQgYnkgbGluZS1ib3VuZGFyeSBvciB3aGl0ZXNwYWNlLlxuICAnKF58XFxcXHMpJyArXG4gICAgLy8gQ2FwdHVyZSBncm91cCAkMjogdGhlIFVSTC5cbiAgICAnKCcgK1xuICAgIC8vIE9wdGlvbmFsIHByb3RvY29scyBodHRwOi8vLCBodHRwczovLywgYW5kIGZ0cDovL1xuICAgICcoPzpodHRwcz86Ly98ZnRwOi8vKT8nICtcbiAgICAvLyBEb21haW4gcGx1cyBhbnkgc3ViZG9tYWluc1xuICAgICcoPzpbYS16MC05XFxcXC1dezEsNjN9XFxcXC4pKycgK1xuICAgIC8vIFRMRFxuICAgICdbYS16XXsxLDYzfScgK1xuICAgIC8vIE9wdGlvbmFsIHBhdGguIFRoZSBmaW5hbCBjaGFyYWN0ZXIncyBzZXQgaXMgbGltaXRlZCB0byBwcmV2ZW50IHNvbWUgZW5kaW5nIHB1bmN0dWF0aW9uLlxuICAgIC8vIEUuZy4sIHRoZSBmaW5hbCBwZXJpb2Qgb2YgXCJmb28uY29tL2Jhci5iYXouXCIgc2hvdWxkbid0IGJlIGluY2x1ZGVkIGluIHRoZSBVUkwuXG4gICAgYCg/Olske1VSTF9SRUdFWF9QQVRIX0NIQVJTfV0qWyR7VVJMX1JFR0VYX1BBVEhfRklOQUxfQ0hBUlN9XSk/YCArXG4gICAgLy8gRW5kIG9mIFVSTCBjYXB0dXJlIGdyb3VwLlxuICAgICcpJyArXG4gICAgLy8gQ2FwdHVyZSBncm91cCAkMzogVVJMIGlzIGZvbGxvd2VkIGJ5IGxpbmUtYm91bmRhcnksIHdoaXRlc3BhY2UsIG9yIFwiZm9sbG93aW5nIGNoYXIuXCJcbiAgICBgKCR8XFxcXHN8WyR7VVJMX1JFR0VYX0ZPTExPV0lOR19DSEFSU31dKWAsXG4gICdnaSdcbik7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBXaW1TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBwcml2YXRlIHN0YXRpYyBlc2NhcGVIdG1sKG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gTk9URTogV2VpcmQgYnVnIHdvcmthcm91bmQuIEFuZ3VsYXIgY29tcGxhaW5zIGBFeHByZXNzaW9uIGZvcm0gbm90IHN1cHBvcnRlZGAgd2l0aCBzb21lXG4gICAgLy8gc3RhdGljIG1ldGhvZHMuIEVpdGhlciBzdG9yaW5nIHRoZSBwYXJhbSBhcyBhIGNvbnN0IGJlZm9yZSB1c2luZyBpdCBvciBhZGRpbmcgYC8vIEBkeW5hbWljYFxuICAgIC8vIHRvIHRoZSBjbGFzcyBhdm9pZHMgaXQuXG4gICAgY29uc3QgbXNnID0gbWVzc2FnZTtcbiAgICByZXR1cm4gbXNnXG4gICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJiMwMzk7Jyk7XG4gIH1cblxuICB0b0h0bWwobWVzc2FnZTogc3RyaW5nLCBvcHRpb25zOiBXaW1PcHRpb25zID0ge30pOiBzdHJpbmcge1xuICAgIGlmICghb3B0aW9ucy5ub0VzY2FwZSkge1xuICAgICAgbWVzc2FnZSA9IFdpbVNlcnZpY2UuZXNjYXBlSHRtbChtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvLyBMaW5rcyFcbiAgICAvLyBUT0RPOiBQcmV2ZW50IGVzY2FwaW5nIGxpbmsgY2hhcnMgbGlrZSAmLlxuICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoVVJMX1JFR0VYLCAoeCwgcHJlY2VlZGluZywgdXJsLCBmb2xsb3dpbmcpID0+IHtcbiAgICAgIC8vIElmIHRoZSBVUkwgZG9lc24ndCBoYXZlIGEgcHJvdG9jb2wsIHByZXBlbmQgdGhlIHJlbGF0aXZlIHByb3RvY29sLCAnLy8nLlxuICAgICAgY29uc3QgaHJlZiA9IHVybC5tYXRjaCgvXigoaHR0cHxodHRwc3xmdHApOlxcL1xcLykvaSkgPyB1cmwgOiAnLy8nICsgdXJsO1xuICAgICAgcmV0dXJuIGAke3ByZWNlZWRpbmd9PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7aHJlZn1cIj4ke3VybH08L2E+JHtmb2xsb3dpbmd9YDtcbiAgICB9KTtcblxuICAgIC8vIElubGluZSBkZWxpbWl0ZXJzIGxpa2UgKmJvbGQqIGFuZCBfaXRhbGljXy5cbiAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKFNUUk9OR19SRUdFWCwgJyQxPHN0cm9uZz4kMjwvc3Ryb25nPiQzJyk7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZShFTV9SRUdFWCwgJyQxPGVtPiQyPC9lbT4kMycpO1xuXG4gICAgLy8gQnJlYWtzXG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSgvXFxuL2csICc8YnI+Jyk7XG5cbiAgICBpZiAoIW9wdGlvbnMubm9TYW5pdGl6ZSkge1xuICAgICAgbWVzc2FnZSA9IHRoaXMuZG9tU2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5IVE1MLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG4gIH1cbn1cbiJdfQ==