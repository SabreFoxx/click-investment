import { LoadingFeedbackService } from 'src/services/feedback.service';
import { SimpleError } from 'src/adjectives/errors';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimpleHttpService {
  /**
   * subscribe to this to listen to full response json payload,
   * instead of the object set in parameter <T>
   */
  fullResponseBody: Subject<any>;

  constructor(private http: HttpClient, private feedback: LoadingFeedbackService) {
    this.fullResponseBody = new Subject();
  }

  /**
   * Make an API call using POST
   * @param url api endpoint
   * @param data POST data to send
   * @param toastSuccessMsg show UI toast on success
   * @param toastErrorMsg show UI toast on error
   * @param headers HTTP headers
   * @returns a Subject of <T>. <T> is the model of the expected result.
   * send<T> unsubscribes observers automaticall, after we've gotten a response
   */
  public send<T>(url: string, data: any, headers?: HttpHeaders,
    toastSuccessMsg = true, toastErrorMsg = true): Subject<T> {
    let response = new Subject<T>();
    this.feedback.loading();

    // reset fullResponseBody
    this.fullResponseBody.complete();
    this.fullResponseBody = new Subject();

    let errorHandler = toastErrorMsg ? this.toastError : this.handleError;

    this.http.post<T>(url, data, {
      headers: headers || null,
      observe: 'response',
      responseType: 'json'
    }).pipe(
      retry(2),
      catchError(errorHandler) // if error is caught, we won't have a subscription
    ).subscribe(res => {
      this.feedback.doneLoading();
      response.next((res.body as any)?.data);
      this.fullResponseBody.next(res.body);

      if (toastSuccessMsg)
        this.feedback.show({ title: 'Success', text: res.body['message'] });

      response.complete(); // unsubscribe observers
    }, (error: HttpErrorResponse) => {
      this.feedback.doneLoading();

      if (!toastErrorMsg)
        // if we don't toast error message, it will be printed in the console
        response.error(error.error?.message);
    })
    return response;
  }

  public update<T>(url: string, data: any, headers?: HttpHeaders): Subject<T> {
    let response = new Subject<T>();
    this.feedback.loading();

    this.http.put<T>(url, data, {
      headers: headers || null,
      observe: 'response',
      responseType: 'json'
    }).pipe(catchError(this.toastError))
      .subscribe(res => {
        this.feedback.doneLoading();
        response.next((res.body as any)?.data);
        this.feedback.show({ title: 'Success', text: res.body['message'] });
        response.complete();
      }, (error: HttpErrorResponse) => {
        this.feedback.doneLoading();
      })
    return response;
  }

  public receive<T>(url: string, headers?: HttpHeaders): Subject<T> {
    let response = new Subject<T>();
    this.feedback.loading();

    // reset fullResponseBody
    this.fullResponseBody.complete();
    this.fullResponseBody = new Subject();

    this.http.get(url, {
      headers: headers || null,
      observe: 'response',
      responseType: 'json'
    }).pipe(catchError(this.handleError))
      .subscribe(res => {
        this.feedback.doneLoading();

        response.next((res.body as any)?.data);
        this.fullResponseBody.next(res.body);

        response.complete(); // unsubscribe observers
        this.fullResponseBody.complete();
      }, (error: HttpErrorResponse) => {
        this.feedback.doneLoading();
        response.error(error.error?.message)
      })

    return response;
  }

  public discard(url: string, headers?: HttpHeaders): Subject<any> {
    let response = new Subject();
    this.feedback.loading();

    this.http.delete(url, {
      headers: headers || null,
      observe: 'response',
      responseType: 'json'
    }).pipe(catchError(this.toastError))
      .subscribe(res => {
        this.feedback.doneLoading();
        response.next();
        this.feedback.show({ title: 'Success' });
        response.complete();
      }, (error: HttpErrorResponse) => {
        this.feedback.doneLoading();
      })
    return response;
  }

  public loadPageData<T>(url: string, headers?: HttpHeaders): Subject<T> {
    let response = new Subject<T>();
    this.feedback.loading();

    this.http.get(url, {
      headers: headers || null,
      observe: 'response',
      responseType: 'json'
    }).subscribe(res => {
      this.feedback.doneLoading();
      response.next((res.body as any)?.data);
      response.complete();
    }, () => {
      this.feedback.doneLoading();
      // we still need our router resolver to resolve whether
      // there is an error or not, so our page will load
      (response as any).next([]);
      response.complete();
    })

    return response;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0)
      console.error('An error occurred:', error.error, 'possibly bad internet connection');
    else
      // return an observable with a user-facing error message.
      // it is sent to this code block (which is above): 
      // (error: HttpErrorResponse) => {
      //   if (!toastErrorMsg)
      //     response.error(error);
      // })
      return throwError(error);
  }

  private toastError(error: HttpErrorResponse) {
    if (error.status === 0)
      LoadingFeedbackService.showError({ title: "An error occurred", text: error.error.message });
    else
      LoadingFeedbackService.showError({ title: "Oops!", text: error.error.message });

    // return an observable with a user-facing error message.
    return throwError(new SimpleError);
  }
}
