import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/account/login/login.component';
import { SetPasswordSuccessComponent } from './modules/account/set-password-success/set-password-success.component';
import { SetPasswordFailureComponent } from './modules/account/set-password-failure/set-password-failure.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { ValidateOtpComponent } from './modules/account/validate-otp/validate-otp.component';
import { SetPasswordComponent } from './modules/account/set-password/set-password.component';
import { HomeComponent } from './modules/account/home/home.component';
import { ForgetPasswordComponent } from './modules/account/forget-password/forget-password.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent,SetPasswordSuccessComponent,SetPasswordFailureComponent,
    RegisterComponent,ValidateOtpComponent,SetPasswordComponent,HomeComponent,ForgetPasswordComponent,
    NgxSliderModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'room-pal-web-ui';

  getRegisterData(event: any) {
    console.log('app component', event);
  }
}
