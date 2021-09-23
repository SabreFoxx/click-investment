import { StyleAdjustmentService } from './../../services/style-adjustment.service';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('hero') hero: ElementRef;
  @ViewChild(HeaderComponent) header: HeaderComponent;

  constructor(private styleAdjustment: StyleAdjustmentService) { }

  @HostListener('window:resize', ['$event'])
  onScroll(event) {
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    this.hero.nativeElement.style.height = `calc(100vh - ${this.styleAdjustment.headerHeight}px)`;
    document.getElementsByTagName('body')[0].style.paddingTop =
      this.header.me.nativeElement.offsetHeight + 'px';
  }

  ngOnInit(): void {
  }

}
