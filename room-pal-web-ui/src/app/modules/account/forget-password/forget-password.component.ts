import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {

  resetPasswordForm:FormGroup<{
    email:FormControl;
  }> = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email])
  });
  onSubmit(){
    if(this.resetPasswordForm.valid){
      console.log('Form submitted', this.resetPasswordForm.value);
    } else {
      this.resetPasswordForm.markAllAsTouched();  
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
