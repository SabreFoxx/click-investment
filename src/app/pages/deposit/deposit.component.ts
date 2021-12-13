import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  @ViewChild('addr') addr: ElementRef;

  constructor(private renderer: Renderer2, private ui: UIAdjustmentService) {
    this.ui.setBreadcrumbs([{ url: '/app/payments', title: 'Payments' },
    { url: '/app/payments/deposit', title: 'Deposit', forceActive: true }]);
  }

  ngOnInit(): void { }

  deposit() {
    this.renderer.setStyle(this.addr.nativeElement, 'opacity', '1');
  }

}
