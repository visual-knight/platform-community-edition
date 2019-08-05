import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from '../../shared/auth/state/auth.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vk-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor(private store: Store, private snackBar: MatSnackBar, private route: ActivatedRoute) {}

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
    this.store.dispatch(new Login(signinData));

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}
