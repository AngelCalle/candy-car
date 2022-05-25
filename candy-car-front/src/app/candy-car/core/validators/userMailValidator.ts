import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { UserService } from '../../api/service/user.service';
import { IValidUserMail } from '../../user/userModel';
@Injectable({
    providedIn: 'root'
})
export class UserMailValidator {
	constructor(
		private readonly userService: UserService
	) { }

	getExistMail(mail:string): boolean {
		let response: boolean = false;
		this.userService.getExistEmail(mail)
			.subscribe((data: boolean): void => {
				response = data;
			});
			return response ? true:false;
	}
	//Check static
	static validUserMail(fc: AbstractControl) {
        if (fc.value.toLowerCase()) {
            if (this.getExistEmail(fc.value.toLowerCase())) {
                return ({ validUserMail: true });
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
