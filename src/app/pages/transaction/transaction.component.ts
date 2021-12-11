import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor(private ui: UIAdjustmentService) {
    ui.setBreadcrumbs([{ url: '/app/transactions', title: 'Transactions' }]);
  }

  ngOnInit(): void {
    this.ui.setBreadcrumbs([{ url: '/app/transactions', title: 'Transactions' }]);
  }
}
