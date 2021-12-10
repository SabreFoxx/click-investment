import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from 'src/models/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class UIAdjustmentService {
  headerHeight: number;
  isSideMenuVisible = new BehaviorSubject<boolean>(false);
  isNotificationPaneVisible = new BehaviorSubject<boolean>(false);
  breadcrumbs: BehaviorSubject<Breadcrumb[]>;

  constructor() {
    this.breadcrumbs = new BehaviorSubject(null);
  }

  toggleSideMenu(): void {
    this.isSideMenuVisible.next(!this.isSideMenuVisible.getValue());
  }

  toggleNotificationPane(): void {
    this.isNotificationPaneVisible.next(!this.isNotificationPaneVisible.getValue());
  }

  setBreadcrumbs(crumbs: Breadcrumb[]): void {
    this.breadcrumbs.next(crumbs);
  }
}
