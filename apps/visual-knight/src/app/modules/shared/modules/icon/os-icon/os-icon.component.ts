import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'visual-knight-os-icon',
  templateUrl: './os-icon.component.html',
  styleUrls: ['./os-icon.component.scss']
})
export class OsIconComponent implements OnInit {
  @Input() os: string;
  @Input() size = 32;
  public imageMapping = true;
  public imageClass: string;

  constructor() {}

  ngOnInit() {
    this.imageClass = OS_ICON_IMAGES[`${this.os.toUpperCase()}`];
    if (!this.imageClass) {
      this.imageMapping = false;
    }
  }
}

enum OS_ICON_IMAGES {
  APPLE = 'fo-apple',
  WINDOWS = 'fo-win10',
  UBUNTU = 'fo-ubuntu',
  CENTOS = 'fo-centos',
  DEBIAN = 'fo-debian'
}
