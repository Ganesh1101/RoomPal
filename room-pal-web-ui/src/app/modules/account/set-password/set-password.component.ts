import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,JsonPipe],
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  setPassword: FormGroup;

  constructor() {
    this.setPassword = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ])
    }, { validators: this.passwordMatchValidator as ValidatorFn });
  }

  ngOnInit(): void {}
  passwordMatchValidator  (formGroup: FormGroup) {
    const password = formGroup.get('password') as FormControl;
    const confirmPassword = formGroup.get('confirmPassword') as FormControl;
  if(
    !password.value 
  )
  return null;
    if ( password.value !== confirmPassword.value) {
      formGroup.controls['confirmPassword'].setErrors({
        passwordMismatch: true
      })
    }
    return null;
  };
  onSubmit() {
    this.setPassword.markAllAsTouched();
    // console.log(this.loginFormGroup.value);
    // console.log(this.loginFormGroup.controls);
  }
}
