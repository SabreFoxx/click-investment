import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  title: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _message: Subject<Toast>;
  public static error = new Subject<Toast>();

  constructor() {
    this._message = new Subject<Toast>();
  }

  show(toast: Toast): void {
    this._message.next(toast);
  }

  static showError(toast: Toast): void {
    ToastService.error.next(toast);
  }

  get message() {
    return this._message;
  }
}
