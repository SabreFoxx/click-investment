import { FeedbackService } from 'src/services/feedback.service';
import { SimpleError } from 'src/adjectives/error';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimplePostService {

  constructor(private http: HttpClient, private feedback: FeedbackService) { }

  send<T>(url: string, data: any,
    toastSuccessMsg = true, toastErrorMsg = true, headers?: any): Subject<T> {
    let response = new Subject<T>();
    let errorHandler = toastErrorMsg ? this.toastError : this.handleError;

    this.feedback.loading();
    this.http.post<T>(url, data, {
      headers: headers || null,
      observe: 'response',
      responseType: 'json'
    }).pipe(
      retry(2),
      catchError(errorHandler)
    )
      .subscribe(res => {
        this.feedback.doneLoading();
        response.next((res.body as any).data);
        if (toastSuccessMsg)
          this.feedback.show({ title: 'Success', text: res.body['message'] });
      }, (error: HttpErrorResponse) => {
        this.feedback.doneLoading();
        if (!toastErrorMsg)
          response.error(error.error.message);
      })
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0)
      console.error('An error occurred:', error.error);
    else
      // return an observable with a user-facing error message.
      // it is sent to the block: 
      // (error: HttpErrorResponse) => {
      //   if (!toastErrorMsg)
      //     response.error(error);
      // })
      // above
      return throwError(error);
  }

  private toastError(error: HttpErrorResponse) {
    if (error.status === 0)
      FeedbackService.showError({ title: "An error occurred", text: error.error.message });
    else
      FeedbackService.showError({ title: "An error occurred", text: error.error.message });

    // return an observable with a user-facing error message.
    return throwError(new SimpleError);
  }
}
