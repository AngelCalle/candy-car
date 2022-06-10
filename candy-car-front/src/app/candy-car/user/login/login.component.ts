import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../api/service/user.service';
import { PasswordStrengthValidator } from '../../core/validators/passwordStrengthValidator';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	form?: FormGroup;
	mailValid?: string;

	constructor(
		protected router: Router,
		protected formBuilder: FormBuilder,
		protected readonly userService: UserService,

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
			this.getLogin(this.form.value.mail.toLowerCase(), this.form.value.password);
		}
	}

	getLogin(mail: string, password: string): void {
		this.userService.getLogin(mail, password)
			.subscribe((data: any): any => {
				if (data) {
					localStorage.setItem('user', JSON.stringify(data));
					this.router.navigate(['profile']);
				} else {
					alert('El inicio de sesion a fallado');
				}
			});
	}

}
