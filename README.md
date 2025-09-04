# App de Gerenciamento de Chamados

Um aplicativo Ionic/Angular para gerenciamento de chamados de suporte técnico integrado com Firebase Firestore.

## 🚀 Funcionalidades

- ✅ Criação de chamados com formulário completo
- ✅ Listagem de chamados por status (Abertos, Em Andamento, Concluídos)
- ✅ Visualização detalhada de chamados
- ✅ Sistema de comentários
- ✅ Upload de anexos (imagens e vídeos)
- ✅ Integração com Firebase Firestore
- ✅ Interface responsiva e moderna

## 🛠️ Tecnologias Utilizadas

- **Ionic 8** - Framework para aplicações móveis
- **Angular 20** - Framework web
- **Firebase Firestore** - Banco de dados NoSQL
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Firebase

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd chamados
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o Firebase**
   - Siga as instruções detalhadas no arquivo `FIREBASE_SETUP.md`
   - Atualize as configurações nos arquivos `src/environments/environment.ts` e `src/environments/environment.prod.ts`

4. **Execute o projeto**
   ```bash
   npm start
   ```

   O aplicativo estará disponível em `http://localhost:4200`

## 🔥 Configuração do Firebase

### Passo Rápido:

1. **Crie um projeto no Firebase Console**
   - Acesse [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Clique em "Criar um projeto"
   - Siga as instruções

2. **Configure o Firestore**
   - No painel do Firebase, vá em "Firestore Database"
   - Clique em "Criar banco de dados"
   - Escolha "Iniciar no modo de teste"

3. **Obtenha as credenciais**
   - No painel do Firebase, vá em "Configurações do projeto"
   - Na seção "Seus apps", clique no ícone da web `</>`
   - Copie as configurações do Firebase

4. **Atualize os arquivos de environment**
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     firebase: {
       apiKey: "sua-api-key",
       authDomain: "seu-projeto.firebaseapp.com",
       projectId: "seu-projeto-id",
       storageBucket: "seu-projeto.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abcdef123456"
     }
   };
   ```

## 📱 Estrutura do Projeto

```
src/
├── app/
│   ├── chamados/              # Página de listagem de chamados
│   ├── criar-chamado/         # Página de criação de chamados
│   ├── chamado-detalhes/      # Página de detalhes do chamado
│   ├── services/              # Serviços (Firebase integration)
│   ├── firebase.config.ts     # Configuração do Firebase
│   └── scripts/               # Scripts utilitários
├── environments/              # Configurações de ambiente
└── assets/                    # Recursos estáticos
```

## 🗄️ Estrutura dos Dados

Os chamados são armazenados no Firestore com a seguinte estrutura:

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
  "comentarios": [...],
  "anexos": [...]
}
```

## 🚀 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm test` - Executa os testes
- `npm run lint` - Executa o linter

## 📖 Guias Adicionais

- **Configuração Detalhada do Firebase**: Consulte `FIREBASE_SETUP.md`
- **Populando Dados de Exemplo**: Use o script em `src/app/scripts/populate-firebase.ts`

## 🔒 Segurança

⚠️ **IMPORTANTE**: As regras do Firestore estão configuradas para desenvolvimento (acesso total). Para produção, configure regras mais restritivas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chamados/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique o arquivo `FIREBASE_SETUP.md` para configuração do Firebase
2. Consulte a documentação do [Ionic](https://ionicframework.com/docs)
3. Consulte a documentação do [Firebase](https://firebase.google.com/docs)

---

**Desenvolvido com ❤️ usando Ionic + Angular + Firebase**