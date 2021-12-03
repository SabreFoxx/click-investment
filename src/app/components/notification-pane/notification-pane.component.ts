import { Subject } from 'rxjs';
import { Component, OnInit, AfterViewInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { NotificationPaneService } from 'src/services/notification-pane.service';
import { Notification } from 'src/models/notification';

@Component({
  selector: 'app-notification-pane',
  templateUrl: './notification-pane.component.html',
  styleUrls: ['./notification-pane.component.scss']
})
export class NotificationPaneComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() myContainer: any;
  notifications: Subject<Notification[]>;

  constructor(private notify: NotificationPaneService, private renderer: Renderer2) {
    this.notifications = notify.display;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.renderer.addClass(this.myContainer, "app-notification-pane-show"));
  }

  ngOnDestroy(): void {
    this.renderer.addClass(this.myContainer, "app-notification-pane-show")
  }

}
