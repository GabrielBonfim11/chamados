import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonTab, IonRouterOutlet, IonFab, IonFabButton, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, timeOutline, checkmarkDoneOutline, eyeOutline, addOutline, exitOutline, add } from 'ionicons/icons';
import { ChamadosService, Chamado } from '../services/chamados.service';
import { AuthService } from '../services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.page.html',
  styleUrls: ['./chamados.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonBadge,
    IonTab,
    IonRouterOutlet,
    IonFab,
    IonFabButton,
    IonButton
  ]
})
export class ChamadosPage implements OnInit, OnDestroy {
  chamadosAbertos: Chamado[] = [];
  chamadosEmAndamento: Chamado[] = [];
  chamadosConcluidos: Chamado[] = [];
  selectedTab: string = 'abertos';
  private subscriptions: any[] = [];

  constructor(private chamadosService: ChamadosService, private authService: AuthService, private router: Router) {
    // Adiciona os ícones que serão usados
    addIcons({
      documentTextOutline,
      timeOutline,
      checkmarkDoneOutline,
      eyeOutline,
      addOutline,
      exitOutline,
      add
    });
  }

  ngOnInit() {
    this.carregarChamados();
  }

  ionViewWillEnter() {
    this.carregarChamados();
  }
  
  navegarParaDetalhes(id: string | number) {
    this.router.navigate(['/chamado-detalhes', id]);
  }
  
  navegarParaCriarChamado() {
    this.router.navigate(['/criar-chamado']);
  }

  // Carregar todos os chamados do serviço
  carregarChamados() {
    const sub1 = this.chamadosService.getChamadosPorStatus('aberto').subscribe(chamados => {
      this.chamadosAbertos = chamados;
    });

    const sub2 = this.chamadosService.getChamadosPorStatus('em_andamento').subscribe(chamados => {
      this.chamadosEmAndamento = chamados;
    });

    const sub3 = this.chamadosService.getChamadosPorStatus('concluido').subscribe(chamados => {
      this.chamadosConcluidos = chamados;
    });

    this.subscriptions.push(sub1, sub2, sub3);
  }

  // Métodos para obter chamados por status
  getChamadosAbertos() {
    return this.chamadosAbertos;
  }

  getChamadosEmAndamento() {
    return this.chamadosEmAndamento;
  }

  getChamadosConcluidos() {
    return this.chamadosConcluidos;
  }
  
  // Método para atualizar a tab selecionada
  setCurrentTab(tab: string) {
    this.selectedTab = tab;
  }
  
  // Método para obter o título baseado na tab selecionada
  getTabTitle() {
    switch(this.selectedTab) {
      case 'abertos':
        return 'Chamados Abertos';
      case 'em-andamento':
        return 'Chamados em Andamento';
      case 'concluidos':
        return 'Chamados Concluídos';
      default:
        return 'Chamados';
    }
  }

  // Método para logout
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout realizado com sucesso');
      },
      error: (error) => {
        console.error('Erro no logout:', error);
        // Mesmo com erro, redirecionar para login
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}