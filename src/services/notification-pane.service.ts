import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationPaneService {
  news: BehaviorSubject<Array<Notification>>;
  alerts: BehaviorSubject<Array<Notification>>;
  activeDisplay: Subject<Notification[]>;

  constructor() {
    this.news = new BehaviorSubject([
      new Notification('New news', 'content'),
      new Notification('New news', 'content'),
      new Notification('New news', 'content')
    ]);
    this.activeDisplay = new Subject;
  }
}

export class Notification {
  constructor(private title: string, private content: string, private isRead = false) { }
}