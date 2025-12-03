import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from '../../shared/utils/form-utils';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class AuthLoginComponent {
  private fbSvc = inject(FormBuilder);
  private navSvc = inject(Router);

  private readonly CREDENCIALES_DEMO = {
    correo: 'usuario@ups.edu.ec',
    contrasena: '123456'
  };

  authForm: FormGroup = this.fbSvc.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    recordar: [false]
  });

  campoError(field: string): string {
    return FormUtils.getErrorMessage(this.authForm.get(field));
  }

  isInvalid(field: string): boolean {
    const ctrl = this.authForm.get(field);
    return !!(ctrl && ctrl.touched && ctrl.invalid);
  }

  handleLogin(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const { correo, contrasena } = this.authForm.value;

    if (correo === this.CREDENCIALES_DEMO.correo && contrasena === this.CREDENCIALES_DEMO.contrasena) {
      this.navSvc.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
