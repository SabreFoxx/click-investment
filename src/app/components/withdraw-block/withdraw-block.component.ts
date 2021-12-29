import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { WithdrawalBlock } from 'src/models/withdrawal-block';

@Component({
  selector: 'tr[app-withdraw-block]',
  templateUrl: './withdraw-block.component.html',
  styleUrls: ['./withdraw-block.component.scss']
})
export class WithdrawBlockComponent implements OnInit {
  @Input() block: WithdrawalBlock;

  constructor(public hostElement: ElementRef) { }

  ngOnInit(): void { }

  selectRadio(): void {
    const radio = (this.hostElement.nativeElement as HTMLElement).querySelector('input');
    radio.click();
    radio.checked = true;
  }

  get depositIdToUse(): number {
    return this.block.depositId;
  }

}
