import { DomSanitizer } from '@angular/platform-browser';
export declare type WimOptions = {
    noEscape?: boolean;
    noSanitize?: boolean;
};
export declare class WimService {
    private domSanitizer;
    constructor(domSanitizer: DomSanitizer);
    private static escapeHtml;
    toHtml(message: string, options?: WimOptions): string;
}
