import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../api/service/user.service';
import { EqualPasswordValidator } from '../../core/validators/equalPasswordValidator';
import { PasswordStrengthValidator } from '../../core/validators/passwordStrengthValidator';
import { UserMailValidator } from '../../core/validators/userMailValidator';
import { IValidEqualPassword } from '../userModel';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

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
					Validators.minLength(3),
					Validators.maxLength(33),
					Validators.pattern(this.lettersAndAccents)
				])),
				nameUser: new FormControl('', Validators.compose([
					Validators.minLength(3),
					Validators.maxLength(33),
					Validators.pattern(this.unaccentedLettersAndNumbers)
				])),
				mail: new FormControl('', Validators.compose([
					Validators.minLength(6),
					Validators.maxLength(30),
					Validators.pattern(this.mailValid)]),
					UserMailValidator.validUserMail(this.userService)
				),
				password: new FormControl('', Validators.compose([
					PasswordStrengthValidator.validPasswordStrength,
					Validators.minLength(8),
					Validators.maxLength(20)
				])),
				passwordConfirm: new FormControl('', Validators.compose([
					PasswordStrengthValidator.validPasswordStrength,
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
			const userStorage = localStorage.getItem('user');
			if (userStorage) {
				const userFormat = JSON.parse(userStorage);
				console.log('📢 [profile.userFormat.ts:76]', userFormat);
				const USER = {
					id: userFormat.id,
					name: this.form.value.name ? this.form.value.name : userFormat.name,
					userName: this.form.value.nameUser ? this.form.value.nameUser : userFormat.userName,
					mail: this.form.value.mail ? this.form.value.mail : userFormat.mail,
					password: this.form.value.password ? this.form.value.password : userFormat.password,
				};

				console.log('📢 [profile.component.ts:76]', USER);
				this.putEditUser(USER);
			}

		}
	}

	putEditUser(user: any): void {
		this.userService.putEditUser(user)
			.subscribe((data: any): any => {
				if (data) {
					localStorage.setItem('user', JSON.stringify(data));
					this.router.navigate(['profile']);
				}
			});
	}

}
