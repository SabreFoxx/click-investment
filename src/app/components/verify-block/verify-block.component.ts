import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { getMaxLetters } from 'src/adjectives/functions';
import { Deposit } from 'src/models/deposit';
import { Withdrawal } from 'src/models/withdrawal';

@Component({
  selector: 'tr[app-verify-block]',
  templateUrl: './verify-block.component.html',
  styleUrls: ['./verify-block.component.scss']
})
export class VerifyBlockComponent implements OnInit {
  @Input() block: Deposit | Withdrawal | any;
  @Output() acceptTransaction = new EventEmitter();
  @Output() hideTransaction = new EventEmitter();
  @Output() rejectTransaction = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  accept() {
    this.acceptTransaction.emit(this.block);
  }

  hide() {
    this.hideTransaction.emit(this.block);
  }

  reject() {
    this.rejectTransaction.emit(this.block);
  }

  trimLength(string) {
    return getMaxLetters(string, 12);
  }

}
