import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleAdjustmentService {
  headerHeight: number;
  isSideMenuVisible = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isSideMenuVisible.next(false);
  }

  toggleSideMenu() {
    this.isSideMenuVisible.next(!this.isSideMenuVisible.getValue());
  }
}
