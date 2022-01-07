import { Component, Input, OnInit } from '@angular/core';
import { Deposit } from 'src/models/deposit';

@Component({
  selector: 'app-deposit-transaction',
  templateUrl: './deposit-transaction.component.html',
  styleUrls: ['./deposit-transaction.component.scss']
})
export class DepositTransactionComponent implements OnInit {
  @Input() data: Deposit[];

  constructor() { }

  ngOnInit(): void {
  }

}
