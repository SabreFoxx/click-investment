import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdown') dropdown: ElementRef;
  isMenuShown: boolean = false;

  constructor(public me: ElementRef) { }

  toggleMenu() {
    this.isMenuShown = !this.isMenuShown;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
