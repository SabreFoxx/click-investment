import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() name: string;
  @Input() text: string;

  alertOptions = {
    title: 'XRP',
    html: `
      The RippleNet payment platform is a real-time gross settlement 
      (RTGS) system that aims to enable instant monetary transactions globally.`,
    iconHtml: `
      <svg class="svg-icon-for-sweet-alert" style="fill: #0cc078">
        <use xlink:href="#circle-multiple-outline"></use>
      </svg>`,
    iconColor: '#0cc078',
    confirmButtonText: 'Proceed with XRP',
    confirmButtonAriaLabel: 'Use XRP',
    footer: 'Select this payment method for use in funding your plan',
    heightAuto: false,
    showCancelButton: true,
    cancelButtonAriaLabel: 'Abort',
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'button is-rounded is-link mgn',
      cancelButton: 'button is-rounded mgn'
    }
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
