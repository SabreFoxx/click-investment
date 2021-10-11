import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss']
})
export class SideMenuItemComponent implements OnInit {
  @Input() active: boolean;

  constructor(private snapshot: ActivatedRoute) {
    // console.log(snapshot)
  }

  ngOnInit(): void {
  }

}
