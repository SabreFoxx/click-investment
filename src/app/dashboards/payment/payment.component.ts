import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { PaymentMethod } from 'src/models/payment-method';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentMethods: Observable<PaymentMethod[]>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route)
    this.paymentMethods = this.route.data.pipe(pluck('paymentMethods'));
  }

}
