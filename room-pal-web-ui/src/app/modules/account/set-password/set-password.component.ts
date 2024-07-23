import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,JsonPipe],
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  private http_client = inject (HttpClient)
  setPassword: FormGroup<{
    mobileNumber: FormControl;
    newPassword: FormControl;
    confirmPassword: FormControl;
  }>  = new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      this.mobileNumberValidator
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
      this.passwordValidator
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
      this.confirmPasswordValidator
    ])
    //  { validators: this.passwordMatchValidator as ValidatorFn });
  })

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
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
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
  // passwordMatchValidator  (formGroup: FormGroup) {
  //   const newPassword = formGroup.get('newPassword') as FormControl;
  //   const confirmPassword = formGroup.get('confirmPassword') as FormControl;
  // if(
  //   !newPassword.value 
  // )
  // return null;
  //   if ( newPassword.value !== confirmPassword.value) {
  //     formGroup.controls['confirmPassword'].setErrors({
  //       passwordMismatch: true
  //     })
  //   }
  //   return null;
  // };
  onSubmit() {
    this.setPassword.markAllAsTouched();
    console.log(this.setPassword.value);
    console.log(this.setPassword.controls);
    if(this.setPassword.valid){
      this.http_client.post('http://106.51.138.23:3001/api/auth/resetPassword',this.setPassword.value)
      .subscribe({next:success => console.info('success',success),error:error=>console.error('error',error)});
    }
  }
}
