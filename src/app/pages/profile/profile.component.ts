import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private ui: UIAdjustmentService) {
    ui.setBreadcrumbs([{ url: '/app/profile', title: 'Profile' }]);
  }

  ngOnInit(): void {
  }

}
