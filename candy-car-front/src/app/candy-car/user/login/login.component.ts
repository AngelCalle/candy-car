import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EqualPasswordValidator } from '../../core/validators/equalPasswordValidator';
import { PasswordStrengthValidator } from '../../core/validators/passwordStrengthValidator';
import { UserMailValidator } from '../../core/validators/userMailValidator';
import { IValidEqualPassword } from '../userModel';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form?: FormGroup;

	constructor(
		protected formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.initForm();
	}

	initForm(): void {
		this.form = new FormGroup(
			{
				mail: new FormControl('', Validators.compose([
					UserMailValidator.validUserMail,
					Validators.required,
					Validators.email,
					Validators.minLength(6),
					Validators.maxLength(100)])),
				password: new FormControl('', Validators.compose([
					PasswordStrengthValidator.validPasswordStrength,
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(20)
				])),
			}
		);
	}

	saveData(): void {
		if (this.form?.value) {
			console.log({
				values: this.form.value
			});
		}
	}

}