import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationPaneService } from 'src/services/notification-pane.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Breadcrumb } from 'src/models/breadcrumb';
import { capitalizeFirstLetter } from 'src/adjectives/functions';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import screenfull from 'screenfull';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy {
  openedWith: OpenedWithIcon;
  breadcrumbs: BehaviorSubject<Breadcrumb[]>;
  title: string = 'null';

  searchForm: FormGroup;
  search: AbstractControl;

  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private ui: UIAdjustmentService, private pageTitle: Title,
    private notify: NotificationPaneService, private deviceService: DeviceDetectorService) {
    this.openedWith = OpenedWithIcon.NONE;
    this.breadcrumbs = ui.breadcrumbs;

    this.searchForm = new FormGroup({ 'search': new FormControl() });
    this.search = this.searchForm.controls['search'];
  }

  ngOnInit(): void {
    this.ui.breadcrumbs
      .pipe(takeUntil(this.subscriptions))
      .subscribe((b) => {
        this.title = capitalizeFirstLetter(b[b.length - 1]['title']);
        this.pageTitle.setTitle(`${this.title} - Click Investment`);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }

  newsHeadlineNotificationViewing(): void {
    this.closeSideMenuOnMobile();

    // if it's opened with me, close it
    if (this.ui.isNotificationPaneVisible.getValue()
      && this.openedWith == OpenedWithIcon.NEWS_HEADLINE)
      this.ui.toggleNotificationPane()
    // if it's opened and has notifications showing, switch to me
    else if (this.ui.isNotificationPaneVisible.getValue()
      && this.openedWith == OpenedWithIcon.NOTIFICATION) {
      this.openedWith = OpenedWithIcon.NEWS_HEADLINE
      this.notify.display.next(this.notify.newsHeadlines)
    }
    // if it's closed switch to me and open it
    else if (!this.ui.isNotificationPaneVisible.getValue()) {
      this.openedWith = OpenedWithIcon.NEWS_HEADLINE
      this.notify.display.next(this.notify.newsHeadlines)
      this.ui.toggleNotificationPane()
    }

    this.openedWith = OpenedWithIcon.NEWS_HEADLINE
  }

  notificationViewing(): void {
    this.closeSideMenuOnMobile();

    // if it's opened with me, close it
    if (this.ui.isNotificationPaneVisible.getValue()
      && this.openedWith == OpenedWithIcon.NOTIFICATION)
      this.ui.toggleNotificationPane()
    // if it's opened and has newsHeadlines showing, switch to me
    else if (this.ui.isNotificationPaneVisible.getValue()
      && this.openedWith == OpenedWithIcon.NEWS_HEADLINE) {
      this.openedWith = OpenedWithIcon.NOTIFICATION
      this.notify.display.next(this.notify.notifications)
    }
    // if it's closed switch to me and open it
    else if (!this.ui.isNotificationPaneVisible.getValue()) {
      this.openedWith = OpenedWithIcon.NOTIFICATION
      this.notify.display.next(this.notify.notifications)
      this.ui.toggleNotificationPane()
    }

    this.openedWith = OpenedWithIcon.NOTIFICATION
  }

  toggleFullScreen(button: HTMLElement): void {
    if (screenfull.isEnabled)
      screenfull.toggle();
    button.blur()
  }

  private closeSideMenuOnMobile(): void {
    if (this.deviceService.isMobile())
      this.ui.closeSideMenu();
  }
}

enum OpenedWithIcon {
  NONE,
  NEWS_HEADLINE,
  NOTIFICATION
}
