import { AbstractControl } from '@angular/forms';

export class FormUtils {
  static getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors || !control.touched) return '';

    if (control.hasError('required')) return 'Este campo es obligatorio.';
    if (control.hasError('email')) return 'El formato del correo no es válido.';
    if (control.hasError('minlength')) return 'La contraseña debe tener al menos 6 caracteres.';

    return 'Campo inválido.';
  }
}