import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidation } from 'src/adjectives/validators'; // TODO
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  firstName: AbstractControl;
  surname: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  retypePassword: AbstractControl;

  disableSubmitButton: boolean = false;

  constructor(fb: FormBuilder, @Inject('REGISTRATION_URL') private endpoint: string,
    private auth: AuthService) {
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

  submit(): void {
    this.disableSubmitButton = true;
    setTimeout(() => this.disableSubmitButton = false, 7000);
    this.auth.login(this.form.value, this.endpoint);
  }
}
