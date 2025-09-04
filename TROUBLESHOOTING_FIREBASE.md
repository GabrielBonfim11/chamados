# 🔥 Troubleshooting Firebase - Guia de Diagnóstico

Este guia ajudará você a diagnosticar e resolver problemas de conexão com o Firebase.

## 🔍 Passo 1: Verificar Logs no Console do Navegador

1. **Abra o navegador** em http://localhost:4200/
2. **Pressione F12** para abrir as ferramentas de desenvolvedor
3. **Vá na aba Console**
4. **Procure por estas mensagens:**

### ✅ Mensagens de Sucesso (Firebase funcionando):
```
🚀 Iniciando teste do Firebase...
Inicializando Firebase com config: {apiKey: "...", authDomain: "..."}
✅ Firebase inicializado com sucesso!
📝 Tentando criar documento de teste...
✅ Documento criado com sucesso! ID: abc123
✅ Firebase funcionando: Firebase está funcionando corretamente!
```

### ❌ Mensagens de Erro (problemas de configuração):
```
❌ Erro ao inicializar Firebase: FirebaseError: ...
❌ Problema com Firebase: Erro na conexão com Firebase
```

## 🛠️ Passo 2: Verificar Configurações do Firebase

### 2.1 Verificar Credenciais
Confirme se as credenciais em `src/environments/environment.ts` estão corretas:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "SUA_API_KEY_REAL",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  }
};
```

### 2.2 Verificar Firestore Database
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá em **Firestore Database**
4. Certifique-se de que o banco está **criado** e **ativo**

### 2.3 Verificar Regras de Segurança
No Firestore, vá em **Rules** e certifique-se de que as regras permitem leitura/escrita:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // APENAS PARA DESENVOLVIMENTO
    }
  }
}
```

⚠️ **IMPORTANTE**: Essas regras são apenas para desenvolvimento. Para produção, configure regras mais restritivas.

## 🧪 Passo 3: Teste Manual no Console

No console do navegador, execute:

```javascript
// Testar conexão
testarFirebase().then(resultado => {
  console.log('Resultado do teste:', resultado);
});
```

## 🔧 Passo 4: Soluções Comuns

### Problema: "Firebase não inicializado"
**Solução**: Verifique se as credenciais estão corretas no `environment.ts`

### Problema: "Permission denied"
**Solução**: Ajuste as regras do Firestore para permitir acesso

### Problema: "Project not found"
**Solução**: Verifique se o `projectId` está correto

### Problema: "Invalid API key"
**Solução**: Regenere a API key no Firebase Console

### Problema: "Quota exceeded"
**Solução**: Verifique os limites do plano gratuito do Firebase

## 📝 Passo 5: Testar Criação de Chamado

1. **Vá para a página de criar chamado**: http://localhost:4200/criar-chamado
2. **Preencha o formulário** com dados de teste
3. **Clique em "Salvar Chamado"**
4. **Verifique o console** para logs de debug
5. **Verifique o Firebase Console** se o documento foi criado

### Logs Esperados ao Criar Chamado:
```
Tentando adicionar chamado: {titulo: "...", descricao: "..."}
Salvando chamado no Firebase...
Chamado salvo no Firebase com ID: abc123def456
```

## 🚨 Passo 6: Se Ainda Não Funcionar

### Verificar Rede e Firewall
- Certifique-se de que não há bloqueios de firewall
- Teste em uma rede diferente
- Desative temporariamente antivírus/firewall

### Verificar Configuração do Projeto Firebase
1. No Firebase Console, vá em **Configurações do Projeto**
2. Na aba **Geral**, verifique se o projeto está ativo
3. Na aba **Uso**, verifique se não excedeu limites

### Recriar Configuração
1. No Firebase Console, vá em **Configurações do Projeto**
2. Na seção **Seus apps**, clique no app web
3. Copie a nova configuração
4. Substitua no `environment.ts`

## 📞 Informações para Suporte

Se o problema persistir, colete estas informações:

1. **Logs completos do console do navegador**
2. **Configuração do Firebase** (sem a API key)
3. **Regras do Firestore**
4. **Versão do navegador**
5. **Mensagens de erro específicas**

## 🎯 Teste Rápido

Execute este checklist rápido:

- [ ] Firebase Console acessível
- [ ] Projeto Firebase criado
- [ ] Firestore Database ativo
- [ ] Regras de segurança configuradas
- [ ] Credenciais copiadas corretamente
- [ ] Console do navegador sem erros
- [ ] Teste manual funcionando
- [ ] Criação de chamado funcionando

---

**Dica**: Mantenha o console do navegador aberto durante os testes para ver os logs em tempo real!