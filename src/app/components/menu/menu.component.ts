import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  disabled = false;
  compact = true;
  invertX = false;
  invertY = false;

  shown: 'native' | 'hover' | 'always' = 'native';

  constructor() { }

  setShown() {
    if (this.shown === 'native') {
      this.shown = 'hover';
    } else if (this.shown === 'hover') {
      this.shown = 'always';
    } else {
      this.shown = 'native';
    }
  }

  ngOnInit(): void {
  }

}
