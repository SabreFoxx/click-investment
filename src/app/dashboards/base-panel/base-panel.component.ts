import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-base-panel',
  templateUrl: './base-panel.component.html',
  styleUrls: ['./base-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasePanelComponent implements OnInit {
  items: Array<any>;

  disabled = false;
  compact = true;
  invertX = false;
  invertY = false;

  shown: 'native' | 'hover' | 'always' = 'native';

  constructor() { }

  setShown() {
    if (this.shown === 'native')
      this.shown = 'hover';
    else if (this.shown === 'hover')
      this.shown = 'always';
    else
      this.shown = 'native';
  }

  ngOnInit(): void {
    this.items = new Array(10);
    console.log(this.items)
  }
}
