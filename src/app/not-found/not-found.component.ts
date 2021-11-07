import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, AfterViewInit {

  @ViewChild('alert')
  public readonly notFound!: SwalComponent;

  swalOptions = {
    title: '404! Not Found!',
    html: `We're really sorry, buth the page you requested could not be found`,
    icon: 'error',
    confirmButtonText: 'Okay',
    confirmButtonAriaLabel: 'Exit',
    heightAuto: false,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'button is-rounded is-link mgn',
      cancelButton: 'button is-rounded mgn'
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.notFound.fire()
    }, 300);
  }

  handleConfirm() { }
}
