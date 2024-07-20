


import { JsonPipe, NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, AbstractControl,FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,JsonPipe,NgFor],
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  private http = inject(HttpClient)
  CreateRoomForm: FormGroup=new FormGroup({
    roomName:new FormControl('', Validators.required),
    details:new FormControl('', [Validators.required, Validators.min(3), Validators.max(500)]),
    availability:new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    gender:new FormControl('', Validators.required),
    floor:new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
    roomType:new FormControl('', Validators.required),
    whatsappLink:new FormControl('', [Validators.required,Validators.pattern('https?://.+')]),
    telegramLink:new FormControl('', [Validators.required,Validators.pattern('https?://.+')]),
    amenity1:new FormControl(false),
    amenity2:new FormControl(false),
    amenity3:new FormControl(false),
    amenity4:new FormControl(false),
    amenity5:new FormControl(false),
    address:new FormControl('', [Validators.required ]),
    location:new FormControl('', Validators.required),
    roomImages:new FormControl([], Validators.required),
    rent:new FormControl('', [Validators.required, Validators.min(0)]),
    preference1:new FormControl(false),
    preference2:new FormControl(false),
    preference3:new FormControl(false),
    preference4:new FormControl(false)
    
  });

  ngOnInit(): void {
    
  }
  
   

  onSubmit() {
    this.CreateRoomForm.markAllAsTouched();
    if(this.CreateRoomForm.valid){
      this.http.post('http://106.51.138.23:3001/api/auth/room/create', this.CreateRoomForm.value)
       .subscribe({
          next: success => console.info('success', success),
          error: error => console.log('error', error)   
        });
    }
  }
  
  
}

  
  

