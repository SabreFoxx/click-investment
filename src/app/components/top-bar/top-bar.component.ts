import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit } from '@angular/core';
import { NotificationPaneService } from 'src/services/notification-pane.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  openedWith: OpenedWithIcon;

  constructor(private ui: UIAdjustmentService,
    private notify: NotificationPaneService) {
    this.openedWith = OpenedWithIcon.NONE
  }

  ngOnInit(): void {
  }

  showNews() {
    this.notify.display.next(this.notify.news);
    if (this.openedWith == OpenedWithIcon.NEWS || this.openedWith == OpenedWithIcon.NONE)
      this.ui.toggleNotificationPane();
    this.openedWith = OpenedWithIcon.NEWS
  }

  showAlert() {
    this.notify.display.next(this.notify.alerts);
    if (this.openedWith == OpenedWithIcon.ALERT || this.openedWith == OpenedWithIcon.NONE)
      this.ui.toggleNotificationPane();
    this.openedWith = OpenedWithIcon.ALERT
  }

}

enum OpenedWithIcon {
  NONE,
  NEWS,
  ALERT
}
