import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
const CHROME_ICON = require('../../../../../../assets/browser-logos/chrome_64x64.png');
const FIREFOX_ICON = require('../../../../../../assets/browser-logos/firefox_32x32.png');
const EDGE_ICON = require('../../../../../../assets/browser-logos/edge_64x64.png');
const OPERA_ICON = require('../../../../../../assets/browser-logos/opera_64x64.png');
const PUPPETEER_ICON = require('../../../../../../assets/browser-logos/puppeteer.png');

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
  CHROME = CHROME_ICON,
  FIREFOX = FIREFOX_ICON,
  EDGE = EDGE_ICON,
  OPERA = OPERA_ICON,
  PUPPETEER = PUPPETEER_ICON
}
