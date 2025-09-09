import { Injectable } from '@angular/core';
import { Observable, from, map, catchError, of } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, Firestore, limit } from 'firebase/firestore';
import { environment } from '../../environments/environment';

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
  id: number | string;
  titulo: string;
  descricao: string;
  data: string;
  dataEncerramento?: string;
  prioridade: string;
  status: 'aberto' | 'em_andamento' | 'concluido';
  solicitante: string;
  numero?: number;
  local: string;
  contato?: string;
  comentarios?: Comentario[];
  anexos?: Anexo[];
}

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {
  private db?: Firestore;
  private chamadosCollectionName = 'chamados';
  private numeroChamadosCollectionName = 'numeroChamado';
  
  // Dados de exemplo para os chamados (backup local)
  private chamadosBackup: Chamado[] = [
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
    },
  ];

  constructor() {
    try {
      console.log('Inicializando Firebase com config:', environment.firebase);
      const app = initializeApp(environment.firebase);
      this.db = getFirestore(app);
      console.log('Firebase inicializado com sucesso!');
    } catch (error) {
      console.error('Erro ao inicializar Firebase:', error);
      console.warn('Firebase não configurado, usando dados locais');
    }
  }

  // Obter todos os chamados
  getChamados(): Observable<Chamado[]> {
    if (!this.db) {
      return of(this.chamadosBackup);
    }
    
    return from(getDocs(collection(this.db, this.chamadosCollectionName))).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Chamado));
      }),
      catchError(error => {
        console.error('Erro ao buscar chamados:', error);
        return of(this.chamadosBackup);
      })
    );
  }

  // Obter chamados por status
  getChamadosPorStatus(status: 'aberto' | 'em_andamento' | 'concluido'): Observable<Chamado[]> {
    if (!this.db) {
      const chamadosFiltrados = this.chamadosBackup.filter(chamado => chamado.status === status);
      return of(chamadosFiltrados);
    }
    
    const q = query(collection(this.db, this.chamadosCollectionName), where('status', '==', status));
    return from(getDocs(q)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Chamado));
      }),
      catchError(error => {
        console.error('Erro ao buscar chamados por status:', error);
        const chamadosFiltrados = this.chamadosBackup.filter(chamado => chamado.status === status);
        return of(chamadosFiltrados);
      })
    );
  }

  // Obter um chamado específico por ID
  getChamadoPorId(id: string): Observable<Chamado | undefined> {
    if (!this.db) {
      const chamado = this.chamadosBackup.find(c => c.id.toString() === id);
      return of(chamado);
    }
    
    return from(getDoc(doc(this.db, this.chamadosCollectionName, id))).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          return {
            id: docSnap.id,
            ...docSnap.data()
          } as Chamado;
        }
        return undefined;
      }),
      catchError(error => {
        console.error('Erro ao buscar chamado por ID:', error);
        const chamado = this.chamadosBackup.find(c => c.id.toString() === id);
        return of(chamado);
      })
    );
  }

  // Adicionar um novo chamado
  async adicionarChamado(chamado: Omit<Chamado, 'id'>): Promise<Observable<Chamado>> {
    
    if (!this.db) {
      console.log('Firebase não disponível, salvando localmente');
      const chamadoLocal: Chamado = {
        ...chamado,
        id: this.gerarNovoId(),
      };
      this.chamadosBackup.push(chamadoLocal);
      return of(chamadoLocal);
    }

    await this.gerarNumeroChamado().then((numero => {
      chamado.numero = numero;
    }));

    await this.atualizarNumeroChamado(chamado.numero).then(res => {
          console.log('Número de chamado atualizado:', res);
        });

    return from(addDoc(collection(this.db, this.chamadosCollectionName), chamado)).pipe(
      map(docRef => {
        console.log('Chamado salvo no Firebase com ID:', docRef.id);
        const novoChamado: Chamado = {
          ...chamado,
          id: docRef.id
        };
        return novoChamado;
      }),
      catchError(error => {
        console.error('Erro ao adicionar chamado no Firebase:', error);
        // Fallback para array local
        const chamadoLocal: Chamado = {
          ...chamado,
          id: this.gerarNovoId()
        };
        this.chamadosBackup.push(chamadoLocal);
        return of(chamadoLocal);
      })
    );
  }

  // Atualizar um chamado existente
  atualizarChamado(chamado: Chamado): Observable<Chamado> {
    if (!this.db) {
      const index = this.chamadosBackup.findIndex(c => c.id === chamado.id);
      if (index !== -1) {
        this.chamadosBackup[index] = chamado;
      }
      return of(chamado);
    }
    
    return from(updateDoc(doc(this.db, this.chamadosCollectionName, chamado.id.toString()), { ...chamado })).pipe(
      map(() => chamado),
      catchError(error => {
        console.error('Erro ao atualizar chamado:', error);
        // Fallback para array local
        const index = this.chamadosBackup.findIndex(c => c.id === chamado.id);
        if (index !== -1) {
          this.chamadosBackup[index] = chamado;
        }
        return of(chamado);
      })
    );
  }

  // Excluir um chamado
  excluirChamado(id: string): Observable<boolean> {
    if (!this.db) {
      const index = this.chamadosBackup.findIndex(c => c.id.toString() === id);
      if (index !== -1) {
        this.chamadosBackup.splice(index, 1);
        return of(true);
      }
      return of(false);
    }
    
    return from(deleteDoc(doc(this.db, this.chamadosCollectionName, id))).pipe(
      map(() => true),
      catchError(error => {
        console.error('Erro ao excluir chamado:', error);
        // Fallback para array local
        const index = this.chamadosBackup.findIndex(c => c.id.toString() === id);
        if (index !== -1) {
          this.chamadosBackup.splice(index, 1);
          return of(true);
        }
        return of(false);
      })
    );
  }

  // Gerar um novo ID para um chamado (fallback local)
  private gerarNovoId(): number {
    return this.chamadosBackup.length > 0 
      ? Math.max(...this.chamadosBackup.map(c => c.id as number)) + 1 
      : 1;
  }

  async gerarNumeroChamado(): Promise<number> {
    if(!this.db){
      return 0;
    }
    const colRef = collection(this.db, 'numeroChamado');
    const q = query(colRef, limit(1));
    const snapshot = await getDocs(q);

    if(!snapshot.empty){
      const doc = snapshot.docs[0];
      const data = doc.data();
      const ultimoNumero = data['ultimo numero'];

      return ultimoNumero + 1 || 0;
    }else{
      console.log('Nenhum número de chamado encontrado');
      return 0;
    }
  }

  private atualizarNumeroChamado(numero: number | undefined): Promise<void> {
    console.log("ENTROU");
    if(!this.db){
      return Promise.resolve();
    }
    const colRef = collection(this.db, 'numeroChamado');
    const q = query(colRef, limit(1));
    return getDocs(q).then(snapshot => {
      if(!snapshot.empty){
        const doc = snapshot.docs[0];
        updateDoc(doc.ref, {
          'ultimo numero': numero ? numero : 0
        })
      }
    })
    
  }
  
  // Adicionar um comentário a um chamado existente
  adicionarComentario(chamadoId: string, autor: string, texto: string): Observable<Comentario | undefined> {
    return this.getChamadoPorId(chamadoId).pipe(
      map(chamado => {
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
          
          // Atualiza o chamado no Firebase
          this.atualizarChamado(chamado).subscribe();
          
          return novoComentario;
        }
        return undefined;
      }),
      catchError(error => {
        console.error('Erro ao adicionar comentário:', error);
        return of(undefined);
      })
    );
  }
  
  // Gerar um novo ID para um comentário
  private gerarNovoIdComentario(comentarios: Comentario[]): number {
    return comentarios.length > 0 
      ? Math.max(...comentarios.map(c => c.id)) + 1 
      : 1;
  }
}