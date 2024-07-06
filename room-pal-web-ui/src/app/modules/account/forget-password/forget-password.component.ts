

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-forget-password',
  standalone: true,


  imports: [ReactiveFormsModule, CommonModule],


  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})



export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup= new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email])
  })



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
    this.forgetPasswordForm.markAllAsTouched();
    console.log(this.forgetPasswordForm.value);
    console.log(this.forgetPasswordForm.controls);

  }
  resetPasswordForm:FormGroup<{
    email:FormControl;
  }> = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email])
  });
  
}
