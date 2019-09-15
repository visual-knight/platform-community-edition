import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton, MatProgressBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth-service.service';
import { PasswordStrengthValidators } from '../../../shared/utils/passwordPatternValidator';
import { MatchValidators } from '../../../shared/utils/passwordMatchValidator';
import { first } from 'rxjs/operators';

@Component({
  selector: 'visual-knight-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatButton, { static: true }) submitButton: MatButton;
  @ViewChild(MatProgressBar, { static: true }) progressBar: MatProgressBar;

  progressBarMode: 'indeterminate';
  signupForm: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          PasswordStrengthValidators.validatePassword
        ]),
        passwordRepeat: new FormControl('', [Validators.required]),
        privacyPolicy: new FormControl('', (control: FormControl) => {
          const agreed = control.value;
          if (!agreed) {
            return { agreed: true };
          }
          return null;
        }),
        termsAndConditions: new FormControl('', (control: FormControl) => {
          const agreed = control.value;
          if (!agreed) {
            return { agreed: true };
          }
          return null;
        }),
        recaptcha: new FormControl(null, Validators.required)
      },
      MatchValidators.Password
    );
  }

  signup() {
    const signupData = this.signupForm.value;

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    this.authService
      .login(signupData)
      .pipe(first())
      .subscribe(
        () => {},
        error => {
          this.submitButton.disabled = false;
          this.progressBar.mode = 'determinate';
        }
      );
  }
}
