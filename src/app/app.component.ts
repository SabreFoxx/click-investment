import { LoadingFeedbackService } from 'src/services/feedback.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

  constructor(private fb: LoadingFeedbackService) { }

  ngOnInit(): void {
    this.fb.progressLoading.subscribe(loadProgress => {
      if (loadProgress) {
        this.progressBar.start();
        // don't load forever
        setTimeout(() => {
          this.progressBar.complete()
        }, 60 * 1000); // one minute
      }
      else
        this.progressBar.complete();
    })
  }
}
