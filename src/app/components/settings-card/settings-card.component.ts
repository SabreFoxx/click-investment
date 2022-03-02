import { AuthStorageService } from './../../../services/auth-storage.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: ['./settings-card.component.scss']
})
export class SettingsCardComponent implements OnInit, OnDestroy {
  form: FormGroup;
  firstName: AbstractControl;
  surname: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;

  passwordForm: FormGroup;
  password: AbstractControl;
  retypePassword: AbstractControl;

  disableSubmitButton: boolean = false;
  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private fb: FormBuilder, @Inject('REGISTRATION_URL') private endpoint: string,
    private auth: AuthService, private authStore: AuthStorageService) {
    this.form = this.fb.group({
      'firstName': ['', Validators.required],
      'surname': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': ['', Validators.minLength(5)] // TODO change to currency, even in sign-up.component
    });
    this.passwordForm = this.fb.group({
      'password': ['', Validators.compose([Validators.required])],
      'retypePassword': ['', Validators.required]
    });

    this.firstName = this.form.controls['firstName'];
    this.surname = this.form.controls['surname'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.password = this.passwordForm.controls['password'];
    this.retypePassword = this.passwordForm.controls['retypePassword'];
  }

  ngOnInit(): void {
    this.authStore.currentUser
      .pipe(takeUntil(this.subscriptions))
      .subscribe(user => {
        this.firstName.setValue(user.name)
        this.email.setValue(user.email)
        this.phone.setValue(user.currency)
      });

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

  changePassword(): void { }
}
