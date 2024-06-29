// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
// import {  NgClass } from '@angular/common';

// @Component({
//   selector: 'app-set-password',
//   standalone: true,
//   imports: [ReactiveFormsModule,NgClass],
//   templateUrl: './set-password.component.html',
//   styleUrl: './set-password.component.scss'
// })
// export class SetPasswordComponent  {
//     setPassword: FormGroup<{
//       password:FormControl;
//       confirmPassword:FormControl;
//     }>= new FormGroup({
//         password: new FormControl('',[Validators.required, 
//        Validators.minLength(6),  
//         Validators.pattern(/^(?=.[A-Z])(?=.[@$!%*?&]).{6,}$/)
     
//       ]),
//       confirmPassword: new FormControl ('',[ Validators.required]),
       
    
   
//     });
//     // {validators:this.passwordMatchValidator};
    
//     passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
//       const password = control.get('password');
//       const confirmPassword = control.get('confirmPassword');
//       if (password && confirmPassword && password.value !== confirmPassword.value) {
//         return { passwordMismatch: true };
//       }
//       return null;
//     }
  
  
//     get password() {
//       return this.setPassword.get('password');
//     }
  
//     get confirmPassword() {
//       return this.setPassword.get('confirmPassword');
//     }
  
  
    
   
//     // ngOnInit(): void {
//     // }


//       onLoginClick(){
//         this.setPassword.markAllAsTouched();
//         // console.log(this.setPassword.value);

//       }  


//     
  
    



  
// }





import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports:[ReactiveFormsModule,NgClass,CommonModule],
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.[A-Z])(?=.[@$!%*?&]).{6,}$/), // At least one uppercase letter and one special character
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // Handle form submission
      console.log('Form Submitted', this.passwordForm.value);
    }
  }
}