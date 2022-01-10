(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ngx-wim', ['exports', '@angular/core', '@angular/platform-browser'], factory) :
    (global = global || self, factory(global['ngx-wim'] = {}, global.ng.core, global.ng.platformBrowser));
}(this, function (exports, core, platformBrowser) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Delimiters must be have whitespace or line-boundary around them.
    /** @type {?} */
    var WHITESPACE_OR_LINE_BREAK = /(?:^|\s|$)/;
    // Common surrounding characters can sit between the whitespace/line-boundary and the delimiter,
    // like quotes, parens, etc.
    // NOTE: Since HTML escaping may have been performed, need to match both literal and escaped chars.
    // TODO: _*nested*_ delimiter support is hacky. Bolster logic for it.
    /** @type {?} */
    var ALLOWED_LEFT_SURROUND = /(?:\(|'|&#039;|"|&quot;|&#34;|‘|&#8216;|“|&#8220;|_|<em>|\*|<strong>){0,3}/;
    /** @type {?} */
    var ALLOWED_RIGHT_SURROUND = /(?:\)|'|&#039;|"|&quot;|&#34;|’|&#8217;|”|&#8221;|_|<\/em>|\*|<\/strong>|[,.?!:]){0,3}/;
    // Returns a regex matching the delimiters and the text they wrap. The wrapped text may not include
    // the delimiter.
    /** @type {?} */
    var WRAPPED_INLINE_MATCH = (/**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        // Open delimiter
        return "\\" + d +
            // Capture the text between delimiters.
            "(" +
            (
            // Text between starts with non-whitespace.
            "[^\\s" + d + "]") +
            (
            // Text between must not contain line-breaks or large-whitespace.
            "(?:[^\\r\\n\\t\\f\\v" + d + "]*") +
            (
            // Text between ends with non-whitespace.
            "[^\\s" + d + "])?") +
            ")" +
            (
            // Close delimiter
            "\\" + d);
    });
    var ɵ0 = WRAPPED_INLINE_MATCH;
    // A full regex to match a delimiter. Capture groups:
    // 0: Text before opening delimiter.
    // 1: Text between delimiters.
    // 2: Text after closing delimiter.
    /** @type {?} */
    var INLINE_DELIMITER_REGEX = (/**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        return new RegExp('(' +
            WHITESPACE_OR_LINE_BREAK.source +
            ALLOWED_LEFT_SURROUND.source +
            ')' +
            WRAPPED_INLINE_MATCH(d) +
            '(' +
            ALLOWED_RIGHT_SURROUND.source +
            WHITESPACE_OR_LINE_BREAK.source +
            ')', 'gm');
    });
    var ɵ1 = INLINE_DELIMITER_REGEX;
    /** @type {?} */
    var STRONG_REGEX = INLINE_DELIMITER_REGEX('*');
    /** @type {?} */
    var EM_REGEX = INLINE_DELIMITER_REGEX('_');
    // There is no general regex that can capture URLs-in-text perfectly. This is our good-enough
    // approximation.
    // TODO: Allow URL preceeded/followed by parenthesis, quotes, etc.
    // TODO: Allow IDN/Unicode domains.
    /** @type {?} */
    var URL_REGEX_PATH_FINAL_CHARS = 'a-z0-9\\/\\-+&@#%=~_|$';
    /** @type {?} */
    var URL_REGEX_FOLLOWING_CHARS = '?!:,.';
    /** @type {?} */
    var URL_REGEX_PATH_CHARS = URL_REGEX_PATH_FINAL_CHARS + URL_REGEX_FOLLOWING_CHARS;
    /** @type {?} */
    var URL_REGEX = new RegExp(
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
        (
        // Optional path. The final character's set is limited to prevent some ending punctuation.
        // E.g., the final period of "foo.com/bar.baz." shouldn't be included in the URL.
        "(?:[" + URL_REGEX_PATH_CHARS + "]*[" + URL_REGEX_PATH_FINAL_CHARS + "])?") +
        // End of URL capture group.
        ')' +
        (
        // Capture group $3: URL is followed by line-boundary, whitespace, or "following char."
        "($|\\s|[" + URL_REGEX_FOLLOWING_CHARS + "])"), 'gi');
    var WimService = /** @class */ (function () {
        function WimService(domSanitizer) {
            this.domSanitizer = domSanitizer;
        }
        /**
         * @private
         * @param {?} message
         * @return {?}
         */
        WimService.escapeHtml = /**
         * @private
         * @param {?} message
         * @return {?}
         */
        function (message) {
            // NOTE: Weird bug workaround. Angular complains `Expression form not supported` with some
            // static methods. Either storing the param as a const before using it or adding `// @dynamic`
            // to the class avoids it.
            /** @type {?} */
            var msg = message;
            return msg
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };
        /**
         * @param {?} message
         * @param {?=} options
         * @return {?}
         */
        WimService.prototype.toHtml = /**
         * @param {?} message
         * @param {?=} options
         * @return {?}
         */
        function (message, options) {
            if (options === void 0) { options = {}; }
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
            function (x, preceeding, url, following) {
                // If the URL doesn't have a protocol, prepend the relative protocol, '//'.
                /** @type {?} */
                var href = url.match(/^((http|https|ftp):\/\/)/i) ? url : '//' + url;
                return preceeding + "<a target=\"_blank\" href=\"" + href + "\">" + url + "</a>" + following;
            }));
            // Inline delimiters like *bold* and _italic_.
            message = message.replace(STRONG_REGEX, '$1<strong>$2</strong>$3');
            message = message.replace(EM_REGEX, '$1<em>$2</em>$3');
            // Breaks
            message = message.replace(/\n/g, '<br>');
            if (!options.noSanitize) {
                message = this.domSanitizer.sanitize(core.SecurityContext.HTML, message);
            }
            return message;
        };
        WimService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root',
                    },] }
        ];
        /** @nocollapse */
        WimService.ctorParameters = function () { return [
            { type: platformBrowser.DomSanitizer }
        ]; };
        /** @nocollapse */ WimService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function WimService_Factory() { return new WimService(core.ɵɵinject(platformBrowser.DomSanitizer)); }, token: WimService, providedIn: "root" });
        return WimService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        WimService.prototype.domSanitizer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: core.Directive, args: [{
                        selector: '[wim]',
                    },] }
        ];
        /** @nocollapse */
        WimDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: WimService }
        ]; };
        WimDirective.propDecorators = {
            wim: [{ type: core.Input, args: ['wim',] }]
        };
        return WimDirective;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var WimModule = /** @class */ (function () {
        function WimModule() {
        }
        WimModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [WimDirective],
                        imports: [],
                        exports: [WimDirective],
                        providers: [WimService],
                    },] }
        ];
        return WimModule;
    }());

    exports.WimDirective = WimDirective;
    exports.WimModule = WimModule;
    exports.WimService = WimService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-wim.umd.js.map
