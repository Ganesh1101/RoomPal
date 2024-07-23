import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {  AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  private http_Service = inject (HttpClient)
  resetPasswordForm:FormGroup<{
    mobileNumber:FormControl;
  }> = new FormGroup({
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.mobileNumberValidator])
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
  onSubmit(){
    // if(this.resetPasswordForm.valid){
    //   console.log('Form submitted', this.resetPasswordForm.value);
    // } else {
    //   this.resetPasswordForm.markAllAsTouched();  
    // }
    this.resetPasswordForm.markAllAsTouched();
    console.log(this.resetPasswordForm.value);
    console.log(this.resetPasswordForm.controls);
    if(this.resetPasswordForm.valid){
      this.http_Service.post('http://106.51.138.23:3001/api/auth/forgotPassword',this.resetPasswordForm.value)
      .subscribe({next:success=> console.info('success',success),error:error=> console.error('error',error)});
    }

  }
  ngOnInit(): void {
    
  }
  
}
