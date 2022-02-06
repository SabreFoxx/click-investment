import { WithdrawalBlock } from 'src/models/withdrawal-block';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'tr[app-withdraw-block]',
  templateUrl: './withdraw-block.component.html',
  styleUrls: ['./withdraw-block.component.scss']
})
export class WithdrawBlockComponent implements OnInit {
  // withdrawals are made on profits, and deposits we've already made
  @Input() block: WithdrawalBlock;

  constructor(public hostElement: ElementRef, private authStore: AuthStorageService) { }

  ngOnInit(): void { }

  selectRadio(): void {
    if (this.block.status == 'available') {
      const radio = (this.hostElement.nativeElement as HTMLElement).querySelector('input');
      radio.click();
      radio.checked = true;
    }
  }

  get depositIdToUse(): number {
    return this.block.depositId;
  }

  get userCurrency() {
    return this.authStore.currentUser.getValue().currency;
  }

}
