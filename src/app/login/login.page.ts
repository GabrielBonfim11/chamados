import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    IonToast,
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showToast = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Verificar se o usuário já está logado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/chamados']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            console.log('Login bem-sucedido');
            this.router.navigate(['/chamados']);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.errorMessage = error.message || 'Erro ao fazer login. Tente novamente.';
          this.showToast = true;
          this.isLoading = false;
        }
      });
    } else {
      // Marcar todos os campos como tocados para mostrar erros de validação
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Método para obter mensagem de erro específica do campo
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return `${fieldName === 'email' ? 'Email' : 'Senha'} é obrigatório`;
      }
      if (field.errors['email']) {
        return 'Email inválido';
      }
      if (field.errors['minlength']) {
        return 'Senha deve ter pelo menos 6 caracteres';
      }
    }
    return '';
  }

  // Método para fechar o toast
  closeToast() {
    this.showToast = false;
  }
}