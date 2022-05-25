
import { AbstractControl } from '@angular/forms';
import { IValidEqualPassword } from '../../user/userModel';

export class EqualPasswordValidator {

	static validEqualPassword(formGroup: AbstractControl): IValidEqualPassword | null {
		if (formGroup.value?.password === formGroup.value?.passwordConfirm) {
			return null;
		} else {
			return ({ validEqualPassword: true });
		}
	}

}
