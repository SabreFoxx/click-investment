import { User } from 'src/models/user';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from 'src/app/animation';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-base-panel',
  templateUrl: './base-panel.component.html',
  styleUrls: ['./base-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class BasePanelComponent implements OnInit, OnDestroy, AfterViewInit {
  isSideMenuVisible: Subject<boolean>;
  isShowNotificationPane: boolean = false;
  user: BehaviorSubject<User>;

  @ViewChild('sideMenu') sideMenu: ElementRef;
  @ViewChild('top') top: ElementRef;
  @ViewChild('menuButton') menuButton: ElementRef;
  @ViewChild('profilePic') profilePic: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('panelBase') panelBase: ElementRef;
  @ViewChild('displayPanel') displayPanel: ElementRef;
  @ViewChildren('templateVarUsedWhenIsShowSideMenu') pageSvgIcons: QueryList<ElementRef>;
  @ViewChild('appNotificationPaneContainer') appNotificationPaneContainer: ElementRef;

  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private ui: UIAdjustmentService, private deviceService: DeviceDetectorService,
    private authStorage: AuthStorageService, private r: Renderer2) {
    this.isSideMenuVisible = ui.isSideMenuVisible;
    this.user = this.authStorage.currentUser;
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.ui.isNotificationPaneVisible
      .pipe(takeUntil(this.subscriptions))
      .subscribe(value => {
        if (value == true)
          this.isShowNotificationPane = true
        else {
          if (this?.appNotificationPaneContainer)
            this.r.removeClass(this.appNotificationPaneContainer.nativeElement,
              "app-notification-pane-show");
          setTimeout(() => this.isShowNotificationPane = false, 151);
        }
      });

    this.ui.isSideMenuVisible
      .pipe(takeUntil(this.subscriptions))
      .subscribe(answer => {
        answer ? this.unApplySideMenuCloseActions()
          : this.applySideMenuCloseActions();
      });

    // fixes a bug whereby <top-bar> isn't visible on login, on mobile
    document.documentElement.scrollTop = 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }

  toggleSideMenu() {
    this.ui.toggleSideMenu();
  }

  private applySideMenuCloseActions() {
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

  private unApplySideMenuCloseActions() {
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
