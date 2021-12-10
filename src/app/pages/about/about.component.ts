import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private ui: UIAdjustmentService) {
    ui.setBreadcrumbs([{ url: '/app/about', title: 'About' }]);
  }

  ngOnInit(): void {
  }

}
