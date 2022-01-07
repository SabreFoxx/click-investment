import { Component, Input, OnInit } from '@angular/core';
import { Withdrawal } from 'src/models/withdrawal';

@Component({
  selector: 'app-withdraw-transaction',
  templateUrl: './withdraw-transaction.component.html',
  styleUrls: ['./withdraw-transaction.component.scss']
})
export class WithdrawTransactionComponent implements OnInit {
  @Input() data: Withdrawal[];

  constructor() { }

  ngOnInit(): void {
  }

}
