import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly demos = [
    {
      title: 'Formatting',
      message:
        'WIM can *bold* and _italicize_.' +
        '\n\n*This _works_ nested*, _both *ways* well_.' +
        '\n\nThis *also works _across* each other_.',
    },
    {
      title: 'Links',
      message: 'WIM will format links too: http://twitter.com, https://reddit.com, www.reddit.com!',
    },
  ];
}
