import { Routes } from "@angular/router";


const DashboardComponent=()=>
    import('./dashboard.component').then(r=>r.DashboardComponent)

const MainComponent = ()=>
    import('./main/main.component').then(c=>c.MainComponent)

const RoomDetailsComponent=()=>
    import('./room-details/room-details.component').then(c=>c.RoomDetailsComponent)

const CreateRoomComponent=()=>
    import('./create-room/create-room.component').then(c=>c.CreateRoomComponent)

const UpdateRoomComponent=()=>
    import('./update-room/update-room.component').then(c=>c.UpdateRoomComponent)

export const routes:Routes=[
 {
    path:'',loadComponent:DashboardComponent,
    children:[
    {
        path:'',pathMatch:'full',redirectTo:'main'
    },
    { path:'main',loadComponent:MainComponent},
    { path:'room-details',loadComponent:RoomDetailsComponent},
    { path:'create-room',loadComponent:CreateRoomComponent},
    { path:'update-room',loadComponent:UpdateRoomComponent},
   
  ]
}

]