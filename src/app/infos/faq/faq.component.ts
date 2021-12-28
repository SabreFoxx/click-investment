import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {
  contents: Data;

  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private route: ActivatedRoute) {
    route.data
      .pipe(takeUntil(this.subscriptions))
      .subscribe(faqs => {
        this.contents = faqs.faqs;
        console.log(this.contents);
      })
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }
}
