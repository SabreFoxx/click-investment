import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from 'src/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationPaneService {
  news: Array<Notification>;
  alerts: Array<Notification>;
  display: BehaviorSubject<Array<Notification>>;

  constructor() {
    const news = new Notification('Primary', `
      In publishing and graphic design, Lorem ipsum is a placeholder 
      text commonly used to demonstrate the visual form of a document 
      or a typeface without relying on meaningful content. Lorem ipsum 
      may be used as a placeholder before the final copy is available.
    `);
    const alert = new Notification('Primary', `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Pellentesque risus mi, tempus quis placerat ut,
      porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
      gravida purus diam, et dictum felis venenatis efficitur.
      Aenean ac eleifend lacus, in mollis lectus. Donec sodales,
      arcu et sollicitudin porttitor, tortor urna tempor ligula, id
      porttitor mi magna a neque. Donec dui urna, vehicula et sem eget,
      facilisis sodales sem.
    `);
    this.news = [news, news, news, news, news, news];
    this.alerts = [alert, alert, alert, alert, alert, alert];
    this.display = new BehaviorSubject(this.news);
  }
}
