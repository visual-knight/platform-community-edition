import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'visual-knight-verification-box',
  templateUrl: './verification-box.component.html',
  styleUrls: ['./verification-box.component.scss']
})
export class VerificationBoxComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  resendVerification() {
    this.userService.resendVerificationEmail();
  }
}
