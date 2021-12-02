import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private ui: UIAdjustmentService) { 
    
  }

  ngOnInit(): void {
  }

  showNotifications() {}

}
