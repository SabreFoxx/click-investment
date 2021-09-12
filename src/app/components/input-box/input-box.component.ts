import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  @ViewChildren('input') private inputBox: ElementRef;
  @ViewChildren('label') private boxLabel: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.inputBox.nativeElement.addEventListener('focus', () => {
      this.boxLabel.nativeElement.classList.add('move-label');
    });
    this.inputBox.nativeElement.addEventListener('blur', () => {
      this.boxLabel.nativeElement.classList.remove('move-label');
    });
  }

}
