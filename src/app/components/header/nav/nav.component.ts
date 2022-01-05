import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nav[app-nav]',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild('button') button: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.button.nativeElement.classList.toggle('is-active');
    this.menu.nativeElement.classList.toggle('is-active');
  }

}
