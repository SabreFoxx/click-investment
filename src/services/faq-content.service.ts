import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

export class Content {
  constructor(public day, public month) { }
}

@Injectable({
  providedIn: 'root'
})
export class FaqContentService implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Content[]> {
    return Promise.resolve([
      new Content("Who are we?", "We are the best"),
      new Content("What makes us the best?", "We get it done")
    ]);
  }

  getContent(): any {
    return [
      {
        day: 'Who are we?',
        month: 'We are the best'
      },
      {
        day: 'What makes us the best?',
        month: 'We get it done'
      }
    ]
  }
}
