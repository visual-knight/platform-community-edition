import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'visual-knight-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(MatProgressBar, { static: true }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: true }) submitButton: MatButton;

  signinForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    if (this.route.snapshot.queryParams.expiredToken) {
      this.snackBar.open(`Your session is expired`, 'Please Login again!', {
        duration: 5000
      });
    }
  }

  signin() {
    const signinData = this.signinForm.value;

    // this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';

    this.authService
      .login(signinData)
      .pipe(first())
      .subscribe(
        () => {
          const referUrl =
            this.route.snapshot.queryParams['referUrl'] || '/projects';
          this.router.navigateByUrl(referUrl);
        },
        error => {
          console.log('Do something', error);
        }
      );
  }
}
