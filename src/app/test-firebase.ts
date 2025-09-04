import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../environments/environment';

// Função para testar a conexão com o Firebase
export async function testarFirebase() {
  try {
    console.log('🔥 Testando conexão com Firebase...');
    console.log('Config:', environment.firebase);
    
    // Inicializar Firebase
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    
    console.log('✅ Firebase inicializado com sucesso!');
    
    // Testar criação de documento
    const testData = {
      titulo: 'Teste de Conexão',
      descricao: 'Este é um teste para verificar se o Firebase está funcionando',
      data: new Date().toLocaleDateString('pt-BR'),
      prioridade: 'Baixa',
      status: 'aberto',
      solicitante: 'Sistema de Teste',
      local: 'Aplicação',
      categoria: 'Teste'
    };
    
    console.log('📝 Tentando criar documento de teste...');
    const docRef = await addDoc(collection(db, 'chamados'), testData);
    console.log('✅ Documento criado com sucesso! ID:', docRef.id);
    
    return {
      success: true,
      message: 'Firebase está funcionando corretamente!',
      documentId: docRef.id
    };
    
  } catch (error) {
    console.error('❌ Erro ao testar Firebase:', error);
    return {
      success: false,
      message: 'Erro na conexão com Firebase',
      error: error
    };
  }
}

// Executar teste se chamado diretamente
if (typeof window !== 'undefined') {
  // Disponibilizar função globalmente para teste no console
  (window as any).testarFirebase = testarFirebase;
  console.log('🧪 Função testarFirebase() disponível no console do navegador');
}