import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {  AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-otp',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule],
  templateUrl: './validate-otp.component.html',
  styleUrl: './validate-otp.component.scss'
})
export class ValidateOtpComponent implements OnInit {
  private httpService = inject (HttpClient)
  ngOnInit(): void {
  }

  otpForm: FormGroup<{
    mobileNumber:FormControl;
    otp:FormControl;
  }> = new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      this.mobileNumberValidator
    ]),
    otp: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ])
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
onSubmit(): void {
  this.otpForm.markAllAsTouched();
  console.log(this.otpForm.value);
  console.log(this.otpForm.controls);
  if(this.otpForm.valid){
    this.httpService.post('http://106.51.138.23:3001/api/auth/verifyOTP',this.otpForm.value)
    .subscribe({next:success=> console.info('success',success),
      error:error=> console.error('error',error)});
  }
}
}
