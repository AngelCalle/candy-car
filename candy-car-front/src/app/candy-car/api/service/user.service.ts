import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	#GET_USER = environment.user + 'api-candy-car/v1/user/find_all';

	constructor(
		private readonly httpClient: HttpClient
	) { }

	getUser(): Observable<any> {
		return this.httpClient
			.get<any[]>(this.#GET_USER)
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
