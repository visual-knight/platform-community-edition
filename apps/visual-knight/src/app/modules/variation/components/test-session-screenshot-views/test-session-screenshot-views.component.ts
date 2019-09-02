import {
  Component,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
// TODO: replace moment with fancy lib -> date-fns
import * as moment from 'moment';
import {
  TestSession,
  Test,
  Variation,
  TestSessionState
} from '@generated/photonjs';

@Component({
  selector: 'visual-knight-test-session-screenshot-views',
  templateUrl: './test-session-screenshot-views.component.html',
  styleUrls: ['./test-session-screenshot-views.component.scss']
})
export class TestSessionScreenshotViewsComponent implements OnInit, OnChanges {
  @Input() testSession: TestSession;
  @Input() test: Test;
  @Input() variation: Variation;
  @Output() accept: EventEmitter<boolean> = new EventEmitter();

  public isDiffView = false;
  public datetimeString: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.testSession) {
      const testSession: TestSession = changes.testSession.currentValue;
      this.isDiffView =
        testSession.diffImageKey !== null &&
        testSession.misMatchPercentage > testSession.misMatchTolerance;
      if (moment().diff(testSession.createdAt, 'hours') <= 35) {
        this.datetimeString = moment(testSession.createdAt).fromNow();
      } else {
        this.datetimeString = null;
      }
    }
  }

  isUnresolved() {
    return this.testSession.state === TestSessionState.UNRESOLVED;
  }

  onSliderChanged(value: MatSlideToggleChange) {
    this.isDiffView = value.checked;
  }

  onClickAcceptButton() {
    this.accept.emit(true);
  }

  onClickDeclineButton() {
    this.accept.emit(false);
  }
}
