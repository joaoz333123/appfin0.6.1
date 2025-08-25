# Manual Completo: AppFin - Desenvolvimento com IA Controlada

---

O que está incluído:
✅ Especificação completa do AppFin - o que é, funcionalidades, arquitetura
✅ Como verificar versões manualmente - processo passo a passo
✅ Desenvolvimento em fases controladas - prompts prontos para cada fase
✅ Controle rígido de dependências - como evitar problemas de versão
✅ Prompts de emergência - para todas situações que podem dar errado
✅ Sinais de alerta - como identificar quando IA está desviando
✅ Troubleshooting completo - soluções para problemas comuns
✅ Checklist e metodologia - controle sistemático do processo

Como usar este manual:
Antes de começar:

Seção 2 - Verifique todas as versões manualmente com João
Seção 10 - Use o "Prompt Master de Início"
Seção 12 - Complete o "Checklist Master"

Durante desenvolvimento:

Seção 4 - Siga as fases na ordem exata
Seção 5 - Use templates de prompts conforme necessário
Seção 6 - Fique atento aos sinais de alerta

Se algo der errado:

Seção 8 - Use comandos de emergência
Seção 11 - Consulte troubleshooting
Seção 5 - Aplique prompts de controle


# SEÇÃO 1: VISÃO COMPLETA DO PRODUTO

## O que é o AppFin v0.6

O AppFin é uma plataforma online que combina inteligência artificial avançada com um ambiente de trabalho adaptativo e modular. A experiência começa com uma interface de chat intuitiva, mas se expande dinamicamente para um ecossistema completo de ferramentas de análise de dados e processos empresariais criados sob demanda.

A plataforma utiliza uma arquitetura modular que permite crescimento controlado e seguro, onde novas funcionalidades são desenvolvidas através de um processo estruturado de análise de requisitos conduzido por IA, seguido de implementação técnica profissional que mantém a integridade e consistência do sistema base.

## Funcionalidades Principais

### Interface Conversacional e Análise Inteligente
A tela inicial apresenta um chat de IA limpo e intuitivo, onde usuários podem solicitar análises, enviar arquivos e criar visualizações através de linguagem natural. A IA processa planilhas CSV e Excel, PDFs, imagens e outros documentos, identificando inconsistências nos dados e fornecendo insights acionáveis através de resumos, explicações e planos de ação.

### Sistema de Interface Dinâmica
O AppFin implementa um sistema de interface adaptativa baseado em configuração, onde modificações solicitadas pelos usuários são aplicadas como camadas de personalização sobre o código base original. Quando um usuário solicita mudanças na interface através do chat, essas alterações são implementadas via sistema de configuração JSON, garantindo que o código fonte permaneça intacto e estável.

### Criação de Visualizações e Espaços de Trabalho
A plataforma permite transformação de dados brutos em tabelas interativas e gráficos através de comandos naturais. Usuários podem criar abas e janelas personalizadas organizadas por projeto ou funcionalidade, como "Relatório Mensal" ou "Análise de Custos", com persistência automática do ambiente de trabalho completo entre sessões e dispositivos.

### Sistema Modular de Desenvolvimento de Ferramentas
O diferencial técnico do AppFin reside em seu sistema modular para desenvolvimento de novas funcionalidades. Quando usuários solicitam ferramentas complexas como "sistema de aprovação de compras" ou "controle de estoque", a IA conduz uma sessão estruturada de análise de requisitos, explorando todas as necessidades através de perguntas direcionadas sobre fluxos de trabalho, regras de negócio, permissões e integrações necessárias.

Ao final desta sessão, a IA gera um relatório técnico completo contendo especificações detalhadas, diagramas de fluxo, definições de campos de dados, regras de validação e wireframes da interface proposta. Este relatório serve como blueprint para desenvolvimento profissional da funcionalidade, que é então integrada ao sistema através da arquitetura modular preparada para receber novas extensões.

### Gestão Centralizada de Dados e Processos
Todos os arquivos, anotações, relatórios e ferramentas desenvolvidas são centralizados em um ambiente único acessível pela equipe. A plataforma oferece pesquisa web integrada para enriquecimento de análises e geração automatizada de rascunhos de relatórios e documentos, acelerando significativamente a produção de materiais corporativos.

## Arquitetura Técnica

### Stack Tecnológica
A plataforma é construída utilizando Next.js com App Router e TypeScript como framework principal, proporcionando type safety e rotas dinâmicas ideais para o sistema modular. A interface utiliza Tailwind CSS combinado com componentes shadcn/ui para garantir consistência visual e acessibilidade.

A autenticação é implementada através de NextAuth com integração Google utilizando JWT sem necessidade de banco de dados tradicional. O sistema de storage é diferenciado por ambiente, utilizando arquivos JSON locais durante desenvolvimento e Vercel Blob ou KV em produção, mantendo simplicidade e confiabilidade sem complexidade de SQL.

### Integração com Inteligência Artificial
A IA é baseada em Gemini 2.5 Flash Lite com capacidades de reasoning, Files API, streaming e ferramentas customizadas para leitura e escrita no storage, além de web fetch para pesquisas externas. O processamento de dados utiliza bibliotecas especializadas como papaparse para CSV e xlsx para planilhas Excel, com visualizações geradas através de vega-lite ou echarts.

### Sistema de Interface Dinâmica via DSL JSON
A funcionalidade de interface dinâmica é implementada através de um Domain Specific Language baseado em JSON, onde a IA cria "abas e páginas virtuais" renderizadas como popups modais. Este DSL suporta widgets diversos incluindo markdown, tabelas, gráficos, imagens, previews de documentos e blocos de código, com todas as configurações persistidas no storage para manutenção de estado entre sessões.

### Arquitetura Modular para Extensões
O sistema modular é implementado através de um registry de módulos baseado em schemas TypeScript que definem estrutura, permissões, interface e lógica de cada ferramenta. Cada módulo registra automaticamente suas rotas no Next.js App Router e seus componentes no sistema de renderização, utilizando o DSL JSON existente como base para interface.

O storage modular utiliza namespaces específicos no Vercel KV, garantindo isolamento de dados entre diferentes ferramentas. Módulos acessam funcionalidades do sistema base através de uma API padronizada que fornece operações de storage, notificações, workflows e integração com Gemini, mantendo consistência e simplicidade de desenvolvimento.

### Sistema de Hooks e Componentes Reutilizáveis
A arquitetura prevê componentes base reutilizáveis construídos com shadcn/ui, incluindo formulários genéricos, tabelas de dados, workflows de aprovação e dashboards configuráveis. Estes componentes são consumidos pelos módulos através de um sistema de hooks que abstrai complexidades técnicas, permitindo que novas funcionalidades sejam implementadas focando apenas na lógica específica de negócio.

## Processo de Desenvolvimento de Novas Funcionalidades

### Análise de Requisitos Conduzida por IA
Quando usuários solicitam novas ferramentas, a IA inicia um processo estruturado de descoberta de requisitos utilizando base de conhecimento sobre diferentes tipos de sistemas empresariais. A IA conduz entrevistas detalhadas explorando todos os aspectos necessários incluindo fluxos de trabalho, regras de negócio, integrações, permissões e requisitos de interface.

### Geração de Especificação Técnica
O resultado da análise é um relatório técnico completo contendo especificações detalhadas em formato estruturado, diagramas de fluxo de trabalho, definição de papéis e permissões, esquemas de dados necessários, regras de validação e mockups de interface. Este documento serve como blueprint completo para implementação profissional.

### Implementação Modular
O desenvolvimento da nova funcionalidade utiliza a infraestrutura modular preparada, reutilizando componentes existentes e seguindo padrões estabelecidos. A implementação típica envolve criação do schema do módulo, configuração de rotas dinâmicas, implementação de lógica específica e registro no sistema modular, resultando em funcionalidade completamente integrada disponível para todos os usuários.

### Integração Automática
Uma vez implementado, o módulo fica automaticamente disponível através da interface de chat e menus da aplicação, mantendo consistência visual e comportamental com o resto da plataforma. O sistema de permissões controla acesso apropriado e todas as funcionalidades base como notificações, storage e integração com IA ficam imediatamente disponíveis para o novo módulo.

## Benefícios da Arquitetura Proposta

### Escalabilidade Controlada
A arquitetura modular permite crescimento da plataforma sem comprometimento de estabilidade ou performance. Cada nova funcionalidade utiliza componentes testados e padrões estabelecidos, minimizando riscos de bugs e problemas de integração.

### Desenvolvimento Eficiente
Após implementação da infraestrutura base, novas funcionalidades podem ser desenvolvidas em questão de dias ao invés de semanas, utilizando componentes reutilizáveis e seguindo padrões estabelecidos. O processo de análise de requisitos conduzido por IA garante especificações completas e precisas.

### Manutenção Simplificada
Atualizações no sistema base beneficiam automaticamente todos os módulos, e a padronização de componentes facilita manutenção e evolução da plataforma. O isolamento entre módulos previne que problemas em uma funcionalidade afetem outras partes do sistema.

### Experiência do Usuário Consistente
Todos os módulos mantêm aparência e comportamento consistentes, utilizando os mesmos padrões de interface e fluxos de interação. A integração com o sistema de chat permite acesso natural a todas as funcionalidades através de linguagem conversacional.

---

# SEÇÃO 2: COMO VERIFICAR VERSÕES DE DEPENDÊNCIAS (JOÃO FAZ ISSO)

## ANTES DE COMEÇAR QUALQUER DESENVOLVIMENTO

### Passo a Passo para Verificar Versões Corretas

**OBRIGATÓRIO: Faça esta verificação manual antes de começar:**

#### 1. Next.js
- **Site:** nextjs.org/docs
- **Procure por:** "Stable" ou versão sem "beta/rc"
- **Evite:** Latest se for muito recente (menos de 2 meses)
- **Escolha:** Última versão da série anterior à latest (ex: se latest é 15.x, use última 14.x)

#### 2. React
- **Site:** react.dev 
- **Procure por:** Version sem "experimental" ou "canary"
- **Regra:** Use versão que o Next.js recomenda na documentação

#### 3. TypeScript
- **Site:** typescriptlang.org
- **Procure por:** "Stable" release
- **Evite:** Versões beta ou nightly

#### 4. Tailwind CSS
- **Site:** tailwindcss.com
- **Procure por:** Latest stable (geralmente seguro atualizar)

#### 5. NextAuth
- **Site:** next-auth.js.org
- **Procure por:** Versão estável sem "beta"

#### 6. Outras Dependências
- **GitHub:** github.com/[biblioteca]/releases
- **NPM:** npmjs.com/package/[nome]
- **Procure por:** Tags "stable", "LTS", ou sem "alpha/beta"

### Template de Checklist de Verificação

```
DATA DA VERIFICAÇÃO: 23/08/2025

✅ Next.js: versão 14.2.32 (fonte: nextjs.org)
✅ React: versão 18.3.1 (fonte: react.dev)
✅ TypeScript: versão 5.4.5 (fonte: typescriptlang.org)
✅ Tailwind: versão 3.4.3 (fonte: tailwindcss.com)
✅ NextAuth: versão 4.24.7 (fonte: npmjs.com / next‑aut)

STACK VALIDADA MANUALMENTE ✓
```

## REGRAS FUNDAMENTAIS SOBRE VERSÕES

### QUANDO (E SE) ATUALIZAR VERSÕES

#### Critérios ÚNICOS para Mudança de Stack:

```
✅ MUDE APENAS SE:
1. Vulnerabilidade CRÍTICA que afeta produção
2. Dependência foi descontinuada (deprecated)
3. Impossível implementar funcionalidade core sem atualização
4. Projeto está 100% funcional e você quer "modernizar"

❌ NUNCA MUDE POR:
- Warnings do Git/NPM
- "Versão mais recente disponível"  
- "Melhor performance"
- "Recursos mais novos"
- Sugestões da IA
```

### Processo para Mudança (SE necessário):

```
MUDANÇA DE VERSÃO - PROTOCOLO DE EMERGÊNCIA

1. BACKUP COMPLETO do código funcionando
2. Criar branch específica para teste
3. Atualizar UMA dependência por vez
4. Testar TODA funcionalidade após cada mudança
5. Se algo quebrar: ROLLBACK IMEDIATO
6. Só fazer merge se TUDO funcionar igual


```

---

# SEÇÃO 3: PRINCÍPIOS FUNDAMENTAIS PARA CONTROLAR A IA

## Regra de Ouro: Uma Funcionalidade Por Vez
- **NUNCA** execute várias funcionalidades simultaneamente
- Complete 100% de uma feature antes de partir para outra
- Teste completamente antes de avançar

## O João é o Scrum Master da IA
- Define sprints claros e pequenos
- Mantem backlog priorizado
- Valida checkpoint a cada entrega

## Controle Rígido de Dependências

### Prompt de Controle de Dependências

**Use SEMPRE este prompt quando IA sugerir mudanças em dependências:**

```
PARE. NÃO mude dependências sem minha aprovação.

STACK OFICIAL DO APPFIN:
[Use as versões que João validou manualmente]

REGRAS RÍGIDAS:
1. NUNCA mude versões existentes
2. NUNCA sugira "atualizações"
3. Se precisar de nova dependência, me pergunte ANTES
4. Ignore warnings de versão - eu decido quando atualizar
5. Use sempre --save-exact ao instalar

FORMATO para nova dependência:
"Preciso adicionar [NOME] versão [VERSÃO ESPECÍFICA] para [FUNCIONALIDADE]. 
Posso proceder?"

Se encontrar "vulnerabilidade", me informe mas NÃO mude nada automaticamente.
```

---

# SEÇÃO 4: DESENVOLVIMENTO EM FASES CONTROLADAS

## FASE 0: Setup Básico (1-2 dias)
**Objetivo**: Projeto roda sem erros, login funciona

### Prompt para Cursor:
```
Sou gerente de projetos criando AppFin. NÃO sou desenvolvedor experiente.

STACK VERIFICADA MANUALMENTE:
	Next.js: versão 14.2.32 (fonte: nextjs.org)
	React: versão 18.3.1 (fonte: react.dev)
	TypeScript: versão 5.4.5 (fonte: typescriptlang.org)
	Tailwind: versão 3.4.3 (fonte: tailwindcss.com)
	NextAuth: versão 4.24.7 (fonte: npmjs.com / next‑aut)

REGRAS FUNDAMENTAIS que o **cursor DEVE seguir**:
1. Use EXATAMENTE as versões que especifiquei - NUNCA mude
2. Implemente apenas o que eu pedir especificamente
3. Sempre pergunte antes de adicionar funcionalidades extras
4. Mantenha código simples e bem documentado
5. Não use padrões complexos sem necessidade

TAREFA ESPECÍFICA: Setup inicial apenas
- Criar projeto Next.js com TypeScript
- Configurar Tailwind CSS  
- Implementar login Google (NextAuth)
- Página inicial simples com "Hello World"

RESTRIÇÕES RÍGIDAS:
- Use EXATAMENTE as versões que especifiquei
- NÃO adicione outras dependências sem perguntar
- NÃO implemente chat ainda
- Código deve ser simples e bem comentado

CRITÉRIOS DE ACEITAÇÃO:
- [ ] npm run dev funciona sem erros
- [ ] Login com Google funciona
- [ ] Página inicial carrega
- [ ] Todas dependências instaladas com --save-exact

IMPORTANTE: Se precisar de nova dependência, use o formato:
"Preciso adicionar [NOME] versão [VERSÃO] para [FUNCIONALIDADE]. Posso proceder?"

Confirme que vai usar exatamente essas versões antes de começar.
```

## FASE 1: Chat Básico (2-3 dias)
**Objetivo**: Conversa com IA funcionando

### Prompt para Cursor:
```
CONTEXTO: Setup básico funcionando perfeitamente. NÃO modifique nada do setup existente.

TAREFA ESPECÍFICA: Adicionar chat com IA
- Interface de chat limpa
- Integração com Gemini 2.5 Flash Lite
- Salvar histórico localmente (JSON)
- Enviar/receber mensagens

DEPENDÊNCIAS NECESSÁRIAS (confirme antes de instalar):
- Para Gemini API: qual biblioteca específica precisa?

RESTRIÇÕES RÍGIDAS:
- NÃO modifique setup existente
- NÃO adicione upload de arquivos ainda  
- NÃO adicione novas dependências sem confirmar comigo primeiro
- Mantenha storage simples (arquivos JSON)
- Código deve ser simples e direto

FORMATO para nova dependência:
"Preciso adicionar [NOME] versão [VERSÃO] para [FUNCIONALIDADE]. Posso?"

CRITÉRIOS DE ACEITAÇÃO:
- [ ] Usuário digita e recebe resposta da IA
- [ ] Histórico é salvo e carregado
- [ ] Interface responsiva
- [ ] Tratamento básico de erros
- [ ] Setup da Fase 0 continua funcionando 100%

Foque APENAS no chat básico. Confirme dependências antes de instalar.
```

## FASE 2: Upload de Arquivos (3-4 dias)
**Objetivo**: IA analisa documentos enviados

### Prompt para Cursor:
```
CONTEXTO: Chat básico funcionando 100%. NÃO modifique funcionalidades existentes.

TAREFA ESPECÍFICA: Adicionar upload de arquivos
- Interface para upload (drag & drop ou botão)
- Suporte para CSV, Excel, PDF
- IA consegue ler conteúdo dos arquivos
- Resposta inclui análise dos dados

DEPENDÊNCIAS NECESSÁRIAS (confirme cada uma antes de instalar):
- papaparse para CSV: qual versão específica?
- xlsx para Excel: qual versão específica?
- para PDF (se necessário): qual biblioteca e versão?

RESTRIÇÕES RÍGIDAS:
- NÃO modifique chat existente
- NÃO adicione visualizações ainda (apenas análise textual)
- Storage continua simples (JSON local)
- Uma funcionalidade por vez

FORMATO obrigatório para dependências:
"Preciso adicionar [NOME] versão [VERSÃO] para [FUNCIONALIDADE]. Posso proceder?"

CRITÉRIOS DE ACEITAÇÃO:
- [ ] Upload de arquivos funciona
- [ ] IA lê CSV/Excel corretamente
- [ ] Análise textual dos dados
- [ ] Arquivos são armazenados
- [ ] Chat básico continua funcionando 100%

Confirme TODAS as dependências antes de instalar qualquer coisa.
```

## FASE 3: Interface Dinâmica (4-5 dias)
**Objetivo**: IA cria tabelas/gráficos sob demanda

### Prompt para Cursor:
```
CONTEXTO: Chat + upload funcionando perfeitamente. NÃO modifique funcionalidades existentes.

TAREFA ESPECÍFICA: Sistema de interface dinâmica
- IA pode criar modals/abas através de JSON
- Suporte a tabelas, gráficos simples, markdown
- Comandos como "criar tabela com dados" funcionam
- Interfaces criadas são salvas

EXEMPLO DE JSON que IA deve gerar:
{
  "type": "modal",
  "title": "Análise",
  "widgets": [
    {"type": "markdown", "content": "# Relatório"},
    {"type": "table", "data": [...]}
  ]
}

DEPENDÊNCIAS NECESSÁRIAS (confirme antes de instalar):
- Para gráficos: qual biblioteca simples você recomenda e que versão?
- Para modals: precisa de biblioteca específica?

RESTRIÇÕES RÍGIDAS:
- NÃO complique o sistema
- Use biblioteca SIMPLES para gráficos
- Mantenha JSON estrutura simples
- Foque na funcionalidade básica
- NÃO modifique chat e upload existentes

FORMATO obrigatório:
"Preciso adicionar [NOME] versão [VERSÃO] para [FUNCIONALIDADE]. Posso proceder?"

CRITÉRIOS DE ACEITAÇÃO:
- [ ] IA gera JSON válido
- [ ] JSON é renderizado corretamente
- [ ] Interfaces são persistidas
- [ ] Comandos naturais funcionam
- [ ] Todas funcionalidades anteriores continuam funcionando

Mostre exemplo do JSON antes de implementar. Confirme dependências.
```

## FASE 4+: Módulos Específicos
**Desenvolvimento de ferramentas empresariais específicas conforme demanda**

---

# SEÇÃO 5: TEMPLATES DE PROMPTS DE CONTROLE

## Prompts de Emergência

### Quando IA Complica Demais
```
PARE. Você está over-engineering.

PROBLEMA: [descreva o que está complicado]

SOLUÇÃO SIMPLES OBRIGATÓRIA: 
- Implemente da forma mais básica possível
- Máximo 3 arquivos novos
- Sem abstrações complexas
- Código direto e funcional
- Sem padrões de design desnecessários

RESTRIÇÕES:
- NÃO use MVC, Repository, ou padrões complexos
- NÃO crie estruturas de pastas elaboradas
- NÃO adicione dependências extras

Mostre a abordagem simples primeiro, depois implemente.
```

### Quando IA Quer Mudar Versões
```
NÃO mude versões. PONTO FINAL.

A stack atual funciona perfeitamente. Ignore todos os warnings de "versão desatualizada".

Se há problema REAL de compatibilidade:
1. Me explique exatamente qual o problema específico
2. Me mostre o erro exato que aparece
3. Prove que é impossível resolver sem mudar versão
4. Aguarde minha decisão final

NUNCA "corrija" ou "atualize" versões por conta própria.
Prefira sempre encontrar alternativa que funcione com stack atual.
```

### Para Debug de Problemas
```
MODO DEBUG ATIVADO:

PROCESSO OBRIGATÓRIO:
1. Qual funcionalidade específica parou de funcionar?
2. Que erro EXATO aparece (copie mensagem completa)?
3. O que foi mudado desde a última versão funcionando?
4. Como voltar ao estado anterior funcionando?

REGRA RÍGIDA: 
- Corrija APENAS o problema específico
- NÃO "melhore" código que está funcionando
- NÃO refatore durante correção de bug
- NÃO adicione funcionalidades "aproveitando que está mexendo"

Foque exclusivamente em fazer voltar a funcionar.
```

### Para Validação de Nova Feature
```
Antes de implementar qualquer coisa, preciso validar.

FEATURE SOLICITADA: [descrição específica]

RESPONDA OBRIGATORIAMENTE:
1. Quais arquivos exatamente serão criados/modificados?
2. Que dependências novas são necessárias (nome e versão específica)?
3. Como você vai testar que funciona?
4. Como garantir que não quebra funcionalidades existentes?
5. Qual a abordagem mais simples possível?
6. Quantas horas estima para implementar?

SÓ IMPLEMENTE após minha aprovação explícita do plano.
```

## Prompts de Controle Durante Desenvolvimento

### Quando IA Desvia do Objetivo
```
PARE. Você está se desviando do objetivo original.

PROBLEMA: [descrever o desvio observado]

VOLTE EXATAMENTE PARA: [especificar tarefa original]

FOQUE APENAS EM: [detalhar exatamente o que deve fazer]

NÃO FAÇA:
- [listar especificamente o que deve evitar]
- Não adicione funcionalidades extras
- Não "melhore" código funcionando
- Não mude arquivos não relacionados à tarefa

Confirme que entendeu e mostre como vai proceder.
```

### Para Adicionar Nova Dependência
```
Antes de adicionar [NOME DA DEPENDÊNCIA]:

PERGUNTAS OBRIGATÓRIAS:
1. É possível fazer sem essa dependência usando o que já temos?
2. Qual funcionalidade EXATA ela resolve?
3. Qual versão ESPECÍFICA você recomenda e por quê?
4. Ela tem conflitos conhecidos com nosso stack atual?
5. Quantos KB ela adiciona ao bundle final?
6. Há alternativa mais simples?

FORMATO OBRIGATÓRIO da resposta:
"Preciso adicionar [NOME] versão [VERSÃO] para [FUNCIONALIDADE]. 
Analisando as perguntas: [suas respostas]
Posso proceder?"

Responda todas as 6 perguntas ANTES de instalar.
```

---

# SEÇÃO 6: SINAIS DE ALERTA E AÇÕES IMEDIATAS

## Sinais Críticos de Alerta

### 🚨 IA está criando muitos arquivos novos
**AÇÃO IMEDIATA:** 
- Use o prompt "PARE. Over-engineering"
- Exija consolidar funcionalidade em máximo 3 arquivos
- Provavelmente está complicando demais

### 🚨 IA sugere "refatoração" ou "melhoria da arquitetura"
**AÇÃO IMEDIATA:**
- Recuse categoricamente
- Use prompt "NÃO mude versões"
- Mantenha foco na funcionalidade específica solicitada

### 🚨 IA menciona padrões complexos (MVC, Repository, Clean Architecture, etc.)
**AÇÃO IMEDIATA:**
- Pare imediatamente
- Peça abordagem mais simples usando componentes básicos
- Use prompt "PARE. Over-engineering"

### 🚨 Código parou de funcionar após mudança
**AÇÃO IMEDIATA:**
- Use "Prompt de Debug" 
- Considere voltar à versão anterior (git reset)
- NÃO aceite "consertos" que adicionem complexidade

### 🚨 IA quer implementar múltiplas features "relacionadas"
**AÇÃO IMEDIATA:**
- Pare imediatamente
- Use prompt "Você está se desviando do objetivo"
- Uma feature por vez, SEMPRE

### 🚨 IA sugere adicionar dependências "úteis" ou "que vão precisar depois"
**AÇÃO IMEDIATA:**
- Recuse
- Use processo de validação de dependência
- Adicione apenas quando necessário para funcionalidade atual

---

# SEÇÃO 7: CRONOGRAMA E MÉTRICAS DE CONTROLE

## Cronograma Realista
- **Semana 1:** Setup + Chat básico
- **Semana 2:** Upload de arquivos  
- **Semana 3:** Interface dinâmica
- **Semana 4+:** Módulos específicos

## Checklist de Controle por Sprint

### Antes de Cada Sprint
- [ ] Objetivo da sprint está claro e específico
- [ ] Funcionalidades atuais estão 100% funcionando
- [ ] Backup do código foi feito (git commit)
- [ ] Critérios de aceitação estão definidos claramente
- [ ] Dependências necessárias foram validadas

### Durante o Sprint
- [ ] IA está focada apenas na tarefa atual
- [ ] Código está sendo documentado adequadamente
- [ ] Testes estão sendo feitos incrementalmente
- [ ] Complexidade está sob controle (máximo 3 arquivos novos)
- [ ] Nenhuma dependência foi adicionada sem aprovação

### Ao Final do Sprint
- [ ] Todos critérios de aceitação foram 100% atendidos
- [ ] Funcionalidade foi testada completamente
- [ ] Todas funcionalidades anteriores ainda funcionam
- [ ] Documentação foi atualizada
- [ ] Sistema completo ainda funciona sem erros

## Critérios de Sucesso por Fase

**Cada fase DEVE ter:**
- ✅ Funcionalidade 100% operacional
- ✅ Zero regressões em fases anteriores  
- ✅ Código documentado e organizado
- ✅ Performance adequada
- ✅ Máximo 5 dependências novas total

### Template de Relatório de Sprint

```
## Sprint [Número] - [Data]

### OBJETIVO:
[Funcionalidade específica que foi implementada]

### COMPLETADO:
- [ ] [Critério específico 1]
- [ ] [Critério específico 2]
- [ ] [Critério específico 3]

### DEPENDÊNCIAS ADICIONADAS:
- [Nome] versão [X] - para [funcionalidade Y]

### PROBLEMAS ENCONTRADOS:
[Descrever obstáculos específicos e como foram resolvidos]

### PRÓXIMO SPRINT:
[Próxima funcionalidade específica, não múltiplas]

### STATUS GERAL DO SISTEMA:
- Funcionalidades funcionando: [listar todas]
- Funcionalidades com problemas: [listar problemas]
- Performance: [ok/problemas específicos]
- Total de dependências: [número atual]
```

---

# SEÇÃO 8: METODOLOGIA DE CONTROLE SISTEMÁTICO

## Processo de Validação Constante

### Checklist Diário Durante Desenvolvimento
```
DIA [X] - FASE [Y]

MANHÃ (antes de começar):
- [ ] Funcionalidade de ontem está funcionando
- [ ] Objetivo de hoje está claro
- [ ] IA recebeu instruções específicas

MEIO-DIA (checkpoint):
- [ ] IA está focada na tarefa certa
- [ ] Nenhuma dependência foi adicionada sem aprovação
- [ ] Código não está ficando complexo demais

FINAL (antes de parar):
- [ ] Funcionalidade do dia foi testada
- [ ] Sistema completo ainda funciona
- [ ] Código foi commitado
```

## Comandos de Emergência para Situações Críticas

### Quando Perdeu Controle Completamente
```
RESET TOTAL. Vamos parar e reorganizar.

AUDITORIA OBRIGATÓRIA:
1. Analise o código atual e me liste quais funcionalidades estão realmente funcionando
2. Liste quais estão quebradas ou incompletas
3. Identifique qual foi a última versão 100% estável
4. Me mostre como voltar para essa versão estável

REGRA: NÃO implemente nada novo até estabilizarmos completamente o que existe.
```

### Para Simplificar Código que Ficou Complexo
```
Este código está muito complexo para o objetivo. Simplificação OBRIGATÓRIA.

TAREFA DE LIMPEZA:
- Remova abstrações desnecessárias
- Combine arquivos pequenos demais em arquivos maiores
- Elimine padrões over-engineered
- Mantenha apenas o essencial funcionando
- Consolide funcionalidades similares

RESULTADO ESPERADO:
- Código mais direto e legível
- Menos arquivos total
- Funcionalidade mantida
- Complexidade reduzida drasticamente

Princípio: Código simples > Código "elegante"
```

### Para Resolver Conflitos de Dependências
```
ERRO DE DEPENDÊNCIA detectado.

PROCESSO DE RESOLUÇÃO OBRIGATÓRIO:
1. Mostre exatamente qual o conflito (copie erro completo)
2. Identifique qual dependência está causando problema
3. Verifique se é possível remover dependência problemática
4. Se impossível remover, proponha versão alternativa que funcione
5. NUNCA atualize dependências do stack base para resolver conflito

PRIORIDADE: Manter stack base estável > Adicionar nova funcionalidade
```

---

# SEÇÃO 9: DEPENDÊNCIAS PRÉ-APROVADAS POR FUNCIONALIDADE

## Lista de Dependências Autorizadas

### Para Chat/IA (Fase 1):
```
✅ @google/generative-ai: [verificar versão atual]
✅ google-auth-library: [verificar versão atual]

ALTERNATIVAS se as acima não funcionarem:
✅ openai: [para GPT se Gemini falhar]
```

### Para Processamento de Dados (Fase 2):
```
✅ papaparse: [verificar versão atual] (CSV obrigatório)
✅ xlsx: [verificar versão atual] (Excel obrigatório)  
✅ pdf-parse: [verificar versão atual] (PDF se necessário)
✅ multer: [verificar versão atual] (upload de arquivos)

❌ EVITAR: bibliotecas complexas de processamento
```

### Para UI/Componentes (Fase 3):
```
✅ @radix-ui/react-dialog: [verificar versão atual]
✅ lucide-react: [verificar versão atual] (ícones)
✅ clsx: [verificar versão atual] (classes condicionais)

❌ EVITAR: Material-UI, Ant Design, outras libs pesadas
```

### Para Gráficos (Fase 3 - ESCOLHER APENAS 1):
```
✅ recharts: [verificar versão atual] (RECOMENDADO - mais simples)
✅ chart.js: [verificar versão atual] (alternativa)

❌ NUNCA USAR: echarts, d3, plotly (muito complexos)
```

### Para Storage (Produção):
```
✅ @vercel/kv: [verificar versão atual] (produção)
✅ fs-extra: [verificar versão atual] (desenvolvimento local)

❌ EVITAR: bancos de dados tradicionais (MySQL, PostgreSQL)
```

## Processo de Aprovação de Nova Dependência

### Template de Solicitação (IA deve usar):
```
SOLICITAÇÃO DE NOVA DEPENDÊNCIA

DEPENDÊNCIA: [nome exato]
VERSÃO: [versão específica]
FUNCIONALIDADE: [para que exatamente é necessária]

JUSTIFICATIVAS:
1. Impossível implementar sem esta dependência? [sim/não + explicação]
2. Não existe no stack atual algo que faça isso? [verificação]
3. Tamanho estimado: [KB que vai adicionar]
4. Dependências próprias dela: [lista outras que vai puxar]
5. Compatibilidade: [funciona com nosso stack atual?]

AGUARDANDO APROVAÇÃO PARA PROSSEGUIR.
```

### Seu Processo de Decisão:
```
ANTES DE APROVAR, PERGUNTE:
1. Realmente preciso desta funcionalidade AGORA?
2. Posso fazer sem essa biblioteca?
3. Ela vai complicar muito o projeto?
4. Vale o risco de adicionar uma dependência?

SE APROVAR: "Pode instalar [nome] versão [X] apenas"
SE REJEITAR: "Encontre alternativa sem nova dependência"
```

---

# SEÇÃO 10: PROMPTS MASTER PARA INÍCIO E CONTROLE

## Prompt Master de Início de Projeto

```
Sou gerente de projetos desenvolvendo AppFin com sua ajuda. NÃO sou desenvolvedor experiente.

CONTEXTO CRÍTICO: 
- Já tentei desenvolver este projeto várias vezes
- Sempre falha por causa de complexidade desnecessária e mudanças não solicitadas
- Preciso controle RÍGIDO sobre o que você implementa

REGRAS FUNDAMENTAIS QUE VOCÊ DEVE SEGUIR:
1. Implemente apenas o que eu pedir especificamente
2. SEMPRE pergunte antes de adicionar qualquer funcionalidade extra
3. NUNCA mude versões de dependências sem minha aprovação explícita
4. Mantenha código simples e bem documentado
5. Não use padrões complexos sem necessidade real
6. Teste cada funcionalidade antes de considerar completa
7. Uma funcionalidade por vez - NUNCA múltiplas simultaneamente

STACK APROVADA MANUALMENTE:
✅ Next.js: versão 14.2.32 (fonte: nextjs.org)
✅ React: versão 18.3.1 (fonte: react.dev)
✅ TypeScript: versão 5.4.5 (fonte: typescriptlang.org)
✅ Tailwind: versão 3.4.3 (fonte: tailwindcss.com)
✅ NextAuth: versão 4.24.7 (fonte: npmjs.com / next‑aut)

PROJETO: AppFin - plataforma de chat com IA que se expande modularmente

METODOLOGIA:
- Desenvolvimento em fases pequenas e controladas
- Cada fase tem critérios de aceitação claros
- Só avança para próxima fase quando atual está 100% funcionando

FORMATO OBRIGATÓRIO para qualquer nova dependência:
"Preciso adicionar [NOME] versão [VERSÃO] para [FUNCIONALIDADE]. Posso proceder?"

CONFIRMAÇÃO OBRIGATÓRIA:
Confirme que entendeu estas regras e vai segui-las rigorosamente antes de começarmos.
```

## Prompt Master de Controle (usar quando necessário)

```
ATENÇÃO: Você está começando a desviar das regras estabelecidas.

PROBLEMAS IDENTIFICADOS:
[Descreva especificamente o que a IA está fazendo de errado]

CORREÇÃO IMEDIATA NECESSÁRIA:
[Especifique exatamente o que IA deve parar de fazer]

RETORNE PARA:
[Especifique exatamente a tarefa original]

RELEMBRE AS REGRAS:
1. Uma funcionalidade por vez
2. Nada de complexidade desnecessária
3. Nenhuma dependência sem aprovação
4. Código simples e direto
5. Foco apenas no que foi solicitado

CONFIRMAÇÃO OBRIGATÓRIA:
Confirme que entendeu a correção e como vai proceder daqui para frente.
```

---

# SEÇÃO 11: TROUBLESHOOTING E SOLUÇÕES COMUNS

## Problemas Frequentes e Soluções

### Problema: "IA quer adicionar muitas dependências"
**Solução:**
```
Para cada dependência sugerida, pergunte:
1. "Posso fazer isso com o que já tenho?"
2. "É realmente necessário AGORA?"
3. "Qual a alternativa mais simples?"

Regra: Máximo 2 dependências novas por fase.
```

### Problema: "Código ficou muito complexo"
**Solução:**
```
Use prompt de simplificação:
"Este código está muito complexo. Simplifique para máximo 3 arquivos,
sem abstrações desnecessárias. Mantenha funcionalidade."
```

### Problema: "IA quer implementar funcionalidades extras"
**Solução:**
```
Use prompt de controle imediatamente:
"PARE. Implemente apenas [funcionalidade específica]. 
Não adicione nada extra."
```

### Problema: "Erro de dependência/conflito de versão"
**Solução:**
```
1. NÃO deixe IA "corrigir" atualizando versões
2. Analise se dependência problemática é realmente necessária
3. Se necessária, procure versão compatível
4. Último recurso: remova funcionalidade que causa conflito
```

### Problema: "Funcionalidade parou de funcionar"
**Solução:**
```
1. Git reset para última versão funcionando
2. Identifique exatamente o que mudou
3. Implemente mudança de forma incremental
4. Teste a cada pequena alteração
```

## Indicadores de Que Está no Caminho Certo

### ✅ Sinais Positivos:
- IA pergunta antes de adicionar dependências
- Código é simples e legível
- Funcionalidades anteriores continuam funcionando
- Cada fase é completada sem problemas
- Poucas dependências total no projeto
- IA foca apenas na tarefa solicitada

### ❌ Sinais de Alerta:
- IA sugere "melhorias" não solicitadas
- Muitos arquivos sendo criados
- Padrões complexos sendo mencionados
- Dependências sendo adicionadas sem pergunta
- Funcionalidades anteriores parando de funcionar
- IA implementando múltiplas funcionalidades

---

# SEÇÃO 12: RESUMO EXECUTIVO E CHECKLIST FINAL

## Os 5 Pilares do Sucesso no AppFin

### 1. CONTROLE DE VERSÕES
- ✅ VOCÊ verifica versões manualmente
- ✅ IA só executa com versões específicas
- ✅ Zero tolerância a mudanças não autorizadas

### 2. DESENVOLVIMENTO INCREMENTAL
- ✅ Uma funcionalidade por vez, sempre
- ✅ Teste completo antes de avançar
- ✅ Fases pequenas e controláveis

### 3. CONTROLE DE DEPENDÊNCIAS
- ✅ Aprovação manual para cada nova dependência
- ✅ Justificativa obrigatória para cada adição
- ✅ Máximo 2 dependências novas por fase

### 4. SIMPLICIDADE FORÇADA
- ✅ Código direto e sem abstrações desnecessárias
- ✅ Máximo 3 arquivos novos por funcionalidade
- ✅ Padrões simples apenas

### 5. CONTROLE CONSTANTE DA IA
- ✅ Prompts específicos para cada situação
- ✅ Sinais de alerta identificados e tratados
- ✅ Correções imediatas quando IA desvia

## Checklist Master Antes de Começar

```
PRÉ-DESENVOLVIMENTO:
- [ ] Versões verificadas manualmente em sites oficiais
- [x] Stack definida e documentada
- [ ] Prompts de controle preparados e testados
- [ ] Cronograma de fases definido
- [ ] Critérios de aceitação por fase estabelecidos

DURANTE DESENVOLVIMENTO:
- [ ] Uma fase por vez, sem exceções
- [ ] Backup antes de cada mudança importante
- [ ] Teste incremental constante
- [ ] Controle rígido de dependências
- [ ] Uso dos prompts de controle quando necessário

PÓS-IMPLEMENTAÇÃO:
- [ ] Todos critérios de aceitação validados
- [ ] Sistema completo testado
- [ ] Documentação atualizada
- [ ] Preparação para próxima fase
```

## Diferencial Desta Abordagem

### ❌ Método Que Falha:
- "IA, crie o AppFin completo"
- Deixar IA decidir arquitetura
- Aceitar sugestões de "melhorias"
- Múltiplas funcionalidades simultâneas

### ✅ Método Que Funciona:
- "IA, implemente exatamente isso: [especificação detalhada]"
- VOCÊ controla arquitetura e decisões
- Rejeitar tudo que não foi solicitado
- Funcionalidade por vez, testada e validada

## Regra de Ouro Final

**SE A IA COMEÇAR A SUGERIR MUDANÇAS NÃO SOLICITADAS, PARE IMEDIATAMENTE.**

A IA é um executor excelente, mas um arquiteto terrível. Mantenha controle sobre TODAS as decisões técnicas importantes.

---

**COM ESTE MANUAL COMPLETO, VOCÊ TEM TODAS AS FERRAMENTAS NECESSÁRIAS PARA DESENVOLVER O APPFIN SEM SE PERDER EM COMPLEXIDADE DESNECESSÁRIA.**

**LEMBRE-SE: O objetivo é ter o AppFin funcionando, não código perfeito. Simplicidade e funcionalidade sempre vencem elegância técnica.**