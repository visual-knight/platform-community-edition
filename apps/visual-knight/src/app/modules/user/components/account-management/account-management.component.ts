import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserType } from '../../../core/types';
import { PasswordStrengthValidators } from '../../../shared/utils/passwordPatternValidator';
import { MatchValidators } from '../../../shared/utils/passwordMatchValidator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'visual-knight-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;

  @Input() user$: Observable<UserType>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      forename: new FormControl(''),
      lastname: new FormControl('')
    });

    this.passwordForm = new FormGroup(
      {
        password: new FormControl('', [Validators.required, PasswordStrengthValidators.validatePassword]),
        passwordRepeat: new FormControl('', Validators.required)
      },
      MatchValidators.Password
    );

    this.user$.subscribe(user => {
      if (user) {
        this.profileForm.get('email').setValue(user.email);
        this.profileForm.get('forename').setValue(user.forename);
        this.profileForm.get('lastname').setValue(user.lastname);
      }
    });
  }

  onSubmitUpdateProfile() {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value);
    }
  }

  onSubmitNewPassword() {
    if (this.passwordForm.valid) {
      this.userService.setNewPassword(this.passwordForm.get('password').value);
      this.passwordForm.reset();
    }
  }
}
