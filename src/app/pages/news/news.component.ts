import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private ui: UIAdjustmentService) {
    ui.setBreadcrumbs([{ url: '/app/news', title: 'News' }]);
  }

  ngOnInit(): void {
  }

}
