import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'chamados',
    loadComponent: () => import('./chamados/chamados.page').then((m) => m.ChamadosPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'chamado-detalhes/:id',
    loadComponent: () => import('./chamado-detalhes/chamado-detalhes.page').then( m => m.ChamadoDetalhesPage)
  },
  {
    path: 'criar-chamado',
    loadComponent: () => import('./criar-chamado/criar-chamado.page').then( m => m.CriarChamadoPage)
  },
];
