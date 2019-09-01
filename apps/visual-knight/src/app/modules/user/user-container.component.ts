import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../core/auth-service.service';

@Component({
  selector: 'visual-knight-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {
  public errorMessages$ = this.authService.authErrorMessages$;
  public user$ = this.authService.user$;
  public isLoading$ = this.authService.isLoading$;
  public loginForm: FormGroup;
  public hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }
  private createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  public signUp() {
    this.checkFormValidity(() => {
      this.authService.signUp(this.loginForm.value);
    });
  }
  public login() {
    this.checkFormValidity(() => {
      this.authService.login(this.loginForm.value);
    });
  }
  private checkFormValidity(cb) {
    if (this.loginForm.valid) {
      cb();
    } else {
      this.errorMessages$.next('Please enter correct Email and Password value');
    }
  }
  public logOut() {
    this.authService.logOut();
  }
  public getErrorMessage(controlName: string, errorName: string): string {
    const control = this.loginForm.get(controlName);
    return control.hasError('required')
      ? 'You must enter a value'
      : control.hasError(errorName)
      ? `Not a valid ${errorName}`
      : '';
  }
}
