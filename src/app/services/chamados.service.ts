import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Comentario {
  id: number;
  autor: string;
  texto: string;
  data: string;
}

export interface Anexo {
  id: number;
  tipo: 'imagem' | 'video';
  url: string;
  nome: string;
}

export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  dataEncerramento?: string;
  prioridade: string;
  status: 'aberto' | 'em_andamento' | 'concluido' | 'fechado';
  solicitante: string;
  local: string;
  contato?: string;
  categoria?: string;
  comentarios?: Comentario[];
  anexos?: Anexo[];
}

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {
  // Dados de exemplo para os chamados (serão substituídos pela integração com Firebase)
  private chamados: Chamado[] = [
    { 
      id: 1, 
      titulo: 'Problema na rede', 
      descricao: 'Internet não está funcionando em todos os computadores do setor administrativo. Já verificamos os cabos e roteadores, mas o problema persiste.', 
      data: '2023-08-30 09:15', 
      prioridade: 'Alta', 
      status: 'aberto',
      solicitante: 'Maria Silva',
      local: 'Secretaria de Educação',
      contato: 'maria.silva@email.com',
      categoria: 'TI',
      comentarios: [
        { id: 1, autor: 'João Técnico', texto: 'Vou verificar o problema hoje à tarde.', data: '2023-08-30 10:30' },
        { id: 2, autor: 'Maria Silva', texto: 'Obrigada! Estamos sem acesso a sistemas importantes.', data: '2023-08-30 11:15' }
      ],
      anexos: [
        { id: 1, tipo: 'imagem', url: 'assets/images/exemplo-erro-rede.svg', nome: 'Erro de rede' }
      ]
    },
    { 
      id: 2, 
      titulo: 'Computador não liga', 
      descricao: 'O computador da recepção não está ligando. A luz de energia acende, mas a tela fica preta.', 
      data: '2023-08-29 14:20', 
      prioridade: 'Média', 
      status: 'aberto',
      solicitante: 'Carlos Mendes',
      local: 'UBS Central',
      contato: '(11) 98765-4321',
      categoria: 'TI'
    },
    { 
      id: 3, 
      titulo: 'Impressora com defeito', 
      descricao: 'Impressora está com papel preso e exibe erro no painel.', 
      data: '2023-08-28 11:05', 
      prioridade: 'Baixa', 
      status: 'em_andamento',
      solicitante: 'Ana Oliveira',
      local: 'Escola Municipal Monteiro Lobato',
      contato: 'ana.oliveira@email.com',
      categoria: 'TI',
      comentarios: [
        { id: 3, autor: 'Pedro Suporte', texto: 'Já estou a caminho para verificar o problema.', data: '2023-08-28 13:40' }
      ],
      anexos: [
        { id: 2, tipo: 'imagem', url: 'assets/images/exemplo-impressora.svg', nome: 'Impressora com defeito' }
      ]
    },
    { 
      id: 4, 
      titulo: 'Atualização de sistema', 
      descricao: 'Atualizar o sistema operacional de todos os computadores do laboratório de informática.', 
      data: '2023-08-25 08:30', 
      dataEncerramento: '2023-08-27 16:45',
      prioridade: 'Média', 
      status: 'concluido',
      solicitante: 'Roberto Almeida',
      local: 'Escola Municipal Paulo Freire',
      contato: 'roberto.almeida@email.com',
      categoria: 'TI',
      comentarios: [
        { id: 4, autor: 'Equipe de TI', texto: 'Atualizações concluídas em todos os 15 computadores.', data: '2023-08-27 16:30' }
      ]
    },
    { 
      id: 5, 
      titulo: 'Instalação de software', 
      descricao: 'Instalar pacote Office nos computadores da secretaria.', 
      data: '2023-08-24 10:00', 
      dataEncerramento: '2023-08-24 15:20',
      prioridade: 'Baixa', 
      status: 'concluido',
      solicitante: 'Fernanda Costa',
      local: 'Secretaria de Saúde',
      contato: 'fernanda.costa@email.com',
      categoria: 'TI'
    },
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
  
  // Adicionar um comentário a um chamado existente
  adicionarComentario(chamadoId: number, autor: string, texto: string): Observable<Comentario | undefined> {
    const chamado = this.chamados.find(c => c.id === chamadoId);
    
    if (chamado) {
      // Inicializa o array de comentários se não existir
      if (!chamado.comentarios) {
        chamado.comentarios = [];
      }
      
      // Cria o novo comentário
      const novoComentario: Comentario = {
        id: this.gerarNovoIdComentario(chamado.comentarios),
        autor,
        texto,
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      
      // Adiciona o comentário ao chamado
      chamado.comentarios.push(novoComentario);
      
      return of(novoComentario);
    }
    
    return of(undefined);
  }
  
  // Gerar um novo ID para um comentário
  private gerarNovoIdComentario(comentarios: Comentario[]): number {
    return comentarios.length > 0 
      ? Math.max(...comentarios.map(c => c.id)) + 1 
      : 1;
  }
}