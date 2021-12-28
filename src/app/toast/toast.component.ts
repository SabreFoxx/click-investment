import { LoadingFeedbackService } from 'src/services/feedback.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  alert = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    showConfirmButton: false
  })

  constructor(private feedback: LoadingFeedbackService) { }

  ngOnInit(): void {
    this.feedback.message
      .pipe(takeUntil(this.subscriptions))
      .subscribe(toast => {
        this.alert.fire({
          icon: 'success',
          title: toast.title,
          text: toast.text
        })
      });

    LoadingFeedbackService.error
      .pipe(takeUntil(this.subscriptions))
      .subscribe(toast => {
        this.alert.fire({
          icon: 'error',
          title: toast.title,
          text: toast.text
        })
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }
}
