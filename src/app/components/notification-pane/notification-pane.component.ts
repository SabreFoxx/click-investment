import { Subject } from 'rxjs';
import { Component, OnInit, AfterViewInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { Notification, NotificationPaneService } from 'src/services/notification-pane.service';

@Component({
  selector: 'app-notification-pane',
  templateUrl: './notification-pane.component.html',
  styleUrls: ['./notification-pane.component.scss']
})
export class NotificationPaneComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() myContainer: any;
  content: Subject<Notification[]>;

  constructor(private notify: NotificationPaneService, private renderer: Renderer2) {
    this.content = notify.activeDisplay;
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
