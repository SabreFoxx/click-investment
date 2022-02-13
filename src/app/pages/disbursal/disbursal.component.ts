import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Deposit } from 'src/models/deposit';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';

@Component({
  selector: 'app-payback',
  templateUrl: './disbursal.component.html',
  styleUrls: ['./disbursal.component.scss']
})
export class DisbursalComponent implements OnInit {
  depositsForValidation: Observable<Deposit[]>;

  constructor(private route: ActivatedRoute, private ui: UIAdjustmentService,
    private router: Router,) {
    ui.setBreadcrumbs([{ url: '/app/validations', title: 'Validations' }]);
  }

  ngOnInit(): void {
    this.depositsForValidation = this.route.data.pipe(pluck('resolveDepositsForValidation'));
  }

  /**
   * Reload our view, and thus its data
   */
  reloadView(): void {
    this.router.navigated = false;
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}