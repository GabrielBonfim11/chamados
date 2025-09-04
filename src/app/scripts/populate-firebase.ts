import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';

// Dados de exemplo para popular o Firebase
const chamadosExemplo = [
  {
    titulo: 'Problema na rede',
    descricao: 'Internet não está funcionando em todos os computadores do setor administrativo. Já verificamos os cabos e roteadores, mas o problema persiste.',
    data: '30/08/2023 09:15',
    prioridade: 'Alta',
    status: 'aberto',
    solicitante: 'Maria Silva',
    local: 'Secretaria de Educação',
    contato: 'maria.silva@email.com',
    categoria: 'TI',
    comentarios: [
      { id: 1, autor: 'João Técnico', texto: 'Vou verificar o problema hoje à tarde.', data: '30/08/2023 10:30' },
      { id: 2, autor: 'Maria Silva', texto: 'Obrigada! Estamos sem acesso a sistemas importantes.', data: '30/08/2023 11:15' }
    ],
    anexos: [
      { id: 1, tipo: 'imagem', url: 'assets/images/exemplo-erro-rede.svg', nome: 'Erro de rede' }
    ]
  },
  {
    titulo: 'Computador não liga',
    descricao: 'O computador da recepção não está ligando. A luz de energia acende, mas a tela fica preta.',
    data: '29/08/2023 14:20',
    prioridade: 'Média',
    status: 'aberto',
    solicitante: 'Carlos Mendes',
    local: 'UBS Central',
    contato: '(11) 98765-4321',
    categoria: 'TI',
    comentarios: [],
    anexos: []
  },
  {
    titulo: 'Impressora com defeito',
    descricao: 'Impressora está com papel preso e exibe erro no painel.',
    data: '28/08/2023 11:05',
    prioridade: 'Baixa',
    status: 'em_andamento',
    solicitante: 'Ana Oliveira',
    local: 'Escola Municipal Monteiro Lobato',
    contato: 'ana.oliveira@email.com',
    categoria: 'TI',
    comentarios: [
      { id: 3, autor: 'Pedro Suporte', texto: 'Já estou a caminho para verificar o problema.', data: '28/08/2023 13:40' }
    ],
    anexos: [
      { id: 2, tipo: 'imagem', url: 'assets/images/exemplo-impressora.svg', nome: 'Impressora com defeito' }
    ]
  },
  {
    titulo: 'Atualização de sistema',
    descricao: 'Atualizar o sistema operacional de todos os computadores do laboratório de informática.',
    data: '25/08/2023 08:30',
    dataEncerramento: '27/08/2023 16:45',
    prioridade: 'Média',
    status: 'concluido',
    solicitante: 'Roberto Almeida',
    local: 'Escola Municipal Paulo Freire',
    contato: 'roberto.almeida@email.com',
    categoria: 'TI',
    comentarios: [
      { id: 4, autor: 'Equipe de TI', texto: 'Atualizações concluídas em todos os 15 computadores.', data: '27/08/2023 16:30' }
    ],
    anexos: []
  },
  {
    titulo: 'Instalação de software',
    descricao: 'Instalar pacote Office nos computadores da secretaria.',
    data: '24/08/2023 10:00',
    dataEncerramento: '24/08/2023 15:20',
    prioridade: 'Baixa',
    status: 'concluido',
    solicitante: 'Fernanda Costa',
    local: 'Secretaria de Saúde',
    contato: 'fernanda.costa@email.com',
    categoria: 'TI',
    comentarios: [],
    anexos: []
  }
];

// Função para popular o Firebase com dados de exemplo
export async function popularFirebase() {
  try {
    // Inicializar Firebase
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    
    console.log('Iniciando população do Firebase...');
    
    // Adicionar cada chamado
    for (const chamado of chamadosExemplo) {
      const docRef = await addDoc(collection(db, 'chamados'), chamado);
      console.log('Chamado adicionado com ID:', docRef.id);
    }
    
    console.log('Firebase populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular Firebase:', error);
  }
}

// Executar se chamado diretamente
if (typeof window === 'undefined') {
  popularFirebase();
}