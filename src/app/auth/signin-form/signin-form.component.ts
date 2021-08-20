import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit, AfterViewInit {
  @ViewChildren('input') private inputBoxes: QueryList<ElementRef>;
  @ViewChildren('label') private labels: QueryList<ElementRef>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.inputBoxes.forEach(box => {
      let boxLabel = this.labels.find(item => {
        return item.nativeElement.htmlFor == box.nativeElement.id
      })
      box.nativeElement.addEventListener('focus', () => {
        boxLabel.nativeElement.classList.add('move-label');
      });
      box.nativeElement.addEventListener('blur', () => {
        boxLabel.nativeElement.classList.remove('move-label');
      });
    })
  }

}
