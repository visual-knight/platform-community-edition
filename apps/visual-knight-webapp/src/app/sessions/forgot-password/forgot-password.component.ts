import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { AuthService } from '../../shared/auth/auth.service';
import { DefaultGraphQlError } from '../../shared/models/graphql-errors.model';
@Component({
  selector: 'vk-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail;
  authError: DefaultGraphQlError;

  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  submitEmail() {
    this.authService
      .forgotPassword(this.userEmail)
      .toPromise()
      .then(value => {
        this.authError = null;
        if (value) {
          this.snackBar.open(``, 'E-Mail sent', {
            duration: 10000
          });
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
