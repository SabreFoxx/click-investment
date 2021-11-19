import { ToastService } from './toast.service';
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
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    showConfirmButton: false
  })

  constructor(private toast: ToastService) { }

  ngOnInit(): void {
    this.toast.message.subscribe(toast => {
      this.alert.fire({
        icon: 'success',
        title: toast.title,
        text: toast.text
      })
    });

    ToastService.error.subscribe(toast => {
      this.alert.fire({
        icon: 'error',
        title: toast.title,
        text: toast.text
      })
    })
  }

}
