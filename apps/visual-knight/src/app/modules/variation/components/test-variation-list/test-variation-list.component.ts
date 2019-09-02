import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteVariationModalComponent } from '../modals/delete-variation/delete-variation.component';
import { vkAnimations } from '../../../shared/animations';
import { ScreenshotViewComponent } from '../screenshot-view/screenshot-view.component';
import { VariationType } from '../../../core/types';

@Component({
  selector: 'visual-knight-test-variation-list',
  templateUrl: './test-variation-list.component.html',
  styleUrls: ['./test-variation-list.component.scss'],
  animations: [vkAnimations]
})
export class VariationListComponent implements OnInit {
  variationList$: Observable<VariationType[]>; // TODO: get variation list
  public testId: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe((params: VariationListParameter) => {
      // TODO: Load the variation list
      this.testId = params.testId;
    });
  }

  openImage(image: string) {
    this.dialog.open(ScreenshotViewComponent, {
      data: { image },
      height: '95%'
    });
  }

  deleteVariation(variation: VariationType, click: Event) {
    click.stopPropagation();
    this.dialog
      .open(DeleteVariationModalComponent, {
        data: { name: `${variation.deviceName} / ${variation.browserName}` }
      })
      .beforeClosed()
      .subscribe((deleteVariation: boolean) => {
        if (deleteVariation) {
          // TODO: trigger delete variation
        }
      });
  }
}

interface VariationListParameter extends Params {
  testId: string;
}
