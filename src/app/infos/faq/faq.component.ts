import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  contents: Data;

  constructor(private route: ActivatedRoute) {
    route.data.subscribe(faqs => {
      this.contents = faqs.faqs;
      console.log(this.contents);
    })
  }

  ngOnInit(): void {
  }

}
