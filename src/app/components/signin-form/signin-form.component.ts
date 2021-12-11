import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit, AfterViewInit {
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { }

}
