import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  disableSubmitButton: boolean = false;

  constructor(fb: FormBuilder, @Inject('LOGIN_URL') private endpoint: string,
    private auth: AuthService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit(): void { }

  submit(): void {
    this.disableSubmitButton = true;
    setTimeout(() => this.disableSubmitButton = false, 5000);
    this.auth.login(this.form.value, this.endpoint);
  }
}
