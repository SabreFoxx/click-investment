import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  title: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class LoadingFeedbackService {
  private toastMessage: Subject<Toast>;
  public static error = new Subject<Toast>();
  progressLoading: Subject<boolean>;

  constructor() {
    this.toastMessage = new Subject<Toast>();
    this.progressLoading = new Subject;
  }

  show(toast: Toast): void {
    this.toastMessage.next(toast);
  }

  static showError(toast: Toast): void {
    LoadingFeedbackService.error.next(toast);
  }

  get message() {
    return this.toastMessage;
  }

  /**
   * shows top progress bar loading animation
   */
  loading(): void {
    this.progressLoading.next(true);
  }

  /**
   * hides top progress bar loading animation
   */
  doneLoading(): void {
    this.progressLoading.next(false);
  }
}
