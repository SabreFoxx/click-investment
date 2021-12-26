import { AuthStorageService } from 'src/services/auth-storage.service';
import { DepositDetails } from 'src/models/payment-details';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  @ViewChild('addr') addr: ElementRef;
  depositDetails: DepositDetails;
  user: User;

  constructor(private router: Router, private route: ActivatedRoute, private renderer: Renderer2,
    private ui: UIAdjustmentService, private authStore: AuthStorageService) {
    this.depositDetails = this.router.getCurrentNavigation().extras.state?.paymentDetails;
    this.depositDetails ?? router.navigate(['../'], { relativeTo: this.route });

    this.ui.setBreadcrumbs([{ url: '/app/payments', title: 'Payments' },
    { url: '/app/payments/deposit', title: 'Deposit', forceActive: true }]);
  }

  ngOnInit(): void {
    this.authStore.currentUser.subscribe(user => this.user = user);
  }

  deposit() {
    this.renderer.setStyle(this.addr.nativeElement, 'opacity', '1');
  }

}
