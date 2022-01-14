import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Breadcrumb } from 'src/models/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class UIAdjustmentService {
  headerHeight: number;
  isSideMenuVisible = new Subject<boolean>();
  private isSideMenuVisible_ = false;
  isNotificationPaneVisible = new BehaviorSubject<boolean>(false);
  breadcrumbs: BehaviorSubject<Breadcrumb[]>;
  appHasLoadedBefore = false;

  constructor() {
    setTimeout(() => this.appHasLoadedBefore = true, 1000); // let it be known we've loaded our app
    this.breadcrumbs = new BehaviorSubject(null);
  }

  toggleSideMenu(): void {
    this.isSideMenuVisible_ = !this.isSideMenuVisible_;
    this.isSideMenuVisible.next(this.isSideMenuVisible_);
  }

  closeSideMenu(): void {
    if (this.isSideMenuVisible_)
      this.toggleSideMenu();
  }

  toggleNotificationPane(): void {
    this.isNotificationPaneVisible.next(!this.isNotificationPaneVisible.getValue());
  }

  setBreadcrumbs(crumbs: Breadcrumb[]): void {
    this.breadcrumbs.next(crumbs);
  }
}
