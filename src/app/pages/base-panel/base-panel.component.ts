import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
  ViewChildren,
  QueryList
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from 'src/app/animation';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-base-panel',
  templateUrl: './base-panel.component.html',
  styleUrls: ['./base-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class BasePanelComponent implements OnInit {
  isShowSideMenu: BehaviorSubject<boolean>;
  isWhat: boolean = false

  @ViewChild('sideMenu') sideMenu: ElementRef;
  @ViewChild('top') top: ElementRef;
  @ViewChild('menuButton') menuButton: ElementRef;
  @ViewChild('profilePic') profilePic: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('panelBase') panelBase: ElementRef;
  @ViewChild('displayPanel') displayPanel: ElementRef;
  @ViewChildren('templateVarUsedWhenIsShowSideMenu') pageSvgIcons: QueryList<ElementRef>;

  constructor(private globalStyle: UIAdjustmentService, private r: Renderer2) {
    this.isShowSideMenu = globalStyle.isSideMenuVisible;
    this.isWhat = true
    setTimeout(() => this.isWhat = true, 2000)
  }

  ngOnInit(): void { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }

  toggleSideMenu() {
    this.globalStyle.toggleSideMenu();
    this.isShowSideMenu.value ? this.applySideMenuCloseActions()
      : this.unApplySideMenuCloseActions();
  }

  applySideMenuCloseActions() {
    this.r.addClass(this.sideMenu.nativeElement, 'side-menu-closed');
    this.r.addClass(this.top.nativeElement, 'side-menu-closed');
    this.r.addClass(this.menuButton.nativeElement, 'side-menu-closed');
    this.r.addClass(this.profilePic.nativeElement, 'side-menu-closed');
    this.r.addClass(this.nav.nativeElement, 'side-menu-closed');
    this.r.addClass(this.panelBase.nativeElement, 'side-menu-closed');
    this.r.addClass(this.displayPanel.nativeElement, 'side-menu-closed');
    this.pageSvgIcons.forEach(svg => {
      this.r.addClass(svg.nativeElement, 'side-menu-closed');
    });
  }

  unApplySideMenuCloseActions() {
    this.r.removeClass(this.sideMenu.nativeElement, 'side-menu-closed');
    this.r.removeClass(this.top.nativeElement, 'side-menu-closed');
    this.r.removeClass(this.menuButton.nativeElement, 'side-menu-closed');
    this.r.removeClass(this.profilePic.nativeElement, 'side-menu-closed');
    this.r.removeClass(this.nav.nativeElement, 'side-menu-closed');
    this.r.removeClass(this.panelBase.nativeElement, 'side-menu-closed');
    this.r.removeClass(this.displayPanel.nativeElement, 'side-menu-closed');
    this.pageSvgIcons.forEach(svg => {
      this.r.removeClass(svg.nativeElement, 'side-menu-closed');
    });
  }
}
