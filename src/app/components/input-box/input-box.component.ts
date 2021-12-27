import { FormControl } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements AfterViewInit, OnDestroy {
  @Input() placeholder?: string;
  @Input() errorMsg?: string;
  @Input() type: string = 'text';
  @Input() validationFailed = false;
  @Input() readOnly?: boolean = false;
  @Input() control?: FormControl = null; // Couldn't use formControl as Input name
  @Output() changed = new EventEmitter();
  @ViewChild('input') private inputBox: ElementRef;
  @ViewChild('label') private boxLabel: ElementRef;
  destroyListeners = new Array(2);

  constructor(private renderer: Renderer2) {
    this.placeholder = '';
  }

  ngAfterViewInit(): void {
    this.destroyListeners[0] = this.renderer.listen(this.inputBox.nativeElement, 'focus',
      event => {
        if (!this.readOnly) {
          this.renderer.addClass(this.boxLabel.nativeElement, 'move-label');
          // $text-color: #5a5a5a; in variables.scss
          this.renderer.setStyle(this.boxLabel.nativeElement, 'color', '#5a5a5a');
        }
      });
    this.destroyListeners[1] = this.renderer.listen(this.inputBox.nativeElement, 'blur',
      event => {
        if (!this.readOnly) {
          this.renderer.removeClass(this.boxLabel.nativeElement, 'move-label');
          if (<HTMLInputElement>(this.inputBox.nativeElement).value.length)
            this.renderer.setStyle(this.boxLabel.nativeElement, 'color', 'transparent');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyListeners.forEach(f => f());
  }

  inputChanged(event): void {
    this.changed.emit(event);
  }

}
