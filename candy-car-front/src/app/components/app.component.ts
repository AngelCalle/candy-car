import { Component, OnInit } from '@angular/core';
import { UserService } from '../candy-car/api/service/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	user!: any;

	constructor(
		private readonly userService: UserService
	) { }

	ngOnInit(): void {
		this.getUser();
	}
	getUser(): void {
		this.userService.getUser()
			.subscribe((data: any): any => {
				if (data) {
					this.user = data;
					console.log('📢 [app.component.ts:23]', data);
				}
			});
	}
}
