import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'visual-knight-browser-icon',
  templateUrl: './browser-icon.component.html',
  styleUrls: ['./browser-icon.component.scss']
})
export class BrowserIconComponent implements OnInit {
  @Input() browser: string;
  @Input() size = 32;
  @ViewChild('imageRef', { static: true }) imageRef: ElementRef;
  public imageMapping = true;
  public browserImagePath = '://';

  constructor() {}

  ngOnInit() {
    this.browserImagePath = BROWSER_ICON_IMAGES[this.browser.toUpperCase()];
    if (!this.browserImagePath) {
      this.imageMapping = false;
    }
  }
}

enum BROWSER_ICON_IMAGES {
  CHROME = '../../../../../../assets/browser-logos/chrome_64x64.png',
  FIREFOX = '../../../../../../assets/browser-logos/firefox_32x32.png',
  EDGE = '../../../../../../assets/browser-logos/edge_64x64.png',
  OPERA = '../../../../../../assets/browser-logos/opera_64x64.png',
  PUPPETEER = '../../../../../../assets/browser-logos/puppeteer.png'
}
