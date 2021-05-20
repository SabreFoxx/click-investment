import { StyleAdjustmentService } from './../services/style-adjustment.service';
import { HeaderComponent } from './header/header.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'click-investment';
  @ViewChild(HeaderComponent) header: HeaderComponent;

  constructor(private headerHeight: StyleAdjustmentService) { }

  ngAfterViewInit(): void {
    this.headerHeight.headerHeight = this.header.me.nativeElement.offsetHeight;
    document.getElementsByTagName('body')[0].style.paddingTop =
      this.header.me.nativeElement.offsetHeight + 'px';
  }

  @HostListener('window:resize', ['$event'])
  onScroll(event) {
    this.ngAfterViewInit();
  }
}
