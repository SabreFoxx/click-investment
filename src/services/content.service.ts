import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  getContent(): any {
    return [
      {
        day: 'Monday',
        month: 'September'
      },
      {
        day: 'Tuesday',
        month: 'September'
      }
    ]
  }
}
