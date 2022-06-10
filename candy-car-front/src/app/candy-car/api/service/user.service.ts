import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	#GET_USER = environment.user + 'find_all';
	#GET_EXIST_MAIL = environment.user + 'mail/';
	#GET_LOGIN = environment.user + 'login/';
	#POST_REGISTER = environment.user + 'register/';
	#PUT_EDIT_USER = environment.user + 'edit-user/';
	#DELETE_USER = environment.user;

	constructor(
		private readonly httpClient: HttpClient
	) { }

	getUser(): Observable<any> {
		return this.httpClient
			.get<any[]>(this.#GET_USER)
			.pipe(catchError(this.handleError));
	}

	getExistEmail(mail: string): Observable<any> {
		return this.httpClient
			.get<any[]>(this.#GET_EXIST_MAIL + mail)
			.pipe(catchError(this.handleError));
	}

	getLogin(mail: string, password: string): Observable<any> {
		return this.httpClient
			.get<any[]>(this.#GET_LOGIN + mail + '/' + password)
			.pipe(catchError(this.handleError));
	}

	postRegister(user: any): Observable<any> {
		const body = user;
		return this.httpClient
			.post<any[]>(this.#POST_REGISTER, body)
			.pipe(catchError(this.handleError));
	}

	putEditUser(user: any): Observable<any> {
		const body = user;
		return this.httpClient
			.put<any[]>(this.#PUT_EDIT_USER + body.id, body)
			.pipe(catchError(this.handleError));
	}

	deleteUser(id: any): Observable<any> {
		return this.httpClient
			.delete<any[]>(this.#DELETE_USER + id,)
			.pipe(catchError(this.handleError));
	}

	handleError(error: HttpErrorResponse): Observable<never> {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.message;
		} else {
			errorMessage = `Error Code: $error.statusnMessage: $error.message`;
		}
		console.timeEnd(errorMessage);
		return throwError(errorMessage);
	}

}
