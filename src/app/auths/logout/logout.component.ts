import { Router } from '@angular/router';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  @ViewChild('alert')
  public readonly alert!: SwalComponent;

  constructor(private authStore: AuthStorageService, private router: Router) { }

  swalOptions = {
    title: 'You\'ve been logged out',
    html: `We hope to see you soon!`,
    icon: 'success',
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
    this.authStore.userJwtToken = null;
    this.authStore.currentUser = null;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.alert.fire()
    }, 300);
  }

  handleConfirm() {
    this.router.navigate(['/home']);
  }
}
