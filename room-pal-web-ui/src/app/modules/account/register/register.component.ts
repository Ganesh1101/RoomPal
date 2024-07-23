import { NgClass,JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component ,inject,OnInit} from '@angular/core';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators } from '@angular/forms';
  // import  moment from 'moment';
  @Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private http_Client = inject (HttpClient)
  registrationForm:FormGroup;
  constructor(){
    this.registrationForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        this.mobileNumberValidator
        
      ]),
      lookingForRoommate: new FormControl('', [Validators.required]),
      lookingForRoom: new FormControl('', [Validators.required]),
        // lookingForRoommate :new FormControl(false),
        // lookimgForRoom:new FormControl(false),
      preference1: new FormControl(true),
      preference2: new FormControl(false),
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
mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
  const value = new String(control.value).trim();
  if (!value) {
    return null;
  }
  if (value.length  < 10) return { minlength: true };
  if (value.length > 10) return { maxlength: true };
  return null;
}
passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (!password ||!confirmPassword) return null;  
  if (password.value!== confirmPassword.value) {
    return { passwordMismatch: true};
  }
  return null;

};


  onSubmit() {
    this.registrationForm.markAllAsTouched();
    console.log(this.registrationForm.value);
    // console.log(this.registrationForm.controls);

    if(this.registrationForm.valid)
     {
      const userInfo ={
        fullName: this.registrationForm.value.fullName,
        email: this.registrationForm.value.email,
        mobileNumber: this.registrationForm.value.mobileNumber,
        dateOfBirth: this.registrationForm.value.dateOfBirth,
        gender: this.registrationForm.value.gender,
        lookingForRoommate : this.registrationForm.value.lookingForRoommate,
        lookingForRoom: this.registrationForm.value.lookingForRoom,
        // lookingForRoommate: JSON.stringify(this.registrationForm.value.lookingForRoommate),
        // lookingForRoom: JSON.stringify(this.registrationForm.value.lookingForRoom),
        password: this.registrationForm.value.password,
        confirmPassword: this.registrationForm.value.confirmPassword,
        
        
      }
      this.http_Client.post('http://106.51.138.23:3001/api/auth/register',      userInfo      )
      .subscribe({next:success=> console.info('success',success),error:error=> console.error('error',error)});
    }
  }
  // Date = moment().format('yyyy-mm-dd')

 
}
