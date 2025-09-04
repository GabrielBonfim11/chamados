# Configuração do Firebase para o App de Chamados

Este guia explica como configurar o Firebase para o seu projeto de gerenciamento de chamados.

## 1. Criar Projeto no Firebase Console

### Passo 1: Acesse o Firebase Console
1. Vá para [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Faça login com sua conta Google
3. Clique em "Criar um projeto" ou "Add project"

### Passo 2: Configurar o Projeto
1. **Nome do projeto**: Digite um nome para seu projeto (ex: "app-chamados")
2. **Google Analytics**: Você pode habilitar ou desabilitar (opcional)
3. Clique em "Criar projeto"

### Passo 3: Adicionar App Web
1. No painel do projeto, clique no ícone da web `</>`
2. **Nome do app**: Digite um nome (ex: "App Chamados Web")
3. **Hosting**: Marque se quiser usar o Firebase Hosting (opcional)
4. Clique em "Registrar app"

### Passo 4: Copiar Configuração
Após registrar o app, você verá um código de configuração similar a este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

**IMPORTANTE**: Copie essas informações, você precisará delas no próximo passo.

## 2. Configurar Firestore Database

### Passo 1: Criar Database
1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. **Modo de segurança**: Escolha "Iniciar no modo de teste" (por enquanto)
4. **Local**: Escolha uma região próxima (ex: "southamerica-east1")
5. Clique em "Concluído"

### Passo 2: Configurar Regras de Segurança
Por enquanto, use estas regras básicas (APENAS PARA DESENVOLVIMENTO):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ ATENÇÃO**: Essas regras permitem acesso total. Para produção, configure regras mais restritivas.

### Passo 3: Criar Coleção de Chamados
1. Clique em "Iniciar coleção"
2. **ID da coleção**: Digite `chamados`
3. Clique em "Próximo"
4. **ID do documento**: Deixe "ID automático"
5. Adicione um campo de exemplo:
   - **Campo**: `titulo`
   - **Tipo**: string
   - **Valor**: "Chamado de teste"
6. Clique em "Salvar"

## 3. Configurar o Projeto Angular/Ionic

### Passo 1: Atualizar Configuração
Abra os arquivos de environment e substitua as configurações do Firebase:

**src/environments/environment.ts**:
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  }
};
```

**src/environments/environment.prod.ts**:
```typescript
export const environment = {
  production: true,
  firebase: {
    // Mesmas configurações do environment.ts
  }
};
```

### Passo 2: Testar a Conexão
1. Execute o projeto: `npm start`
2. Acesse a página de criar chamado
3. Preencha o formulário e salve
4. Verifique no Firebase Console se o chamado foi criado

## 4. Estrutura dos Dados no Firestore

O app criará documentos na coleção `chamados` com a seguinte estrutura:

```json
{
  "id": "documento_id_automatico",
  "titulo": "Título do chamado",
  "descricao": "Descrição detalhada",
  "data": "30/08/2023 14:30",
  "prioridade": "Alta|Média|Baixa",
  "status": "aberto|em_andamento|concluido|fechado",
  "solicitante": "Nome do solicitante",
  "local": "Local de trabalho",
  "contato": "Telefone ou email",
  "categoria": "TI|Elétrica|Manutenção Predial|Transporte|Outro",
  "comentarios": [
    {
      "id": 1,
      "autor": "Nome do autor",
      "texto": "Texto do comentário",
      "data": "30/08/2023 15:00"
    }
  ],
  "anexos": [
    {
      "id": 1,
      "tipo": "imagem|video",
      "nome": "nome_arquivo.jpg",
      "url": "url_do_arquivo"
    }
  ]
}
```

## 5. Próximos Passos (Opcional)

### Configurar Autenticação
1. No Firebase Console, vá em "Authentication"
2. Clique em "Começar"
3. Configure os provedores desejados (Email/senha, Google, etc.)

### Configurar Storage (para anexos)
1. No Firebase Console, vá em "Storage"
2. Clique em "Começar"
3. Configure as regras de segurança

### Configurar Hosting (para deploy)
1. No Firebase Console, vá em "Hosting"
2. Clique em "Começar"
3. Siga as instruções para fazer deploy

## 6. Comandos Úteis

```bash
# Instalar Firebase CLI (global)
npm install -g firebase-tools

# Login no Firebase
firebase login

# Inicializar Firebase no projeto
firebase init

# Deploy para produção
firebase deploy
```

## 7. Troubleshooting

### Erro de CORS
Se encontrar erros de CORS, verifique:
1. Se as configurações do Firebase estão corretas
2. Se o domínio está autorizado no Firebase Console

### Erro de Permissões
Se encontrar erros de permissão:
1. Verifique as regras do Firestore
2. Certifique-se de que a autenticação está configurada corretamente

### Dados não aparecem
1. Verifique o console do navegador para erros
2. Confirme se os dados estão sendo salvos no Firebase Console
3. Verifique se o nome da coleção está correto (`chamados`)

---

**Dica**: Mantenha suas chaves do Firebase seguras e nunca as compartilhe publicamente!