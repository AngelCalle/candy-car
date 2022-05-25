import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map, switchMap, timer, of } from 'rxjs';
import { UserService } from '../../api/service/user.service';
@Injectable({
	providedIn: 'root'
})
export class UserMailValidator {
	//https://es.stackoverflow.com/questions/474199/problema-con-la-validaci%C3%B3n-as%C3%ADncrona-de-email-formulario-reactivo-angular
	static validUserMail(us: UserService) {
		return (control: AbstractControl) => {
			if (control.pristine) {
				return of(null);
			}

			return timer(500).pipe(
				switchMap(() => {
					return us.getExistEmail(control.value)
				}), map(resp => resp ? null : { validUserMail: true })
			)
		}

	}
}
