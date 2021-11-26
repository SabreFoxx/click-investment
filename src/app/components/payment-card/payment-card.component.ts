import { Router } from '@angular/router';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent implements OnInit {
  @Input() name: string;
  @Input() css: string;
  @Input() text: string;
  @Output() selected = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clicked() {
    this.selected.emit();
  }
}
