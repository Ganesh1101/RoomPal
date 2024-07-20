import { Component, inject, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import {  NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent implements OnInit {
    private http_Client = inject(HttpClient);
    setPassword: FormGroup<{
      mobileNumber:FormControl;
      newPassword:FormControl;
      confirmPassword:FormControl;
    }>= new FormGroup({
      
      newPassword: new FormControl('',[Validators.required, 
       Validators.minLength(6), 
       Validators.maxLength(16)
      ]),
      confirmPassword: new FormControl ('',[ Validators.required,
        Validators.minLength(6), 
        Validators.maxLength(16)
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        this.mobileNumberValidator])
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


    onLoginClick() {
      this.setPassword.markAllAsTouched();
      // console.log(this.setPassword.value);
      console.log(this.setPassword.controls);

      if(this.setPassword.valid){
        this.http_Client.post('http://106.51.138.23:3001/api/auth/resetPassword',this.setPassword.value)
        .subscribe({
          next: success =>console.info('success',success),
          error: error => console.log('error', error)   
        });
      }
    
    }
    
}