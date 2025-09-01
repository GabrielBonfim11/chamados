import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
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
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Usar o serviço de autenticação (será integrado com Firebase)
      this.authService.login(username, password).subscribe(success => {
        if (success) {
          console.log('Login bem-sucedido');
          // Navegar para a página de chamados após login bem-sucedido
          this.router.navigate(['/chamados']);
        } else {
          console.error('Falha no login');
          // Aqui você pode adicionar lógica para mostrar mensagem de erro
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
}