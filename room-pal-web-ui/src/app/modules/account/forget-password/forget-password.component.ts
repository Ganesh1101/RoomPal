

import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import{Component, inject, OnInit} from '@angular/core';
import {  FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent implements OnInit {
  private httpClient=inject(HttpClient);
  forgetPasswordForm: FormGroup= new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      this.mobileNumberValidator,
    ]),
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


  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.forgetPasswordForm.markAllAsTouched();
    console.log(this.forgetPasswordForm.value);
    console.log(this.forgetPasswordForm.controls);

    if(this.forgetPasswordForm.valid){
      this.httpClient.post('http://106.51.138.23:3001/api/auth/forgotPassword', this.forgetPasswordForm.value)
      .subscribe({
        next: success => console.info('success', success),
        error : (error: any) => console.log('error', error)

      });
    }
  }

}
