import { Component, Input } from '@angular/core';

@Component({
  selector: 'visual-knight-diff-view',
  templateUrl: './diff-view.component.html',
  styleUrls: ['./diff-view.component.scss']
})
export class DiffViewComponent {
  @Input() image: string;

  constructor() {}
}
