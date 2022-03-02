import {
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { passwordValidation } from 'src/adjectives/validators'; // TODO
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  form: FormGroup;
  name: AbstractControl;
  currency: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  retypePassword: AbstractControl;

  disableSubmitButton: boolean = false;
  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(fb: FormBuilder, @Inject('REGISTRATION_URL') private endpoint: string,
    private auth: AuthService) {
    this.form = fb.group({
      'name': ['', Validators.required],
      'currency': [''],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': ['', Validators.minLength(5)],
      'password': ['', Validators.compose([Validators.required])],
      'retypePassword': ['', Validators.required]
    });

    this.name = this.form.controls['name'];
    this.currency = this.form.controls['currency'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.password = this.form.controls['password'];
    this.retypePassword = this.form.controls['retypePassword'];
  }

  ngOnInit(): void {
    // every time password is retyped, check that it matches; notify if not
    this.retypePassword.valueChanges
      .pipe(takeUntil(this.subscriptions))
      .subscribe(value => {
        setTimeout(() => {
          if (this.password.value != this.retypePassword.value)
            this.retypePassword.setErrors({ "x!x": "Passwords do not match" });
        }, 1000);
        if (this.retypePassword.value != ''
          && (this.password.value == this.retypePassword.value))
          this.retypePassword.setErrors(null);
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }

  submit(): void {
    this.disableSubmitButton = true;
    setTimeout(() => this.disableSubmitButton = false, 7000);
    this.auth.login(this.form.value, this.endpoint);
  }
}
