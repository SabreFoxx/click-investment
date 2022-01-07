import { WithdrawTransactionComponent }
  from 'src/app/components/withdraw-transaction/withdraw-transaction.component';
import { DepositTransactionComponent }
  from 'src/app/components/deposit-transaction/deposit-transaction.component';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import {
  ChangeDetectorRef,
  Compiler,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Deposit } from 'src/models/deposit';
import { Withdrawal } from 'src/models/withdrawal';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('hostComponent', { read: ViewContainerRef }) placeholder;
  currentView: any;
  components = { 'deposit': DepositTransactionComponent, 'withdraw': WithdrawTransactionComponent };
  componentReference: ComponentRef<DepositTransactionComponent | WithdrawTransactionComponent>;
  private isViewInitialized = false;
  deposits: Deposit[];
  withdrawals: Withdrawal[];
  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private route: ActivatedRoute, private ui: UIAdjustmentService,
    private compiler: Compiler, private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectionReference: ChangeDetectorRef) {
    ui.setBreadcrumbs([{ url: '/app/transactions', title: 'Transactions' }]);
    this.currentView = this.components['deposit']
  }

  ngOnInit(): void {
    this.route.data.pipe(pluck('resolveTransactions'))
      .pipe(takeUntil(this.subscriptions))
      .subscribe(data => {
        const [deposits, withdrawals] = data;
        this.deposits = deposits;
        this.withdrawals = withdrawals;
      })
  }

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }

  updateComponent() {
    if (!this.isViewInitialized)
      return;
    if (this.componentReference)
      this.componentReference.destroy();

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.currentView);
    this.componentReference = this.placeholder.createComponent(factory);
    switch (this.currentView) {
      case this.components['deposit']:
        this.componentReference.instance.data = this.deposits;
        break;
      case this.components['withdraw']:
        this.componentReference.instance.data = this.withdrawals;
        break;
    }
    this.changeDetectionReference.detectChanges();
  }

  showDeposits() {
    this.currentView = this.components['deposit'];
    this.updateComponent();
  }

  showWithdrawals() {
    this.currentView = this.components['withdraw'];
    this.updateComponent();
  }
}
