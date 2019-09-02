import { FormControl } from '@angular/forms';

export class PasswordStrengthValidators {
  static validatePassword(control: FormControl) {
    const PASSWORD_REGEXP = /(?=^.{8,}$)((?=.*\d)|(?=.*\W +))(?![.\n])(?=.*[A - Z])(?=.*[a - z]).*$/i;

    return PASSWORD_REGEXP.test(control.value)
      ? null
      : {
          validatePassword: true
        };
  }
}
