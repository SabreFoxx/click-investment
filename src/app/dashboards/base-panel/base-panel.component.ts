import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-base-panel',
  templateUrl: './base-panel.component.html',
  styleUrls: ['./base-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasePanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
