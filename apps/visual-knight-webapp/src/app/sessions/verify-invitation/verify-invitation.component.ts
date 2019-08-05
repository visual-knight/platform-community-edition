import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { INVITATION_STATE } from '../../shared/auth/auth.service';
import { Store, Select } from '@ngxs/store';
import { PasswordStrengthValidators } from '../../shared/helpers/passwordPatternValidator';
import { MatchValidators } from '../../shared/helpers/passwordMatchValidator';
import { AuthState } from '../../shared/auth/state/auth.state';
import { UserCompleteInvitationAction } from '../../shared/auth/state/auth.actions';

@Component({
  selector: 'vk-verify-invitation',
  templateUrl: './verify-invitation.component.html',
  styleUrls: ['./verify-invitation.component.scss']
})
export class VerifyInvitationComponent implements OnInit {
  token: string;
  INVITATION_STATE = INVITATION_STATE;
  invitationPasswordForm: FormGroup;
  @Select(AuthState.invitationState) state$: Observable<INVITATION_STATE>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.invitationPasswordForm = new FormGroup(
      {
        password: new FormControl('', [Validators.required, PasswordStrengthValidators.validatePassword]),
        passwordRepeat: new FormControl('', Validators.required),
        agb: new FormControl(false, Validators.required)
      },
      MatchValidators.Password
    );

    this.route.queryParams.subscribe(values => {
      this.token = values['token'];
    });
  }

  onSubmit() {
    if (this.invitationPasswordForm.valid) {
      this.store.dispatch(
        new UserCompleteInvitationAction({
          token: this.token,
          password: this.invitationPasswordForm.value['password']
        })
      );
    }
  }
}
