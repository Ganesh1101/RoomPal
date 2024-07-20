import { NgClass,JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component ,inject,OnInit} from '@angular/core';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators } from '@angular/forms';
  import intlTelInput from 'intl-tel-input';
  import moment from 'moment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private httpService = inject(HttpClient);
  registrationForm: FormGroup<{
    mobileNumber:FormControl;
    password:FormControl;
    confirmPassword:FormControl;
    fullName: FormControl;
    email: FormControl;
    dateOfBirth: FormControl;
    gender: FormControl;
    lookingForRoommate:FormControl;
    lookingForRoom:FormControl;
    preferences: FormControl;
   
  }>= new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      this.mobileNumberValidator,
    ]),
      password: new FormControl('',[Validators.required, 
     Validators.minLength(6), 
     Validators.maxLength(16)
    ]),
    confirmPassword: new FormControl ('',[ Validators.required,
      Validators.minLength(6), 
      Validators.maxLength(16)
    ]),
    fullName: new FormControl('',[Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    email: new FormControl('',[Validators.required, Validators.email]),
    dateOfBirth: new FormControl('',Validators.required),
    gender: new FormControl('', Validators.required),
    lookingForRoommate: new FormControl('', Validators.required),
    lookingForRoom: new FormControl('', Validators. required),
    preferences: new FormControl(''),
    
  
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
    const element = document.getElementById('phone');
    const inputElement = element as HTMLInputElement;
    

    if (inputElement){
      intlTelInput(inputElement,{
        initialCountry: 'in',
        separateDialCode: true,
        utilsScript:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js'
      })
    }else {
      console.error('The element is not an HTMLInputElement');
    }
  }


  onSubmit() {
    this.registrationForm.markAllAsTouched();
    console.log(this.registrationForm.value);
    

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
        password: this.registrationForm.value.password,
        confirmPassword: this.registrationForm.value.confirmPassword,
        
        
      }
      console.log(this.registrationForm.value);
      this.httpService.post('http://106.51.138.23:3001/api/auth/register',userInfo  )
      .subscribe({
        next:success=> console.info('success',success),
        error:error=> console.log('error',error)});
    }
  }
// Date = moment().format("YYYY MM DD");  

 
}