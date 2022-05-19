import { AbstractControl } from '@angular/forms';
import { IValidUserMail } from '../../user/userModel';

export class UserMailValidator {

	static validUserMail(fc: AbstractControl): IValidUserMail | null {
		if (fc.value.toLowerCase() === "a@a.es".toLowerCase()) {
			return ({ validUserMail: true });
		} else {
			return null;
		}
	}

}
