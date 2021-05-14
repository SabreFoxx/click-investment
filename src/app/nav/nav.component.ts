import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'nav[app-nav]',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdown') dropdown: ElementRef;
  isMenuShown: boolean = false;

  constructor() { }

  ngAfterViewInit(): void {

  }

  toggleMenu() {
    this.isMenuShown = !this.isMenuShown;
  }

  ngOnInit(): void {
  }

}
