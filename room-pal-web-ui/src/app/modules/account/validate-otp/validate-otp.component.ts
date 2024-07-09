import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-validate-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './validate-otp.component.html',
  styleUrl: './validate-otp.component.scss'
})
export class ValidateOtpComponent {
  otpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp: ['', [
        Validators.required,Validators.minLength(6)

     
      ]]
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      console.log('OTP Submitted', this.otpForm.value);
    }
  }

  resendOTP(event: Event) {
    event.preventDefault();
    console.log('Resend OTP clicked');
  }
}
