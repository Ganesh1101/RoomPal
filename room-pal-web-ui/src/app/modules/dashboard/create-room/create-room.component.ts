// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-create-room',
//   templateUrl: './create-room.component.html',
// styleUrl: './create-room.component.scss',
// })
// export class CreateRoomComponent {
//   roomForm: FormGroup;



//   constructor(private fb: FormBuilder) {
 
//     this.roomForm = this.fb.group({
//       roomName: ['', Validators.required], 
//       description: [''],
//       capacity: ['', Validators.required],
//       whatsappLink: [''],
//       telegramLink: [''],
//       address: [''],
//       location: ['', Validators.required],
//       rent: ['', Validators.required],
//       roomImages: this.fb.array([]),
//       amenity1: [false],
//       amenity2: [false],
//       amenity3: [false],
//       amenity4: [false],
//       amenity5: [false],
//       preference1: [false],
//       preference2: [false],
//       preference3: [false],
//       preference4: [false],
//     });
//   }


//   get roomName() {
//     return this.roomForm.get('roomName');
//   }

//   get capacity() {
//     return this.roomForm.get('capacity');
//   }

//   get location() {
//     return this.roomForm.get('location');
//   }

//   get rent() {
//     return this.roomForm.get('rent');
//   }


//  onSubmit() {
//     if (this.roomForm.valid) {
   
//       console.log(this.roomForm.value); 
//     } else {
    
//     }
//   }

// }


import { JsonPipe, NgClass } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import {FormGroup,  ReactiveFormsModule, Validators,ValidationErrors, FormControl,AbstractControl, ValidatorFn } from '@angular/forms';



function  mustBecheckedValidator():ValidatorFn{
  return(control:AbstractControl):{[key:string]:any} |null=>{
    return control.value? null :{'notChecked' :{value:control.value}};
  };
}


@Component({
    selector:'app-create-room',
    standalone:true,
    imports:[ReactiveFormsModule,NgClass,JsonPipe],
    templateUrl:'./create-room.component.html',
    styleUrl:'./create-room.component.scss',
})


export class CreateRoomComponent implements OnInit{

submitted:any;
    createRoomForm: FormGroup<{
      roomName: FormControl
      description:FormControl
      capacity:FormControl
      whatsappLink:FormControl
      telegramLink:FormControl
      amenity1:FormControl
      amenity2:FormControl
      amenity3:FormControl
      address:FormControl
      location:FormControl
      roomImages:FormControl
      rent:FormControl
      preference1:FormControl
      preference2:FormControl
      preference3:FormControl}> = new FormGroup({

       roomName: new FormControl('',[Validators.required,Validators.minLength(4)]),
       
      description: new FormControl('',[Validators.required]),
      capacity: new FormControl('',[Validators.required,]),
      whatsappLink: new FormControl('',[Validators.required]),
      telegramLink: new FormControl('',),
      amenity1: new FormControl( false,mustBecheckedValidator()),
      amenity2: new FormControl(false,mustBecheckedValidator()),
      amenity3: new FormControl(false,mustBecheckedValidator()),
      address: new FormControl('',[Validators.required]),
      location: new FormControl('',[Validators.required]),
      roomImages: new FormControl('',),
      rent: new FormControl('',[Validators.required, Validators.min(0)]),
      preference1: new FormControl(false,mustBecheckedValidator()),
      preference2: new FormControl(false,mustBecheckedValidator()),
      preference3: new FormControl(false,mustBecheckedValidator()),
      });


      ngOnInit(): void {
        throw new Error('Method not implemented.');
      }

      onSubmit(){
        console.log('this.CreateRoomForm.value');
        this.createRoomForm.markAllAsTouched();
        this.submitted=this.createRoomForm.value;

      }
    
    
      };