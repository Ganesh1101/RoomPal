import { Component,OnInit } from '@angular/core';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { NgClass,JsonPipe  } from '@angular/common';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators, } from '@angular/forms';


  @Component({
    selector: 'app-create-room',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, JsonPipe,NgxSliderModule],
    templateUrl: './create-room.component.html',
    styleUrl: './create-room.component.scss',
  })
  export class CreateRoomComponent implements OnInit {

    CreateRoomForm: FormGroup<{
      roomName: FormControl;
      description: FormControl;
      capacity: FormControl;
      whatsappLink: FormControl;
      telegramLink: FormControl;
      amenity1: FormControl;
      amenity2: FormControl;
      amenity3: FormControl;
      amenity4: FormControl;
      amenity5: FormControl;
      address: FormControl;
      location: FormControl;
      roomImages: FormControl;
      rent: FormControl;
      preference1: FormControl;
      preference2: FormControl;
      preference3: FormControl;
      preference4: FormControl;
     
    }> = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('',[Validators.required,Validators.maxLength(500),Validators.minLength(3)] ),
      capacity: new FormControl('', [Validators.required,Validators.min(1),Validators.max(5)]),
      // whatsappLink: new FormControl('', [Validators.required, Validators.pattern('https?://(www\.?)?wa\.me/(?:join|)+[a-zA-Z0-9_-]+')]),
      // telegramLink: new FormControl('', [Validators.required, Validators.pattern('https?://t.me/(?:joinchat|messages|)+[a-zA-Z0-9_-]+')]),
      whatsappLink: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      telegramLink: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      amenity1: new FormControl(true),
      amenity2: new FormControl(true),
      amenity3: new FormControl(false),
      amenity4: new FormControl(false),
      amenity5: new FormControl(false),
      address: new FormControl('', Validators.required),
      location: new FormControl('',Validators.required),
      roomImages: new FormControl('', Validators.required),
      rent: new FormControl('', [Validators.required,Validators.min(0)]),
      preference1: new FormControl(true),
      preference2: new FormControl(false),
      preference3: new FormControl(false),
      preference4: new FormControl(false)          
  });
  value: number = 10;
  options: Options = {
    floor: 0,
    ceil: 10,
    showSelectionBar: true
  };


  ngOnInit(){
  }

  onSubmit() {
    this.CreateRoomForm.markAllAsTouched();
    console.log(this.CreateRoomForm.value);
    console.log(this.CreateRoomForm.controls);
  
  }

}





