import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth-service.service';
import { PasswordStrengthValidators } from '../../../shared/utils/passwordPatternValidator';
import { MatchValidators } from '../../../shared/utils/passwordMatchValidator';

@Component({
  selector: 'visual-knight-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  @ViewChild(MatProgressBar, { static: true }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: true }) submitButton: MatButton;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          PasswordStrengthValidators.validatePassword
        ]),
        passwordRepeat: new FormControl('', [Validators.required])
      },
      MatchValidators.Password
    );

    this.route.queryParams.subscribe(values => {
      this.token = values['token'];
    });
  }

  submit() {
    this.authService
      .resetPassword(this.resetPasswordForm.get('password').value, this.token)
      .toPromise()
      .then(value => {
        if (value) {
          this.snackBar.open(``, 'Password set! Please login now!', {
            duration: 10000
          });
          this.router.navigate(['users', 'signup']);
        }
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate';
      })
      .catch(error => {
        // TODO: error handling
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate';
      });

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}
