import { FeedbackService } from 'src/services/feedback.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
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

  constructor(private feedback: FeedbackService) { }

  ngOnInit(): void {
    this.feedback.message.subscribe(toast => {
      this.alert.fire({
        icon: 'success',
        title: toast.title,
        text: toast.text
      })
    });

    FeedbackService.error.subscribe(toast => {
      this.alert.fire({
        icon: 'error',
        title: toast.title,
        text: toast.text
      })
    })
  }

}
