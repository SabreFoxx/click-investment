import { StyleAdjustmentService } from './../../services/style-adjustment.service';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('hero') hero: ElementRef;

  constructor(private styleAdjustment: StyleAdjustmentService) { }

  ngAfterViewInit(): void {
    this.hero.nativeElement.style.height = `calc(100vh - ${this.styleAdjustment.headerHeight}px)`;
  }

  ngOnInit(): void {
  }

}
