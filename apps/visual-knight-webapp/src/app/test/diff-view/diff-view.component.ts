import { Component, Input } from '@angular/core';
import 'tracking';

@Component({
  selector: 'vk-diff-view',
  templateUrl: './diff-view.component.html',
  styleUrls: ['./diff-view.component.scss']
})
export class DiffViewComponent {
  @Input('image') image: string;

  constructor() {}
}
