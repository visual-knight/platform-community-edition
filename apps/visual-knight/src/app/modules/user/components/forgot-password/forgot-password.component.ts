import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { AuthService } from '../../../core/auth-service.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'visual-knight-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild(MatProgressBar, { static: true }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: true }) submitButton: MatButton;

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  submitEmail() {
    this.authService
      .forgotPassword(this.forgotPasswordForm.get('email').value)
      .toPromise()
      .then(value => {
        if (value) {
          this.snackBar.open(``, 'E-Mail sent', {
            duration: 10000
          });
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
