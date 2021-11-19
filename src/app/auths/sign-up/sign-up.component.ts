import { SimplePostService } from './../../../services/simple-post.service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidation } from 'src/adjectives/validators';
import { Plan } from 'src/models/plan';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, AfterViewInit {
  @ViewChildren('input') private inputBoxes: QueryList<ElementRef>;
  @ViewChildren('label') private labels: QueryList<ElementRef>;

  form: FormGroup;
  firstName: AbstractControl;
  surname: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  retypePassword: AbstractControl;

  constructor(fb: FormBuilder,
    @Inject('REGISTRATION_URL') private endpoint: string,
    private post: SimplePostService) {
    this.form = fb.group({
      'firstName': ['', Validators.required],
      'surname': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': ['', Validators.minLength(5)],
      'password': ['', Validators.compose([Validators.required])],
      'retypePassword': ['', Validators.required]
    });

    this.firstName = this.form.controls['firstName'];
    this.surname = this.form.controls['surname'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.password = this.form.controls['password'];
    this.retypePassword = this.form.controls['retypePassword'];
  }

  ngOnInit(): void {
    // every time password is retyped, check that it matches; notify if not
    this.retypePassword.valueChanges.subscribe(value => {
      setTimeout(() => {
        if (this.password.value != this.retypePassword.value)
          this.retypePassword.setErrors({ "x!x": "Passwords do not match" });
      }, 1000);
      if (this.retypePassword.value != ''
        && (this.password.value == this.retypePassword.value))
        this.retypePassword.setErrors(null);
    })
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

  submit(): void {
    this.post.send<Plan>(this.endpoint, this.form.value)
    .subscribe(() => {
      
    })
  }
}
