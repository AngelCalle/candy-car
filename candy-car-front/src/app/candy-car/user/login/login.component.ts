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
	mailValid?: string;

	constructor(
		protected formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.initForm();
	}

	initForm(): void {
		this.mailValid = `^[a-zA-Z0-9.!#$%++/=?^_{|}-~]+@[a-zA-Z0-9.-]+(?:\\.[[a-zA-Z0-9]{2,4}$)`;
		this.form = new FormGroup(
			{
				mail: new FormControl('', Validators.compose([
					Validators.required,
					Validators.minLength(6),
					Validators.maxLength(30),
					Validators.pattern(this.mailValid)])),
				password: new FormControl('', Validators.compose([
					PasswordStrengthValidator.validPasswordStrength,
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(20)
				])),
			}
		);
	}

	save(): void {
		if (this.form?.value) {
			console.log({
				values: this.form.value
			});
		}
	}

}
