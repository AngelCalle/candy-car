import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../api/service/user.service';
import { EqualPasswordValidator } from '../../core/validators/equalPasswordValidator';
import { PasswordStrengthValidator } from '../../core/validators/passwordStrengthValidator';
import { UserMailValidator } from '../../core/validators/userMailValidator';
import { IValidEqualPassword } from '../userModel';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

	form?: FormGroup;
	lettersAndAccents?: string;
	unaccentedLettersAndNumbers?: string;
	mailValid?: string;

	constructor(
		protected router: Router,
		protected userService: UserService,
		protected formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.initForm();
	}

	initForm(): void {
		this.lettersAndAccents = `^([a-z A-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1])+$`;
		this.unaccentedLettersAndNumbers = '[A-Za-z0-9]+';
		this.mailValid = `^[a-zA-Z0-9.!#$%++/=?^_{|}-~]+@[a-zA-Z0-9.-]+(?:\.[[a-zA-Z0-9]{2,4}$)`;
		this.form = new FormGroup(
			{
				name: new FormControl('', Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(33),
					Validators.pattern(this.lettersAndAccents)
				])),
				nameUser: new FormControl('', Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(33),
					Validators.pattern(this.unaccentedLettersAndNumbers)
				])),
				mail: new FormControl('', Validators.compose([
					Validators.required,
					Validators.minLength(6),
					Validators.maxLength(30),
					Validators.pattern(this.mailValid)]),
					UserMailValidator.validUserMail(this.userService)
				),
				password: new FormControl('', Validators.compose([
					PasswordStrengthValidator.validPasswordStrength,
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(20)
				])),
				passwordConfirm: new FormControl('', Validators.compose([
					PasswordStrengthValidator.validPasswordStrength,
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(20)
				]))
			}, (formGroup: AbstractControl): IValidEqualPassword | null => {
				return EqualPasswordValidator.validEqualPassword(formGroup);
			}
		);
	}

	save(): void {
		if (this.form?.value) {
			console.log(this.form.value);
			const USER = {
				name: this.form.value.name,
				userName: this.form.value.nameUser,
				mail: this.form.value.mail,
				password: this.form.value.password
			};
			this.postRegister(USER);
		}
	}

	postRegister(user: any): void {
		this.userService.postRegister(user)
			.subscribe((data: any): any => {
				if (data) {
					localStorage.setItem('user', JSON.stringify(data));
					this.router.navigate(['profile']);
				}
			});
	}

}
