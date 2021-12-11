import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit } from '@angular/core';
import { NotificationPaneService } from 'src/services/notification-pane.service';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from 'src/models/breadcrumb';
import { capitalizeFirstLetter } from 'src/adjectives/functions';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  openedWith: OpenedWithIcon;
  breadcrumbs: BehaviorSubject<Breadcrumb[]>;
  title: string = 'null';

  searchForm: FormGroup;
  search: AbstractControl;

  constructor(private ui: UIAdjustmentService, private pageTitle: Title,
    private notify: NotificationPaneService) {
    this.openedWith = OpenedWithIcon.NONE;
    this.breadcrumbs = ui.breadcrumbs;

    this.searchForm = new FormGroup({ 'search': new FormControl() });
    this.search = this.searchForm.controls['search'];
  }

  ngOnInit(): void {
    this.ui.breadcrumbs.subscribe((b) => {
      this.title = capitalizeFirstLetter(b[b.length - 1]['title']);
      this.pageTitle.setTitle(`${this.title} - Click Investment`);
    });
  }

  showNews() {
    this.notify.display.next(this.notify.news)
    if (this.openedWith == OpenedWithIcon.NEWS || this.openedWith == OpenedWithIcon.NONE)
      this.ui.toggleNotificationPane()
    this.openedWith = OpenedWithIcon.NEWS
  }

  showAlert() {
    this.notify.display.next(this.notify.alerts)
    if (this.openedWith == OpenedWithIcon.ALERT || this.openedWith == OpenedWithIcon.NONE)
      this.ui.toggleNotificationPane()
    this.openedWith = OpenedWithIcon.ALERT
  }
}

enum OpenedWithIcon {
  NONE,
  NEWS,
  ALERT
}
