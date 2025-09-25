import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase.config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Monitorar mudanças no estado de autenticação
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(user);
      } else {
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
      }
    });
  }

  // Método para login com Firebase Authentication
  login(email: string, password: string): Observable<boolean> {
    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      map((userCredential) => {
        // Login bem-sucedido
        console.log('Usuário logado:', userCredential.user);
        return true;
      }),
      catchError((error) => {
        console.error('Erro no login:', error);
        let errorMessage = 'Erro desconhecido';
        
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'Usuário não encontrado';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Senha incorreta';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Email inválido';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Usuário desabilitado';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
            break;
          default:
            errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
      })
    );
  }

  // Método para logout
  logout(): Observable<void> {
    return from(signOut(auth)).pipe(
      map(() => {
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        console.error('Erro no logout:', error);
        throw error;
      })
    );
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Obter usuário atual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Obter email do usuário atual
  getCurrentUserEmail(): string | null {
    const user = this.getCurrentUser();
    return user ? user.email : null;
  }
}