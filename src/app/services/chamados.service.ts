import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  prioridade: string;
  status: 'aberto' | 'em_andamento' | 'concluido';
}

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {
  // Dados de exemplo para os chamados (serão substituídos pela integração com Firebase)
  private chamados: Chamado[] = [
    { id: 1, titulo: 'Problema na rede', descricao: 'Internet não está funcionando', data: '2023-08-30', prioridade: 'Alta', status: 'aberto' },
    { id: 2, titulo: 'Computador não liga', descricao: 'O computador da recepção não está ligando', data: '2023-08-29', prioridade: 'Média', status: 'aberto' },
    { id: 3, titulo: 'Impressora com defeito', descricao: 'Impressora está com papel preso', data: '2023-08-28', prioridade: 'Baixa', status: 'em_andamento' },
    { id: 4, titulo: 'Atualização de sistema', descricao: 'Atualizar o sistema operacional', data: '2023-08-25', prioridade: 'Média', status: 'concluido' },
    { id: 5, titulo: 'Instalação de software', descricao: 'Instalar pacote Office', data: '2023-08-24', prioridade: 'Baixa', status: 'concluido' },
  ];

  constructor() {}

  // Obter todos os chamados
  getChamados(): Observable<Chamado[]> {
    return of(this.chamados);
  }

  // Obter chamados por status
  getChamadosPorStatus(status: 'aberto' | 'em_andamento' | 'concluido'): Observable<Chamado[]> {
    const chamadosFiltrados = this.chamados.filter(chamado => chamado.status === status);
    return of(chamadosFiltrados);
  }

  // Obter um chamado específico por ID
  getChamadoPorId(id: number): Observable<Chamado | undefined> {
    const chamado = this.chamados.find(c => c.id === id);
    return of(chamado);
  }

  // Adicionar um novo chamado
  adicionarChamado(chamado: Omit<Chamado, 'id'>): Observable<Chamado> {
    const novoChamado: Chamado = {
      ...chamado,
      id: this.gerarNovoId()
    };
    this.chamados.push(novoChamado);
    return of(novoChamado);
  }

  // Atualizar um chamado existente
  atualizarChamado(chamado: Chamado): Observable<Chamado> {
    const index = this.chamados.findIndex(c => c.id === chamado.id);
    if (index !== -1) {
      this.chamados[index] = chamado;
    }
    return of(chamado);
  }

  // Excluir um chamado
  excluirChamado(id: number): Observable<boolean> {
    const index = this.chamados.findIndex(c => c.id === id);
    if (index !== -1) {
      this.chamados.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Gerar um novo ID para um chamado
  private gerarNovoId(): number {
    return this.chamados.length > 0 
      ? Math.max(...this.chamados.map(c => c.id)) + 1 
      : 1;
  }
}