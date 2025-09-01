import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonTab, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextOutline, timeOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { ChamadosService, Chamado } from '../services/chamados.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
    IonRouterOutlet
  ]
})
export class ChamadosPage implements OnInit {
  chamadosAbertos: Chamado[] = [];
  chamadosEmAndamento: Chamado[] = [];
  chamadosConcluidos: Chamado[] = [];

  constructor(private chamadosService: ChamadosService) {
    // Adiciona os ícones que serão usados
    addIcons({
      documentTextOutline,
      timeOutline,
      checkmarkDoneOutline
    });
  }

  ngOnInit() {
    this.carregarChamados();
  }

  // Carregar todos os chamados do serviço
  carregarChamados() {
    this.chamadosService.getChamadosPorStatus('aberto').subscribe(chamados => {
      this.chamadosAbertos = chamados;
    });

    this.chamadosService.getChamadosPorStatus('em_andamento').subscribe(chamados => {
      this.chamadosEmAndamento = chamados;
    });

    this.chamadosService.getChamadosPorStatus('concluido').subscribe(chamados => {
      this.chamadosConcluidos = chamados;
    });
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
}