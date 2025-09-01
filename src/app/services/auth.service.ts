import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {}

  // Método para login (simulado por enquanto, será integrado com Firebase)
  login(username: string, password: string): Observable<boolean> {
    // Simulação de autenticação bem-sucedida
    // Aqui será implementada a autenticação com Firebase
    this.isAuthenticatedSubject.next(true);
    return of(true);
  }

  // Método para logout
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}