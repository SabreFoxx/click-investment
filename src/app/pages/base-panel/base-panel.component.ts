import { StyleAdjustmentService } from 'src/services/style-adjustment.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from 'src/app/animation';

@Component({
  selector: 'app-base-panel',
  templateUrl: './base-panel.component.html',
  styleUrls: ['./base-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeAnimation
  ]
})
export class BasePanelComponent implements OnInit {
  isShowSideMenu: boolean;

  constructor(private globalStyle: StyleAdjustmentService) {
    globalStyle.isSideMenuVisible.subscribe(v => this.isShowSideMenu = v);
  }

  ngOnInit(): void { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }

  toggleSideMenu() {
    this.globalStyle.toggleSideMenu();
  }
}
