import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html'
})
export class NavbarComponent implements AfterContentChecked {

	is_user?: boolean;

	constructor(
		protected router: Router
	) { }

	ngAfterContentChecked(): void {
		if (localStorage.getItem('user')) {
			this.is_user = true;
		} else {
			this.is_user = false;
		}
	}

	closeSesion() {
		localStorage.removeItem('user');
		this.router.navigate(['register']);
	}

}
