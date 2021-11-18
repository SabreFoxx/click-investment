import { SimpleError } from './../adjectives/error';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimplePostService {

  constructor(private http: HttpClient) { }

  send<T>(url: string, data: any,
    toastSuccess = true, toastError = true, headers?: any): Subject<T> {
    let response = new Subject<T>();
    const errorHandler = toastError ? this.toastError : this.handleError;

    this.http.post<T>(url, data, {
      headers: headers || null,
      observe: 'response',
      responseType: 'json'
    }).pipe(
      retry(3),
      catchError(errorHandler)
    ).subscribe(res => {
      response.next((res.body as any).data);
      if (toastSuccess) {
        let l = null;
      }
    }, (error: SimpleError | HttpErrorResponse) => {
      response.error(error);
    })
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0)
      console.error('An error occurred:', error.error);
    else
      return throwError(error);
  }

  private toastError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(new SimpleError);
  }
}
