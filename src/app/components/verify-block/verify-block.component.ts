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
  @Output() accept = new EventEmitter();
  @Output() hide = new EventEmitter();
  @Output() reject = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  accept_() {
    this.accept.emit(this.block);
  }

  hide_() {
    this.hide.emit(this.block);
  }

  reject_() {
    this.reject.emit(this.block);
  }

  trimLength(string) {
    return getMaxLetters(string, 12);
  }

}
