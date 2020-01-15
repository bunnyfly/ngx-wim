import { TestBed } from '@angular/core/testing';

import { WimService } from './wim.service';

let wimService: WimService;

describe('WimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    wimService = TestBed.get(WimService);
  });

  describe('toHtml', () => {
    it('should sanitize', () => {
      expect(wimService.toHtml('<div>foo</div>')).toEqual('&lt;div&gt;foo&lt;/div&gt;');
    });

    describe('links', () => {
      it('should work for simple URL', () => {
        expect(wimService.toHtml('https://foo.com')).toEqual(
          '<a target="_blank" href="https://foo.com">https://foo.com</a>'
        );
      });

      it('should work for multiple URLs', () => {
        expect(
          wimService.toHtml(
            'Check this out: http://twitter.com. Do you like https://reddit.com? Or google.com, maybe www.reddit.com!'
          )
        ).toEqual(
          'Check this out: <a target="_blank" href="http://twitter.com">http://twitter.com</a>. Do you like <a target="_blank" href="https://reddit.com">https://reddit.com</a>? Or <a target="_blank" href="//google.com">google.com</a>, maybe <a target="_blank" href="//www.reddit.com">www.reddit.com</a>!'
        );
      });

      it('should work for simple URLs', () => {
        expect(wimService.toHtml('http://www.foo.com/')).toEqual(
          '<a target="_blank" href="http://www.foo.com/">http://www.foo.com/</a>'
        );
        expect(wimService.toHtml('https://www.foo.com')).toEqual(
          '<a target="_blank" href="https://www.foo.com">https://www.foo.com</a>'
        );
        expect(wimService.toHtml('https://www.foo.com/bar/baz')).toEqual(
          '<a target="_blank" href="https://www.foo.com/bar/baz">https://www.foo.com/bar/baz</a>'
        );
        expect(wimService.toHtml('https://www.foo.com/bar?baz')).toEqual(
          '<a target="_blank" href="https://www.foo.com/bar?baz">https://www.foo.com/bar?baz</a>'
        );
        expect(wimService.toHtml('https://www.foo.com/bar?baz=5')).toEqual(
          '<a target="_blank" href="https://www.foo.com/bar?baz=5">https://www.foo.com/bar?baz=5</a>'
        );

        // TODO: Enable multiple query params (currently & is escaped).
        // expect(wimService.toHtml('https://www.foo.com/bar?baz=5&cat=rat')).toEqual(
        //   '<a target="_blank" href="https://www.foo.com/bar?baz=5&cat=rat">https://www.foo.com/bar?baz=5&cat=rat</a>'
        // );
      });

      it('should work with protocol', () => {
        expect(wimService.toHtml('http://foo.com')).toEqual(
          '<a target="_blank" href="http://foo.com">http://foo.com</a>'
        );
        expect(wimService.toHtml('https://foo.co.uk')).toEqual(
          '<a target="_blank" href="https://foo.co.uk">https://foo.co.uk</a>'
        );
        expect(wimService.toHtml('ftp://foo.photography')).toEqual(
          '<a target="_blank" href="ftp://foo.photography">ftp://foo.photography</a>'
        );
      });

      it('should work relatively without protocol', () => {
        expect(wimService.toHtml('foo.com')).toEqual(
          '<a target="_blank" href="//foo.com">foo.com</a>'
        );
        expect(wimService.toHtml('foo.co.uk')).toEqual(
          '<a target="_blank" href="//foo.co.uk">foo.co.uk</a>'
        );
        expect(wimService.toHtml('foo.photography')).toEqual(
          '<a target="_blank" href="//foo.photography">foo.photography</a>'
        );
        expect(wimService.toHtml('www.foo.com')).toEqual(
          '<a target="_blank" href="//www.foo.com">www.foo.com</a>'
        );
        expect(wimService.toHtml('www.foo.co.uk')).toEqual(
          '<a target="_blank" href="//www.foo.co.uk">www.foo.co.uk</a>'
        );
        expect(wimService.toHtml('www.foo.photography')).toEqual(
          '<a target="_blank" href="//www.foo.photography">www.foo.photography</a>'
        );
      });

      it('should work within text', () => {
        expect(wimService.toHtml('Bunny http://foo.com Cat')).toEqual(
          'Bunny <a target="_blank" href="http://foo.com">http://foo.com</a> Cat'
        );
        expect(wimService.toHtml('Bunny http://foo.com?bar=baz. Cat.')).toEqual(
          'Bunny <a target="_blank" href="http://foo.com?bar=baz">http://foo.com?bar=baz</a>. Cat.'
        );
        expect(wimService.toHtml('Bunny\nhttp://foo.com\nCat')).toEqual(
          'Bunny<br><a target="_blank" href="http://foo.com">http://foo.com</a><br>Cat'
        );
      });

      xit('should work within parenthesis', () => {
        expect(wimService.toHtml('Bunny (foo.com) Cat')).toEqual(
          'Bunny (<a target="_blank" href="//foo.com">foo.com</a>) Cat'
        );
      });

      it('should skip if not bounded properly', () => {
        expect(wimService.toHtml(')http://foo.com')).toEqual(')http://foo.com');
        expect(wimService.toHtml('http://foo.com(')).toEqual('http://foo.com(');
        expect(wimService.toHtml('foohttp://foo.com')).toEqual('foohttp://foo.com');
        expect(wimService.toHtml('.http://foo.com')).toEqual('.http://foo.com');
      });
    }); // describe('links', () => {

    describe('emphasis', () => {
      describe('regular', () => {
        it('should work', () => {
          expect(wimService.toHtml('_foo_')).toEqual('<em>foo</em>');
        });

        it('should work across multiple words', () => {
          expect(wimService.toHtml('_foo bar_')).toEqual('<em>foo bar</em>');
        });

        it('should work with allowed surrounds', () => {
          // Whitespacing
          expect(wimService.toHtml('_foo_')).toEqual('<em>foo</em>');
          expect(wimService.toHtml('   _foo_   ')).toEqual('   <em>foo</em>   ');
          expect(wimService.toHtml('\t_foo_\t')).toEqual('&#9;<em>foo</em>&#9;');
          expect(wimService.toHtml('\n_foo_\n')).toEqual('<br><em>foo</em><br>');
          // Parens
          expect(wimService.toHtml(' (_foo_) ')).toEqual(' (<em>foo</em>) ');
          // Straight quotes
          expect(wimService.toHtml(' "_foo_" ')).toEqual(' &#34;<em>foo</em>&#34; ');
          expect(wimService.toHtml(" '_foo_' ")).toEqual(" '<em>foo</em>' ");
          // Curly quotes
          expect(wimService.toHtml(' ‘_foo_’ ')).toEqual(' &#8216;<em>foo</em>&#8217; ');
          expect(wimService.toHtml(' “_foo_” ')).toEqual(' &#8220;<em>foo</em>&#8221; ');
          // Double-surrounds
          expect(wimService.toHtml(' ("_foo_") ')).toEqual(' (&#34;<em>foo</em>&#34;) ');
          expect(wimService.toHtml(' "(_foo_)" ')).toEqual(' &#34;(<em>foo</em>)&#34; ');
        });

        it('should skip non-allowed surrounds', () => {
          expect(wimService.toHtml('_ foo_')).toEqual('_ foo_');
          expect(wimService.toHtml('_foo _')).toEqual('_foo _');
          expect(wimService.toHtml('((((_foo_))))')).toEqual('((((_foo_))))');
          expect(wimService.toHtml(')_foo_)')).toEqual(')_foo_)');
          expect(wimService.toHtml('(_foo_(')).toEqual('(_foo_(');
          expect(wimService.toHtml('_foo_-bar')).toEqual('_foo_-bar');
          expect(wimService.toHtml('bar-_foo_')).toEqual('bar-_foo_');
        });

        it('should skip delimiters inside', () => {
          expect(wimService.toHtml('_foo bar baz_')).toEqual('<em>foo bar baz</em>');
          expect(wimService.toHtml('_foo _bar baz_')).toEqual('_foo <em>bar baz</em>');
          expect(wimService.toHtml('_foo bar_ baz_')).toEqual('<em>foo bar</em> baz_');
          expect(wimService.toHtml('_foo ba_r baz_')).toEqual('_foo ba_r baz_');
        });
      }); // describe('regular', () => {

      describe('strong', () => {
        it('should work', () => {
          expect(wimService.toHtml('*foo*')).toEqual('<strong>foo</strong>');
        });

        it('should work across multiple words', () => {
          expect(wimService.toHtml('*foo bar*')).toEqual('<strong>foo bar</strong>');
        });

        it('should work with allowed surrounds', () => {
          // Whitespacing
          expect(wimService.toHtml('*foo*')).toEqual('<strong>foo</strong>');
          expect(wimService.toHtml('   *foo*   ')).toEqual('   <strong>foo</strong>   ');
          expect(wimService.toHtml('\t*foo*\t')).toEqual('&#9;<strong>foo</strong>&#9;');
          expect(wimService.toHtml('\n*foo*\n')).toEqual('<br><strong>foo</strong><br>');
          // Parens
          expect(wimService.toHtml(' (*foo*) ')).toEqual(' (<strong>foo</strong>) ');
          // Straight quotes
          expect(wimService.toHtml(' "*foo*" ')).toEqual(' &#34;<strong>foo</strong>&#34; ');
          expect(wimService.toHtml(" '*foo*' ")).toEqual(" '<strong>foo</strong>' ");
          // Curly quotes
          expect(wimService.toHtml(' ‘*foo*’ ')).toEqual(' &#8216;<strong>foo</strong>&#8217; ');
          expect(wimService.toHtml(' “*foo*” ')).toEqual(' &#8220;<strong>foo</strong>&#8221; ');
          // Double-surrounds
          expect(wimService.toHtml(' ("*foo*") ')).toEqual(' (&#34;<strong>foo</strong>&#34;) ');
          expect(wimService.toHtml(' "(*foo*)" ')).toEqual(' &#34;(<strong>foo</strong>)&#34; ');
        });

        it('should skip non-allowed surrounds', () => {
          expect(wimService.toHtml('* foo*')).toEqual('* foo*');
          expect(wimService.toHtml('*foo *')).toEqual('*foo *');
          expect(wimService.toHtml('((((*foo*))))')).toEqual('((((*foo*))))');
          expect(wimService.toHtml(')*foo*)')).toEqual(')*foo*)');
          expect(wimService.toHtml('(*foo*(')).toEqual('(*foo*(');
          expect(wimService.toHtml('*foo*-bar')).toEqual('*foo*-bar');
          expect(wimService.toHtml('bar-*foo*')).toEqual('bar-*foo*');
        });

        it('should skip delimiters inside', () => {
          expect(wimService.toHtml('*foo bar baz*')).toEqual('<strong>foo bar baz</strong>');
          expect(wimService.toHtml('*foo *bar baz*')).toEqual('*foo <strong>bar baz</strong>');
          expect(wimService.toHtml('*foo bar* baz*')).toEqual('<strong>foo bar</strong> baz*');
          expect(wimService.toHtml('*foo ba*r baz*')).toEqual('*foo ba*r baz*');
        });
      }); // describe('strong', () => {

      describe('mixed', () => {
        it('should work together', () => {
          expect(wimService.toHtml('_*foo*_')).toEqual('<em><strong>foo</strong></em>');
          expect(wimService.toHtml('*_foo_*')).toEqual('<strong><em>foo</em></strong>');
          expect(wimService.toHtml('_*foo_*')).toEqual('<em><strong>foo</strong></em>');
          expect(wimService.toHtml('*_foo*_')).toEqual('<strong><em>foo</em></strong>');
        });

        it('should work when the other is invalid', () => {
          expect(wimService.toHtml('_*foo* _')).toEqual('_<strong>foo</strong> _');
          expect(wimService.toHtml('* _foo_*')).toEqual('* <em>foo</em>*');
          expect(wimService.toHtml('*foo_*')).toEqual('<strong>foo_</strong>');
          expect(wimService.toHtml('_*foo_')).toEqual('<em>*foo</em>');
        });

        it('should work nested', () => {
          expect(wimService.toHtml('_*foo* bar_')).toEqual('<em><strong>foo</strong> bar</em>');
          expect(wimService.toHtml('_foo *bar*_')).toEqual('<em>foo <strong>bar</strong></em>');
          expect(wimService.toHtml('_foo *bar* baz_')).toEqual(
            '<em>foo <strong>bar</strong> baz</em>'
          );
        });

        it('should work against punctuation', () => {
          expect(wimService.toHtml('_*foo*. bar!_')).toEqual('<em><strong>foo</strong>. bar!</em>');
          expect(wimService.toHtml('_foo. *bar!*_')).toEqual('<em>foo. <strong>bar!</strong></em>');
          expect(wimService.toHtml('_foo? *bar*! baz._')).toEqual(
            '<em>foo? <strong>bar</strong>! baz.</em>'
          );
        });

        it('should work across each other', () => {
          // NOTE: Sanitize adds the extra tags to prevent cross-over.
          expect(wimService.toHtml('*foo _bar* baz_')).toEqual(
            '<strong>foo <em>bar</em></strong><em> baz</em>'
          );
          expect(wimService.toHtml('_foo *bar_ baz*')).toEqual(
            '<em>foo <strong>bar</strong></em><strong> baz</strong>'
          );

          // The non-sanitized version:
          expect(wimService.toHtml('*foo _bar* baz_', { noSanitize: true })).toEqual(
            '<strong>foo <em>bar</strong> baz</em>'
          );
        });
      }); // describe('strong', () => {
    }); // describe('emphasis', () => {
  }); // describe('toHtml', () => {
});
