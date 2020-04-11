import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteVariationModalComponent } from '../modals/delete-variation/delete-variation.component';
import { vkAnimations } from '../../../shared/animations';
import { ScreenshotViewComponent } from '../screenshot-view/screenshot-view.component';
import { VariationType, VariationDataFragment } from '../../../core/types';
import { VariationService } from '../../services/variation.service';
import { first, map, filter } from 'rxjs/operators';

@Component({
  selector: 'visual-knight-test-variation-list',
  templateUrl: './test-variation-list.component.html',
  styleUrls: ['./test-variation-list.component.scss'],
  animations: [vkAnimations]
})
export class VariationListComponent implements OnInit {
  variationList$: Observable<VariationDataFragment[]>;
  variationListLoading$: Observable<boolean>;
  public testId: string;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private variationService: VariationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: VariationListParameter) => {
      this.testId = params.testId;

      const response$ = this.variationService.variationList(params.testId);
      this.variationList$ = response$.pipe(
        map(({ data }) => data && data.variations)
      );
      this.variationListLoading$ = response$.pipe(
        map(({ loading }) => loading)
      );
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
          this.variationService
            .delete(this.testId, variation.id)
            .pipe(first())
            .subscribe();
        }
      });
  }
}

interface VariationListParameter extends Params {
  testId: string;
}
