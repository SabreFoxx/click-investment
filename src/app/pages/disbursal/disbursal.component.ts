import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Withdrawal } from 'src/models/withdrawal';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';

@Component({
  selector: 'app-payback',
  templateUrl: './disbursal.component.html',
  styleUrls: ['./disbursal.component.scss']
})
export class DisbursalComponent implements OnInit {
  disbursalsForValidation: Observable<Withdrawal[]>;
  // userWalletAddr of Withdrawal will be renamed to walletAddr
  viewData: Observable<any>;

  constructor(private route: ActivatedRoute, private ui: UIAdjustmentService,
    private router: Router,) {
    ui.setBreadcrumbs([{ url: '/app/validations', title: 'Validations' }]);
  }

  ngOnInit(): void {
    this.disbursalsForValidation = this.route.data.pipe(pluck('resolveDisbursalsForValidation'));
    this.viewData = this.disbursalsForValidation.pipe(
      map(withdrawals => {
        return withdrawals.map(withdrawal => {
          // rename userWalletAddr to walletAddr
          const oldKey = 'userWalletAddr'
          const newKey = 'walletAddr'

          const { [oldKey]: replaceByKey, ...rest } = withdrawal
          return { ...rest, [newKey]: replaceByKey }
        })
      })
    );
  }

  /**
   * Reload our view, and thus its data
   */
  reloadView(): void {
    this.router.navigated = false;
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}