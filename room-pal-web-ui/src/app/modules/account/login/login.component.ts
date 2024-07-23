import { Component,inject,OnInit } from '@angular/core';
import { NgClass,JsonPipe, CommonModule  } from '@angular/common';


import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

  @Component({
      selector: 'app-login',
      standalone: true,
      imports: [ReactiveFormsModule, NgClass, JsonPipe],
      templateUrl: './login.component.html',
      styleUrl: './login.component.scss',
    })
export class LoginComponent implements OnInit {
  private httpClient = inject(HttpClient)
  loginFormGroup: FormGroup<{
    mobileNumber: FormControl;
    password: FormControl;
  }> = new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      this.mobileNumberValidator
    ]),
   password: new FormControl('',[Validators.required, 
     Validators.minLength(6), 
     this.passwordValidator,
    ])
  });


 mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = new String(control.value).trim();
    if (!value) {
      return null;
    }
    if (value.length  < 10) return { minlength: true };
    if (value.length > 10) return { maxlength: true };
    return null;
  }

 
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = new String(control.value).trim();
    if (!value) {
      return null;
    }
    if (value.length <= 1 && value.length < 6) return { minlength: true };
    if (value.length > 16) return { maxlength: true };
    return null;
  }
  ngOnInit(): void {

  }
  onLoginClick() {
    this.loginFormGroup.markAllAsTouched();
    console.log(this.loginFormGroup.value);
    console.log(this.loginFormGroup.controls);

    if(this.loginFormGroup.valid){
      this.httpClient.post('http://106.51.138.23:3001/api/auth/signIn',this.loginFormGroup.value)
      .subscribe({next:success=> console.info('success',success),error:error=> console.error('error',error)});
    }
  }
}
