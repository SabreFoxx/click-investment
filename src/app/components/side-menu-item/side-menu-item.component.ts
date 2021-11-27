import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, UrlSegment } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss']
})
export class SideMenuItemComponent implements OnInit {
  active: boolean;
  @Input() link: string[] = [];
  mySegment: UrlSegment;

  constructor(private router: Router) { }

  isContainsUrlSegment(segments: UrlSegment[]): boolean {
    return segments.some(s => s.path == this.mySegment.path) ? true : false;
  }

  ngOnInit(): void {
    this.mySegment = new UrlSegment(this.link[1], {});

    // on init of BasePanelComponent, which also inits this component,
    // we want to set active to true whenever our url corresponds to this nav item
    const urlStruct = this.router.parseUrl(this.router.url);
    this.active = this.isContainsUrlSegment(urlStruct.root.children['primary'].segments);

    // this.router.url is not reactive, so subscribe to router event for later navigations
    this.router.events.pipe(filter(event => {
      return (event instanceof NavigationEnd) ? true : false
    })).subscribe(navigationEndEvent => {
      const urlStruct = this.router.parseUrl((<any>navigationEndEvent).url);
      this.active = this.isContainsUrlSegment(urlStruct.root.children['primary'].segments) ?
        true : false;
    });
  }

}
