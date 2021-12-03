import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit } from '@angular/core';
import { NotificationPaneService } from 'src/services/notification-pane.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private ui: UIAdjustmentService, private notify: NotificationPaneService) { }

  ngOnInit(): void {
  }

  showNews() {
    this.notify.activeDisplay.next(this.notify.news.getValue());
    this.ui.toggleNotificationPane();
  }

  showAlert() {
    this.notify.activeDisplay.next(this.notify.alerts.getValue());
    this.ui.toggleNotificationPane();
  }

}
