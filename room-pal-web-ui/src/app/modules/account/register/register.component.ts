import { NgClass,JsonPipe } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registrationForm:FormGroup;
  constructor(){
    this.registrationForm = new FormGroup({
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      preference1: new FormControl(true),
      preference2: new FormControl(true),
      preference3: new FormControl(false),
      preference4: new FormControl(false),
      password: new FormControl('',[Validators.required, 
       Validators.minLength(6), 
       Validators.maxLength(16),
      ]),
      confirmPassword: new FormControl ('',[ Validators.required,
        Validators.minLength(6), 
        Validators.maxLength(16),
      ])
  },{validators:this.passwordMatchValidator});
}

ngOnInit(): void {}
passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password ||!confirmPassword) return null;  // form not yet initialized with controls
  if (password.value!== confirmPassword.value) {
    return { passwordMismatch: true};
  }
  return null;

};


  onSubmit() {
    this.registrationForm.markAllAsTouched();
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.controls);
  
  }

 
}
