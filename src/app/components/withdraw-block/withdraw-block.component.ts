import { Component, Input, OnInit } from '@angular/core';
import { WithdrawalBlock } from 'src/models/withdrawal-block';

@Component({
  selector: 'tr[app-withdraw-block]',
  templateUrl: './withdraw-block.component.html',
  styleUrls: ['./withdraw-block.component.scss']
})
export class WithdrawBlockComponent implements OnInit {
  @Input() block: WithdrawalBlock;

  constructor() { }

  ngOnInit(): void {
  }

}
