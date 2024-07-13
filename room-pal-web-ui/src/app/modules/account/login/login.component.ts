import { Component, inject } from '@angular/core'
import { JsonPipe } from '@angular/common'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { RouterLink } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { API_ENDPOINTS } from '../../../shared/config/api-end-points'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private httpClient = inject(HttpClient)

  formGroup: FormGroup<{
    mobileNumber: FormControl
    password: FormControl
  }> = new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      this.mobileNumberValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })

  mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null
    }

    const value = new String(control.value).trim()

    if (value.length < 10) return { minlength: true }
    if (value.length > 10) return { maxlength: true }
    return null
  }

  submitForm() {
    this.formGroup.markAllAsTouched()

    if (this.formGroup.valid) {
      this.httpClient
        .post(API_ENDPOINTS.AUTH_SIGN_IN.url, this.formGroup.value)
        .subscribe({
          next: success => console.info('success', success),
          error: error => console.error('error', error),
        })
    }
  }
}

/***
 * CRUD
 * C : Create,
 * R : Read
 * U : update,
 * D : delete
 */
