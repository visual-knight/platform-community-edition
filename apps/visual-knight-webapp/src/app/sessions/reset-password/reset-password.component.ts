import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { AuthService } from '../../shared/auth/auth.service';
import { DefaultGraphQlError } from '../../shared/models/graphql-errors.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchValidators } from 'src/app/shared/helpers/passwordMatchValidator';
import { PasswordStrengthValidators } from 'src/app/shared/helpers/passwordPatternValidator';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'vk-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  authError: DefaultGraphQlError;
  token: string;

  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl('', [Validators.required, PasswordStrengthValidators.validatePassword]),
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
      .resetPassword(this.resetPasswordForm.value.password, this.token)
      .toPromise()
      .then(value => {
        this.authError = null;
        if (value) {
          this.snackBar.open(``, 'Password set! Please login now!', {
            duration: 10000
          });
          this.router.navigate(['sessions', 'signin']);
        }
      })
      .catch(error => {
        this.authError = error.graphQLErrors;
      })
      .finally(() => {
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate';
      });

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}
