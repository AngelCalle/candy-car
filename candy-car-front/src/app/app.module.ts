import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { NavbarComponent } from './candy-car/common/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserModule } from './candy-car/user/user.module';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		CommonModule,
		UserModule
	],
	providers: [
	],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
