import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ACTIVATION_STATE } from '../../shared/auth/auth.service';

@Component({
  selector: 'vk-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  state: ACTIVATION_STATE;
  ACTIVATION_ERRORS = ACTIVATION_STATE;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe((data: { error: ACTIVATION_STATE }) => {
      this.state = data.error;
    });
  }
}
