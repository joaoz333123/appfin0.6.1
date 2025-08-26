# AppFin v0.6.1

[![Status](https://img.shields.io/badge/Status-Pronto%20para%20Produção-success)](https://github.com/appfin)
[![Versão](https://img.shields.io/badge/Versão-0.6.1-blue)](https://github.com/appfin)
[![Última Atualização](https://img.shields.io/badge/Última%20Atualização-26%2F08%2F2025-brightgreen)](https://github.com/appfin)
[![Fases Completas](https://img.shields.io/badge/Fases%20Completas-2%2F3-orange)](https://github.com/appfin)

> **Plataforma de chat com IA que processa documentos e se expande modularmente**

Uma plataforma online moderna que combina inteligência artificial avançada (Gemini 2.5 Flash) com processamento automático de documentos, oferecendo análise inteligente de dados através de uma interface conversacional intuitiva.

---

## 📊 Status do Projeto

### ✅ **Versão Atual: v0.6.1** - **PRONTO PARA PRODUÇÃO**

**Última Atualização:** 26 de Agosto de 2025  
**Commit:** 94b504e  
**Status:** ✅ Operacional com 100% dos testes passando

### 🎯 Fases Implementadas

| Fase | Status | Funcionalidades | Taxa de Sucesso |
|------|---------|-----------------|------------------|
| **Fase 1** | ✅ **Completa** | Chat básico com IA | 100% |
| **Fase 2** | ✅ **Completa** | Upload e processamento de arquivos | 100% |
| **Fase 3** | 🎯 **Planejada** | Interface dinâmica | - |

---

## 🚀 Funcionalidades

### 💬 **Chat Inteligente**
- **Gemini 2.5 Flash** integrado e funcionando
- Histórico persistente de conversas
- Contexto de conversa mantido
- Respostas em 2-4 segundos
- Interface responsiva e moderna

### 📁 **Processamento de Arquivos**
- **Upload de CSV** - Processamento automático com papaparse
- **Upload de Excel** - Suporte XLSX/XLS com conversão JSON
- **Upload de PDF** - Extração de texto para análise
- **Interface Drag & Drop** integrada ao chat
- **Análise automática** pela IA após upload
- **Storage local** com metadados persistentes

### 🔒 **Autenticação**
- **Login Google** via NextAuth
- Sessões seguras com JWT
- Proteção de rotas implementada

### 📱 **Interface**
- **Design responsivo** - Desktop e mobile
- **Tailwind CSS** para styling moderno
- **Loading states** e feedback visual
- **Tratamento de erros** amigável

---

## 🛠️ Stack Técnica

### **Framework Base**
```json
{
  "framework": "Next.js 14.2.32",
  "react": "18.3.1",
  "typescript": "5.4.5",
  "styling": "Tailwind CSS 3.4.3",
  "auth": "NextAuth 4.24.7"
}
```

### **Inteligência Artificial**
```json
{
  "provider": "Google Gemini",
  "model": "gemini-2.5-flash",
  "sdk": "@google/genai@0.2.0",
  "features": ["chat", "file-analysis", "reasoning"]
}
```

### **Processamento de Arquivos**
```json
{
  "csv": "papaparse@5.5.3",
  "excel": "xlsx@0.20.3",
  "pdf": "pdf-parse@1.1.1",
  "upload": "multer@2.0.2"
}
```

### **Justificativas Técnicas**
- **Next.js 14.2.32**: App Router para roteamento moderno e SSR
- **Gemini 2.5 Flash**: Modelo mais recente com melhor performance
- **Tailwind CSS**: Desenvolvimento rápido e design consistente
- **JSON Storage**: Simplicidade no desenvolvimento, migração fácil para produção

---

## 🚀 Instalação e Setup

### **Pré-requisitos**
- Node.js 18+ 
- NPM ou Yarn
- Chave da API Google (Gemini)
- Credenciais Google OAuth (NextAuth)

### **1. Clone o Repositório**
```bash
git clone https://github.com/seu-usuario/appfin.git
cd appfin
```

### **2. Instale as Dependências**
```bash
npm install
```

### **3. Configure as Variáveis de Ambiente**
Crie um arquivo `.env.local`:
```env
# Gemini AI
GEMINI_API_KEY=sua_chave_gemini_aqui

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu_secret_nextauth_aqui

# Google OAuth
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
```

### **4. Execute o Servidor de Desenvolvimento**
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
appfin/
├── app/                          # App Router (Next.js 14)
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/   # Autenticação
│   │   ├── chat/                 # Chat com IA
│   │   │   ├── route.ts          # Endpoint principal do chat
│   │   │   └── storage/          # Persistência do histórico
│   │   ├── upload/               # Upload de arquivos
│   │   └── files/storage/        # Metadados dos arquivos
│   ├── components/               # Componentes React
│   │   ├── ChatInterface.tsx     # Interface principal do chat
│   │   └── ClientProvider.tsx    # Provider para autenticação
│   ├── types/                    # Definições TypeScript
│   │   ├── chat.ts               # Tipos do sistema de chat
│   │   ├── fileUpload.ts         # Tipos de upload
│   │   └── pdf-parse.d.ts        # Declarações customizadas
│   ├── chat/                     # Página do chat
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página inicial
├── data/                         # Storage local
│   ├── chat-history.json         # Histórico das conversas
│   ├── file-storage.json         # Metadados dos arquivos
│   └── uploads/                  # Arquivos físicos uploadados
├── tests/                        # Scripts de teste
└── docs/                         # Documentação
```

---

## 🔌 API Routes

### **Chat com IA**
```typescript
POST /api/chat
Content-Type: application/json

{
  "message": "Sua mensagem aqui",
  "history": [/* histórico de mensagens */]
}

Response: {
  "reply": "Resposta da IA",
  "timestamp": "2025-08-26T10:00:00Z"
}
```

### **Upload de Arquivos**
```typescript
POST /api/upload
Content-Type: multipart/form-data

FormData: {
  "file": File // CSV, XLSX, PDF
}

Response: {
  "success": true,
  "fileId": "uuid",
  "processedData": {...}
}
```

### **Storage de Arquivos**
```typescript
GET /api/files/storage
Response: {
  "files": [
    {
      "id": "uuid",
      "name": "arquivo.csv",
      "type": "text/csv",
      "uploadDate": "2025-08-26T10:00:00Z",
      "processedData": {...}
    }
  ]
}
```

---

## 💻 Desenvolvimento

### **Scripts Disponíveis**
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting com ESLint
npm run type-check   # Verificação de tipos TypeScript
```

### **Como Executar Localmente**
1. Siga os passos de instalação acima
2. Execute `npm run dev`
3. Abra [http://localhost:3000](http://localhost:3000)
4. Faça login com Google
5. Comece a conversar com a IA ou uploade um arquivo

### **Build de Produção**
```bash
npm run build
npm run start
```

**Métricas do Build:**
- ✅ **Bundle Size**: 97.4 kB (otimizado)
- ✅ **Build Time**: <30 segundos
- ✅ **Zero Errors**: TypeScript e ESLint

---

## 🧪 Testes

### **Testes Automatizados Disponíveis**
- **test-fase2-simplificado.js**: Validação end-to-end completa
- **test-interface-validation.js**: Validação da interface do usuário
- **test-upload-debug.js**: Debug do sistema de upload

### **Como Executar os Testes**
```bash
# Teste completo da Fase 2
node tests/test-fase2-simplificado.js

# Teste de validação da interface
node tests/test-interface-validation.js
```

### **Resultados dos Últimos Testes (26/08/2025)**
```
✅ Chat Básico: FUNCIONANDO (100% sucesso)
✅ Upload CSV: FUNCIONANDO (papaparse OK)
✅ Upload Excel: FUNCIONANDO (xlsx OK) 
✅ Upload PDF: FUNCIONANDO (pdf-parse OK)
✅ Integração Completa: FUNCIONANDO
✅ Performance: 2.5s médio (BOA)
✅ Taxa de Sucesso Geral: 100% (5/5 componentes)
```

---

## ⚠️ Problemas Conhecidos

### 🟡 **Problemas Menores (Não-críticos)**

#### **Upload API Response**
- **Descrição**: Upload API retorna 500 em vez de 400 para requests malformados
- **Impacto**: ZERO - funcionalidade real não é afetada
- **Status**: Opcional para correção
- **Workaround**: N/A (não afeta uso normal)

#### **Warnings de Desenvolvimento**
- **ESLint**: Variáveis 'error' não usadas em catch blocks
- **Tailwind**: Warning de ES module (não afeta funcionalidade)
- **NPM**: Dependência com vulnerabilidade baixa (cookie)

### ✅ **Problemas Resolvidos**
- **Erro de hidratação React**: Resolvido com ClientProvider
- **Tailwind CSS não detectando classes**: Implementadas classes adequadas
- **Gemini respostas limitadas**: Configuração otimizada
- **Storage no lado cliente**: Migrado para API routes

---

## 🗺️ Roadmap

### **📋 Fase 3 - Interface Dinâmica** (Próxima)
- [ ] Sistema de criação de tabelas dinâmicas
- [ ] Geração de gráficos automática
- [ ] Modals e abas personalizáveis
- [ ] Persistência de layouts criados
- [ ] Comandos naturais para interface

### **🎯 Fases Futuras** (Planejadas)
- **Fase 4**: Sistema modular de extensões
- **Fase 5**: Dashboard empresarial
- **Fase 6**: Colaboração em tempo real
- **Fase 7**: Integração com APIs externas

### **💡 Funcionalidades Consideradas**
- Suporte a imagens (OCR)
- Exportação de relatórios
- Notificações push
- Modo offline
- API pública
- Webhooks

---

## 🤝 Contribuição

### **Como Contribuir**
1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### **Regras de Desenvolvimento**
- **Uma funcionalidade por vez** - Nunca múltiplas simultaneamente
- **Testes obrigatórios** - Toda nova funcionalidade deve ser testada
- **TypeScript strict** - Sem erros de tipo permitidos
- **Código simples** - Evitar over-engineering
- **Documentação atualizada** - README e comentários

### **Processo de Aprovação**
1. ✅ Todos os testes passando
2. ✅ Code review aprovado
3. ✅ Zero regressões em funcionalidades existentes
4. ✅ Documentação atualizada
5. ✅ Performance mantida ou melhorada

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

- **GitHub Issues**: [Reportar problemas](https://github.com/seu-usuario/appfin/issues)
- **Documentação**: [Wiki do projeto](https://github.com/seu-usuario/appfin/wiki)
- **Email**: contato@appfin.com

---

## 🙏 Agradecimentos

- **Google Gemini** pela API de IA
- **Vercel** pela plataforma de hosting
- **Next.js Team** pelo framework excepcional
- **Comunidade Open Source** pelas bibliotecas utilizadas

---

<div align="center">

**AppFin v0.6.1** - Construído com ❤️ usando Next.js e Gemini AI

*Última atualização: 26 de Agosto de 2025*

</div>
