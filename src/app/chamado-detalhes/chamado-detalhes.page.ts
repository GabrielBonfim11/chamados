import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonBadge, IonList, IonTextarea, IonButton, IonIcon, IonSelect, IonSelectOption, IonChip, IonAvatar, IonImg, IonText } from '@ionic/angular/standalone';
import { ChamadosService, Chamado, Comentario } from '../services/chamados.service';
import { addIcons } from 'ionicons';
import { sendOutline, imageOutline, videocamOutline, attachOutline, timeOutline, personOutline, locationOutline, callOutline, mailOutline, alertCircleOutline, chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-chamado-detalhes',
  templateUrl: './chamado-detalhes.page.html',
  styleUrls: ['./chamado-detalhes.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonBadge,
    IonList,
    IonTextarea,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonChip,
    IonAvatar,
    IonImg,
    IonText
  ]
})
export class ChamadoDetalhesPage implements OnInit {
  chamado?: Chamado;
  chamadoId: string = '';
  novoComentario: string = '';
  statusOptions: string[] = ['aberto', 'em_andamento', 'concluido', 'fechado'];
  statusLabels: { [key: string]: string } = {
    'aberto': 'Aberto',
    'em_andamento': 'Em Andamento',
    'concluido': 'Concluído',
    'fechado': 'Fechado'
  };

  constructor(
    private route: ActivatedRoute,
    private chamadosService: ChamadosService
  ) {
    // Adiciona os ícones que serão usados
    addIcons({
      sendOutline,
      imageOutline,
      videocamOutline,
      attachOutline,
      timeOutline,
      personOutline,
      locationOutline,
      callOutline,
      mailOutline,
      alertCircleOutline,
      chevronBackOutline
    });
  }

  ngOnInit() {
    // Obtém o ID do chamado da URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.chamadoId = idParam;
        this.carregarChamado();
      }
    });
  }

  carregarChamado() {
    this.chamadosService.getChamadoPorId(this.chamadoId).subscribe(chamado => {
      if (chamado) {
        this.chamado = chamado;
      }
    });
  }

  adicionarComentario() {
    if (!this.chamado || !this.novoComentario.trim()) return;
    
    this.chamadosService.adicionarComentario(
      this.chamado.id.toString(),
      'Usuário Atual', // Em uma aplicação real, seria o usuário logado
      this.novoComentario
    ).subscribe(comentario => {
      if (comentario) {
        // Recarrega o chamado para obter os dados atualizados
        this.carregarChamado();
        this.novoComentario = '';
      }
    });
  }

  atualizarStatus(event: any) {
    if (!this.chamado) return;
    
    const novoStatus = event.detail.value;
    this.chamado.status = novoStatus;
    
    // Se o status for concluído ou fechado, adiciona a data de encerramento
    if (novoStatus === 'concluido' || novoStatus === 'fechado') {
      this.chamado.dataEncerramento = new Date().toISOString().slice(0, 16).replace('T', ' ');
    } else {
      this.chamado.dataEncerramento = undefined;
    }
    
    this.chamadosService.atualizarChamado(this.chamado).subscribe();
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'aberto': return 'danger';
      case 'em_andamento': return 'warning';
      case 'concluido': return 'success';
      case 'fechado': return 'medium';
      default: return 'medium';
    }
  }

  getPrioridadeColor(prioridade: string): string {
    switch(prioridade.toLowerCase()) {
      case 'alta': return 'danger';
      case 'média': return 'warning';
      case 'baixa': return 'success';
      default: return 'medium';
    }
  }

  private gerarIdComentario(): number {
    if (!this.chamado?.comentarios || this.chamado.comentarios.length === 0) return 1;
    return Math.max(...this.chamado.comentarios.map(c => c.id)) + 1;
  }
}
