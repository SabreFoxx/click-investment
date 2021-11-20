import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss']
})
export class SideMenuItemComponent implements OnInit {
  active: boolean;
  @Input() link: string[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // we want to set active to true whenever our url corresponds to this nav item's name
    this.active = this.router.url == `${this.link.join('/')}` ? true : false
    // this.router.url is not reactive, so subscribe to router event for other changes
    this.router.events.pipe(filter(event => {
      return (event instanceof NavigationEnd) ? true : false
    })).subscribe(navigationEndEvent => {
      this.active = (<any>navigationEndEvent).url == `${this.link.join('/')}` ? true : false
    });
  }

}
