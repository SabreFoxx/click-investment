import { map, pluck } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Observable } from 'rxjs';
import { Deposit } from 'src/models/deposit';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  depositsForValidation: Observable<Deposit[]>;
  // storageWalletAddr of Deposit will be renamed to walletAddr
  viewData: Observable<any>;

  constructor(private route: ActivatedRoute, private ui: UIAdjustmentService,
    private router: Router,) {
    ui.setBreadcrumbs([{ url: '/app/validations', title: 'Validations' }]);
  }

  ngOnInit(): void {
    this.depositsForValidation = this.route.data.pipe(pluck('resolveDepositsForValidation'));
    this.viewData = this.depositsForValidation.pipe(
      map(deposits => {
        return deposits.map(deposit => {
          // rename storageWalletAddr to walletAddr
          const oldKey = 'storageWalletAddr'
          const newKey = 'walletAddr'

          const { [oldKey]: replaceByKey, ...rest } = deposit
          return { ...rest, [newKey]: replaceByKey } as Deposit
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
