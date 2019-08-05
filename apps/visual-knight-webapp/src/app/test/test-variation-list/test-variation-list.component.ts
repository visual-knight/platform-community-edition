import { ScreenshotViewComponent } from '../screenshot-view/screenshot-view.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Variation } from '../../shared/models/variation.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteVariationComponent } from '../modals/delete-variation/delete-variation.component';
import { Store, Select } from '@ngxs/store';
import { VariationListLoadAction, DeleteVariationAction } from '../state/test.actions';
import { TestState } from '../state/test.state';
import { vkAnimations } from '../../shared/animations/animations';

@Component({
  selector: 'vk-test-variation-list',
  templateUrl: './test-variation-list.component.html',
  styleUrls: ['./test-variation-list.component.scss'],
  animations: [vkAnimations]
})
export class TestVariationListComponent implements OnInit {
  @Select(TestState.selectedVarationList)
  variationList$: Observable<Variation[]>;
  public testId: string;

  constructor(private route: ActivatedRoute, private store: Store, public dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe((params: VariationListParameter) => {
      this.store.dispatch(new VariationListLoadAction(params.testId));
      this.testId = params.testId;
    });
  }

  openImage(image: string) {
    this.dialog.open(ScreenshotViewComponent, {
      data: { image },
      height: '95%'
    });
  }

  deleteVariation(variation: Variation, click: Event) {
    click.stopPropagation();
    this.dialog
      .open(DeleteVariationComponent, {
        data: { name: `${variation.deviceName} / ${variation.browserName}` }
      })
      .beforeClose()
      .subscribe(result => {
        if (result) {
          this.store.dispatch(new DeleteVariationAction(variation));
        }
      });
  }
}

interface VariationListParameter extends Params {
  testId: string;
}
