import { LoadingFeedbackService } from 'src/services/feedback.service';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  private subscriptions = new Array<Subscription>();

  constructor(private fb: LoadingFeedbackService) { }

  ngOnInit(): void {
    this.subscriptions.push(
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
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
