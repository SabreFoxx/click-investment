import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIAdjustmentService {
  headerHeight: number;
  isSideMenuVisible = new BehaviorSubject<boolean>(false);
  isNotificationPaneVisible = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggleSideMenu() {
    this.isSideMenuVisible.next(!this.isSideMenuVisible.getValue());
  }

  
}
