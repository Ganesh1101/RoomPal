


// import { JsonPipe, NgClass, NgFor } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, inject, OnInit } from '@angular/core';
// import { FormArray, FormControl, AbstractControl,FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
// import {  AfterViewInit, ViewChild, ElementRef } from "@angular/core";
// import{MarkerClusterer} from "@googlemaps/markerclusterer"


// @Component({
//   selector: 'app-create-room',
//   standalone: true,
//   imports: [ReactiveFormsModule,NgClass,JsonPipe,NgFor],
//   templateUrl: './create-room.component.html',
//   styleUrls: ['./create-room.component.scss']
// })
// export class CreateRoomComponent implements AfterViewInit {
//   @ViewChild("mapContainer") gmap!: ElementRef ; // Added '!' to tell TypeScript that it will be assigned a value before it's used
//   map: google.maps.Map | undefined;
//   lat = -33.87187348896257 ;
//   lng = 151.22994696408978;

//    locations = [
//     { lat: -31.56391, lng: 147.154312 },
//     { lat: -33.718234, lng: 150.363181 },
//     { lat: -33.727111, lng: 150.371124 },
//     { lat: -33.848588, lng: 151.209834 },
//     { lat: -33.851702, lng: 151.216968 },
//     { lat: -34.671264, lng: 150.863657 },
//     { lat: -35.304724, lng: 148.662905 },
//     { lat: -36.817685, lng: 175.699196 },
//     { lat: -36.828611, lng: 175.790222 },
//     { lat: -37.75, lng: 145.116667 },
//     { lat: -37.759859, lng: 145.128708 },
//     { lat: -37.765015, lng: 145.133858 },
//     { lat: -37.770104, lng: 145.143299 },
//     { lat: -37.7737, lng: 145.145187 },
//     { lat: -37.774785, lng: 145.137978 },
//     { lat: -37.819616, lng: 144.968119 },
//     { lat: -38.330766, lng: 144.695692 },
//     { lat: -39.927193, lng: 175.053218 },
//     { lat: -41.330162, lng: 174.865694 },
//     { lat: -42.734358, lng: 147.439506 },
//     { lat: -42.734358, lng: 147.501315 },
//     { lat: -42.735258, lng: 147.438 },
//     { lat: -43.999792, lng: 170.463352 },
//   ];
//   markers = [
//     {
//       position: new google.maps.LatLng(40.73061, 73.935242),
//       title: "Marker 1"
//     },
//     {
//       position: new google.maps.LatLng(32.06485, 34.763226),
//       title: "Marker 2"
//     }
//   ];
//   //Coordinates to set the center of the map
//   coordinates = new google.maps.LatLng(this.lat, this.lng);

//   mapOptions: google.maps.MapOptions = {
//     center: this.coordinates,
//     zoom: 8,
//   };
//  //Default Marker
//  marker = new google.maps.Marker({
//   position: this.coordinates,
//   title: "Marker 1"
// });
// polygonPath: google.maps.LatLng[] = [
// new google.maps.LatLng(25.774, -80.19),
// new google.maps.LatLng(18.466, -66.118),
// new google.maps.LatLng(32.321, -64.757),
// new google.maps.LatLng(25.774, -80.19),
// ];

//   private http = inject(HttpClient)
//   CreateRoomForm: FormGroup=new FormGroup({
//     roomName:new FormControl('', Validators.required),
//     details:new FormControl('', [Validators.required, Validators.min(3), Validators.max(500)]),
//     availability:new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
//     gender:new FormControl('', Validators.required),
//     floor:new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
//     roomType:new FormControl('', Validators.required),
//     whatsappLink:new FormControl('', [Validators.required,Validators.pattern('https?://.+')]),
//     telegramLink:new FormControl('', [Validators.required,Validators.pattern('https?://.+')]),
//     wifi:new FormControl(false),
//     kitchen:new FormControl(false),
//     airCondition:new FormControl(false),
//     bathroom:new FormControl(false),
//     parking:new FormControl(false),
//     address:new FormControl('', [Validators.required ]),
//     location:new FormControl('', Validators.required),
//     images:new FormControl([], Validators.required),
//     rent:new FormControl('', [Validators.required, Validators.min(0)]),
//     preference1:new FormControl(false),
//     preference2:new FormControl(false),
//     preference3:new FormControl(false),
//     preference4:new FormControl(false)
    
//   });
//   value: number = 10;
//   options = {
//     floor: 0,
//     ceil: 10,
//     showSelectionBar: true
//   };
//   ngAfterViewInit(): void {
//     this.mapInitializer();
//   }
  

//   mapInitializer(): void {
//     this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
//     this.marker.setMap(this.map);

//     this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
//       const latLng = event.latLng;
//       if (latLng) {
//         const lat = latLng.lat();
//         const lng = latLng.lng();
//         console.log('Latitude:', lat);
//         console.log('Longitude:', lng);
        
//       }
//     });
//   }






//   ngOnInit(): void {
    
//   }
  
   

//   onSubmit() {
//     console.log(this.CreateRoomForm.controls);
//     console.log(this.CreateRoomForm.value);
//     this.CreateRoomForm.markAllAsTouched();
//     if(this.CreateRoomForm.valid){
//       const room = {
//         roomName: this.CreateRoomForm.value.roomName,
//         details: this.CreateRoomForm.value.details,
//         availability: this.CreateRoomForm.value.availability,
//         gender: this.CreateRoomForm.value.gender,
//         floor: this.CreateRoomForm.value.floor,
//         roomType: this.CreateRoomForm.value.roomType,
//         whatsappLink: this.CreateRoomForm.value.whatsappLink,
//         telegramLink: this.CreateRoomForm.value.telegramLink,
//         rent: this.CreateRoomForm.value.rent,
//         amenities: {
//           wifi: this.CreateRoomForm.value.wifi,
//           kitchen: this.CreateRoomForm.value.kitchen,
//           airCondition: this.CreateRoomForm.value.airCondition,
//           bathroom: this.CreateRoomForm.value.bathroom,
//           parking: this.CreateRoomForm.value.parking
//         }
//       }
//       this.http.post('http://106.51.138.23:3001/api/room/create',room )
//        .subscribe({
//           next: success => console.info('success', success),
//           error: error => console.log('error', error)   
//         });
//     }
//   }
  
  
// }
import { Component,inject,OnInit } from '@angular/core';
import { NgClass,JsonPipe  } from '@angular/common';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import{MarkerClusterer} from "@googlemaps/markerclusterer"


  @Component({
    selector: 'app-create-room',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, JsonPipe],
    templateUrl: './create-room.component.html',
    styleUrl: './create-room.component.scss',
  })
  export class CreateRoomComponent implements AfterViewInit  {
    @ViewChild("mapContainer") gmap!: ElementRef ; // Added '!' to tell TypeScript that it will be assigned a value before it's used
    map: google.maps.Map | undefined;
    lat = -33.87187348896257 ;
    lng = 151.22994696408978;
  
     locations = [
      { lat: -31.56391, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
      { lat: -33.727111, lng: 150.371124 },
      { lat: -33.848588, lng: 151.209834 },
      { lat: -33.851702, lng: 151.216968 },
      { lat: -34.671264, lng: 150.863657 },
      { lat: -35.304724, lng: 148.662905 },
      { lat: -36.817685, lng: 175.699196 },
      { lat: -36.828611, lng: 175.790222 },
      { lat: -37.75, lng: 145.116667 },
      { lat: -37.759859, lng: 145.128708 },
      { lat: -37.765015, lng: 145.133858 },
      { lat: -37.770104, lng: 145.143299 },
      { lat: -37.7737, lng: 145.145187 },
      { lat: -37.774785, lng: 145.137978 },
      { lat: -37.819616, lng: 144.968119 },
      { lat: -38.330766, lng: 144.695692 },
      { lat: -39.927193, lng: 175.053218 },
      { lat: -41.330162, lng: 174.865694 },
      { lat: -42.734358, lng: 147.439506 },
      { lat: -42.734358, lng: 147.501315 },
      { lat: -42.735258, lng: 147.438 },
      { lat: -43.999792, lng: 170.463352 },
    ];
  
    markers = [
      {
        position: new google.maps.LatLng(40.73061, 73.935242),
        title: "Marker 1"
      },
      {
        position: new google.maps.LatLng(32.06485, 34.763226),
        title: "Marker 2"
      }
    ];
    //Coordinates to set the center of the map
    coordinates = new google.maps.LatLng(this.lat, this.lng);
  
    mapOptions: google.maps.MapOptions = {
      center: this.coordinates,
      zoom: 8,
    };
  
    //Default Marker
    marker = new google.maps.Marker({
      position: this.coordinates,
      title: "Marker 1"
    });
polygonPath: google.maps.LatLng[] = [
  new google.maps.LatLng(25.774, -80.19),
  new google.maps.LatLng(18.466, -66.118),
  new google.maps.LatLng(32.321, -64.757),
  new google.maps.LatLng(25.774, -80.19),
];
  
    private _httpService = inject (HttpClient)
    CreateRoomForm: FormGroup<{
      roomName: FormControl;
      details: FormControl;
      availability: FormControl;
      roomType: FormControl;
      floor : FormControl;
      gender : FormControl;
      whatsappLink: FormControl;
      telegramLink: FormControl;
      wifi: FormControl;
      kitchen: FormControl;
      airCondition: FormControl;
      bathroom: FormControl;
      parking: FormControl;
      
      address: FormControl;
      location: FormControl;
      images: FormControl;
      rent: FormControl;
      preference1: FormControl;
      preference2: FormControl;
      preference3: FormControl;
      preference4: FormControl;
     
    }> = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      details: new FormControl('',[Validators.required,Validators.maxLength(500),Validators.minLength(3)] ),
      availability: new FormControl('', [Validators.required,Validators.min(1),Validators.max(5)]),
      roomType: new FormControl('', [Validators.required]),
      floor : new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      gender : new FormControl('', [Validators.required]),
      whatsappLink: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      telegramLink: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      wifi: new FormControl(false),
      kitchen: new FormControl(false),
      airCondition: new FormControl(false),
      bathroom: new FormControl(false),
      parking: new FormControl(false),
      address: new FormControl('', Validators.required),
      location: new FormControl('',Validators.required),
    images: new FormControl('', Validators.required),
      rent: new FormControl('', [Validators.required,Validators.min(0)]),
      preference1: new FormControl(true),
      preference2: new FormControl(false),
      preference3: new FormControl(false),
      preference4: new FormControl(false)          
  });
  value: number = 10;
  options = {
    floor: 0,
    ceil: 10,
    showSelectionBar: true
  };

  ngOnInit(){
  }
  ngAfterViewInit(): void {
    this.mapInitializer();
  }
  
  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;
      if (latLng) {
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
        
      }
    });
  }

  onSubmit() {
    this.CreateRoomForm.markAllAsTouched();
    console.log(this.CreateRoomForm.value);
    console.log(this.CreateRoomForm.controls);
    
    if(this.CreateRoomForm.valid){
      const roomValues ={
        roomName: this.CreateRoomForm.value.roomName,
        details: this.CreateRoomForm.value.details,
        availability: this.CreateRoomForm.value.availability,
        roomType: this.CreateRoomForm.value.roomType,
        floor : this.CreateRoomForm.value.floor,
        whatsappLink: this.CreateRoomForm.value.whatsappLink,
        telegramLink: this.CreateRoomForm.value.telegramLink,
        amenities:{
          wifi: this.CreateRoomForm.value.wifi,
        kitchen: this.CreateRoomForm.value.kitchen,
        airCondition: this.CreateRoomForm.value.airCondition,
        parking: this.CreateRoomForm.value.parking},
        gender : this.CreateRoomForm.value.gender,
        rent : this.CreateRoomForm.value.rent
      }
      this._httpService.post('http://106.51.138.23:3001/api/room/create', roomValues)
      .subscribe({next:success=> console.info('success',success),
        error:error=> console.error('error',error)});
    }
  }

}
  
  

