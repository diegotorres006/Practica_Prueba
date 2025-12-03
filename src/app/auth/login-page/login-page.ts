import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from '../../shared/utils/form-utils';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private readonly USER = { email: 'usuario@ups.edu.ec', password: '123456' };

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getError(field: string): string {
    return FormUtils.getErrorMessage(this.loginForm.get(field));
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email === this.USER.email && password === this.USER.password) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}