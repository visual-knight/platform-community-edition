import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { INVITATION_STATE } from '../../../core/auth-service.service';
import { PasswordStrengthValidators } from '../../../shared/utils/passwordPatternValidator';
import { MatchValidators } from '../../../shared/utils/passwordMatchValidator';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'visual-knight-verify-invitation',
  templateUrl: './verify-invitation.component.html',
  styleUrls: ['./verify-invitation.component.scss']
})
export class VerifyInvitationComponent implements OnInit {
  token: string;
  INVITATION_STATE = INVITATION_STATE;
  invitationPasswordForm: FormGroup;
  state: INVITATION_STATE = null;

  constructor(private route: ActivatedRoute, private authUserService: AuthUserService, private router: Router) {}

  ngOnInit() {
    this.invitationPasswordForm = new FormGroup(
      {
        password: new FormControl('', [Validators.required, PasswordStrengthValidators.validatePassword]),
        passwordRepeat: new FormControl('', Validators.required)
      },
      MatchValidators.Password
    );

    this.route.queryParams.subscribe(values => {
      this.token = values['token'];
    });
  }

  onSubmit() {
    if (this.invitationPasswordForm.valid) {
      this.authUserService.completeInvitation(this.token, this.invitationPasswordForm.value['password']).subscribe(
        () => {
          this.router.navigateByUrl('/project');
        },
        error => {
          this.state = error.graphQLErrors[0].message;
        }
      );
    }
  }
}
