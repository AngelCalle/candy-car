import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './candy-car/user/register/register.component';
import { LoginComponent } from './candy-car/user/login/login.component';
import { ProfileComponent } from './candy-car/user/profile/profile.component';

const routes: Routes = [
	// { path: '', component: HomeComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'profile', component: ProfileComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
