import { Component } from '@angular/core';



import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-introduction-screen',
  standalone: true,

  imports: [CommonModule,ReactiveFormsModule],


  templateUrl: './introduction-screen.component.html',
  styleUrl: './introduction-screen.component.scss'
})
export class IntroductionScreenComponent {
  onNextClick() {
    console.log('Next button clicked');
  }
}
