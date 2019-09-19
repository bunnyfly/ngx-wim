import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export type WimOptions = {
  noEscape?: boolean;
  noSanitize?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class WimService {
  constructor(private domSanitizer: DomSanitizer) {}

  private static escapeHtml(message: string): string {
    // Weird bug workaround. Angular complains `Expression form not supported` with some static
    // methods. Either storing the param as a const before using it or adding `// @dynamic` to the
    // class avoids it.
    const msg = message;
    return msg
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  toHtml(message: string, options: WimOptions = {}): string {
    if (!options.noEscape) {
      message = WimService.escapeHtml(message);
    }

    // Add links to URLs. There is no general regex that can capture URLs-in-text perfectly. This is
    // our good-enough approximation:
    //
    // ((https?:\/\/)|(www\.)) - Allow URLs beginning http://, https://, or www.
    // [^\s]+ - The core URL accepts most any char.
    // (?<![.,?!-]) - The last char cannot be a special symbol.
    const urlFinder = /(((https?:\/\/)|(www\.))[^\s]+(?<![.,?!-]))/g;
    // TODO: Add protocol when missing, or they'll be relative links.
    message = message.replace(urlFinder, url => {
      return '<a target="_blank" href="' + url + '">' + url + '</a>';
    });

    // *bold*
    message = message.replace(/(^|[^\*])\*(?!\*)((?:[^]*?[^\*])?)\*(?!\*)/g, '$1<b>$2</b>');

    // _italics_
    message = message.replace(/(^|[^\_])\_(?!\_)((?:[^]*?[^\_])?)\_(?!\_)/g, '$1<em>$2</em>');

    // Breaks
    message = message.replace(/\n/g, '<br>');

    if (!options.noSanitize) {
      message = this.domSanitizer.sanitize(SecurityContext.HTML, message);
    }
    return message;
  }
}
