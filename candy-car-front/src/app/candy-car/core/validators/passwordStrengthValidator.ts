import { AbstractControl } from '@angular/forms';
import { IValidPasswordStrength } from '../../user/userModel';

export class PasswordStrengthValidator {

	static validPasswordStrength(fc: AbstractControl): IValidPasswordStrength | null {
		const value: string = fc.value;

		if (!value) {
			return null;
		}

		const hasUpperCase: boolean = new RegExp(/[A-Z]+/).test(value);
		const hasLowerCase: boolean = new RegExp(/[a-z]+/).test(value);
		const hasNumeric: boolean = new RegExp(/[0-9]+/).test(value);
		const notSymbols: boolean = new RegExp(/[$%&? "'`]+/).test(value);

		const passwordValid: boolean = hasUpperCase && hasLowerCase && hasNumeric;

		if (!hasUpperCase) {
			return ({ noUpperCase: true });
		}
		if (!hasLowerCase) {
			return ({ noLowerCase: true });
		}
		if (!hasNumeric) {
			return ({ noNumeric: true });
		}
		if (notSymbols) {
			return ({ notSymbols: true });
		}

		return !passwordValid ? ({ validPasswordStrength: true }) : null;
	}

}
