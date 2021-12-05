import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  @ViewChild('addr') addr: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  deposit() {
    this.renderer.setStyle(this.addr.nativeElement, 'opacity', '1');
  }

}
