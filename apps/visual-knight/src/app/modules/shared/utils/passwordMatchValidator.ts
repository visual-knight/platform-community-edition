import { AbstractControl } from '@angular/forms';

export class MatchValidators {
  static Password(control: AbstractControl) {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
    if (password.value !== passwordRepeat.value) {
      control.get('passwordRepeat').setErrors({ matchPassword: true });
    } else {
      if (passwordRepeat.hasError('matchPassword')) {
        const errors = passwordRepeat.errors;
        delete errors.matchPassword;
        if (Object.keys(errors).length > 0) {
          passwordRepeat.setErrors(errors);
        } else {
          passwordRepeat.setErrors(null);
        }
      }
      return null;
    }
  }
}
