# 🎖️ ARGOS SCI TACTICAL PRO V2 - SUPABASE EDITION

## Sistema de Comando de Incidentes - Completamente Funcional

**Versão:** 2.1 - Backend Real com Supabase
**Status:** ✅ PRODUÇÃO
**Data:** Janeiro 2026

---

## 🚀 PRINCIPAIS MELHORIAS IMPLEMENTADAS

### ✅ 1. BANCO DE DADOS REAL (Supabase PostgreSQL)

**Antes:** localStorage (dados locais, não persistentes)
**Agora:** Supabase (dados persistentes, sincronizados, seguros)

**Benefícios:**
- Dados persistem entre dispositivos
- Múltiplos usuários podem trabalhar simultaneamente
- Backup automático
- Auditoria completa de mudanças
- Escalável para milhares de incidentes

### ✅ 2. AUTENTICAÇÃO E SEGURANÇA

**Implementado:**
- Login com email/senha
- Registro de novos usuários
- Sistema de perfis (CI, Operações, Planejamento, etc.)
- Row Level Security (RLS) no banco
- Permissões por papel
- Logout seguro
- Token JWT automático

**Segurança:**
- Senhas criptografadas (bcrypt)
- RLS impede acesso não autorizado
- Auditoria de todas ações
- Comandantes têm permissões especiais

### ✅ 3. SINCRONIZAÇÃO EM TEMPO REAL

**Capacidades:**
- Múltiplos usuários veem mudanças instantaneamente
- Atualização automática de missões
- Status de recursos em tempo real
- Notificações de alterações no PO
- Sistema de presença (quem está online)

### ✅ 4. API COMPLETA

**Endpoints Implementados:**

**Incidentes:**
- `getAtivo()` - Busca incidente ativo
- `create()` - Cria novo incidente
- `update()` - Atualiza incidente

**Períodos Operacionais (PO):**
- `getAtual()` - Busca PO atual
- `create()` - Cria novo PO
- `update()` - Atualiza PO (gates, aprovações, versões)

**Planejamento:**
- `get()` - Busca planejamento do PO
- `save()` - Salva situação, objetivos, riscos, projeções

**Operações:**
- `get()` - Busca operações do PO
- `save()` - Salva divisões, efetivo, feedback

**Missões:**
- `list()` - Lista todas missões
- `create()` - Cria nova missão
- `update()` - Atualiza missão (status, recursos, etc.)
- `delete()` - Remove missão

**Recursos:**
- `list()` - Lista recursos (guarnições, equipamentos, etc.)
- `create()` - Adiciona recurso
- `update()` - Atualiza status/localização
- `delete()` - Remove recurso

**Logística, Segurança, Adm/Fin, Info Pública, Ligações:**
- `get()` - Busca dados
- `save()` - Salva atualizações

**Auditoria:**
- `list()` - Histórico completo de mudanças

### ✅ 5. AUDITORIA AUTOMÁTICA

**Rastreamento:**
- Todas alterações são registradas
- Quem fez, quando, o que mudou
- Dados antes/depois da mudança
- Filtro por incidente/data/usuário
- Export para relatórios

**Tabela `auditoria`:**
- Operação (INSERT, UPDATE, DELETE)
- Usuário responsável
- Timestamp preciso
- Diff de dados
- Contexto (incidente, PO, etc.)

### ✅ 6. VALIDAÇÕES E INTEGRIDADE

**Implementado:**
- Validação de campos obrigatórios
- Constraints no banco (UNIQUE, NOT NULL)
- Chaves estrangeiras (CASCADE)
- Triggers automáticos (updated_at)
- Verificação de permissões
- Bloqueio de PO (somente leitura)

### ✅ 7. ESTRUTURA DE DADOS COMPLETA

**Tabelas Criadas:**

1. **incidentes** - Dados gerais do incidente
2. **periodos_operacionais** - POs (workflow)
3. **planejamentos** - Situação, objetivos, riscos
4. **operacoes** - Efetivo, divisões, missões
5. **missoes** - Missões de campo
6. **recursos** - Guarnições, equipamentos, materiais
7. **logistica** - Apoio, comunicação, transporte
8. **seguranca** - Riscos, plano médico
9. **admfin** - Doações, custos, incidentes
10. **informacao_publica** - Mensagens públicas
11. **ligacoes** - Coordenação interagências
12. **profiles** - Perfis de usuários
13. **auditoria** - Log de mudanças

**Total:** 13 tabelas + índices + triggers

---

## 📊 ARQUITETURA DO SISTEMA

```
┌─────────────────────────────────────────────────┐
│           NAVEGADOR (Cliente)                    │
│  ┌──────────────────────────────────────────┐  │
│  │  HTML/CSS/JavaScript                      │  │
│  │  - Interface de usuário                   │  │
│  │  - Lucide Icons                          │  │
│  │  - Leaflet Maps                          │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │  supabase-client.js                       │  │
│  │  - API Client                             │  │
│  │  - Autenticação                          │  │
│  │  - Realtime Subscriptions                │  │
│  └──────────────────────────────────────────┘  │
└──────────────┬──────────────────────────────────┘
               │ HTTPS + JWT
               ▼
┌─────────────────────────────────────────────────┐
│           SUPABASE (Backend)                     │
│  ┌──────────────────────────────────────────┐  │
│  │  PostgreSQL Database                      │  │
│  │  - 13 tabelas                             │  │
│  │  - RLS habilitado                        │  │
│  │  - Triggers de auditoria                 │  │
│  │  - Backups automáticos                   │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │  Authentication                           │  │
│  │  - JWT tokens                             │  │
│  │  - Email/senha                           │  │
│  │  - Permissões por papel                  │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │  Realtime Server                          │  │
│  │  - WebSockets                            │  │
│  │  - Broadcast de mudanças                 │  │
│  │  - Presença de usuários                  │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 🎯 FUNCIONALIDADES POR PAPEL SCI

### 👤 Comandante do Incidente (CI)

**Acesso:**
- Dashboard completo
- Aprovar/rejeitar POs
- Bloquear/desbloquear POs
- Ver todas seções
- Editar dados do incidente
- Acesso à auditoria completa

### ⚔️ Chefia de Operações

**Acesso:**
- Criar/editar missões
- Designar recursos
- Atualizar status operacional
- Registrar feedback de campo
- Ver mapa tático
- Coordenar divisões

### 📋 Chefia de Planejamento

**Acesso:**
- Definir objetivos do PO
- Avaliar situação
- Identificar riscos
- Fazer projeções
- Criar PAI (Plano de Ação)
- Versionar documentos

### 🚛 Chefia de Logística

**Acesso:**
- Gerenciar suprimentos
- Planejar transporte
- Configurar comunicações
- Resolver pendências
- Coordenar apoio

### 💰 Chefia de Adm/Finanças

**Acesso:**
- Registrar custos
- Documentar doações
- Registrar incidentes
- Controlar recursos financeiros

### 🦺 Oficial de Segurança

**Acesso:**
- Identificar riscos
- Definir mitigações
- Briefing de segurança
- Plano médico
- Protocolo de evacuação

### 📢 Oficial de Informação Pública (PIO)

**Acesso:**
- Criar mensagens públicas
- Orientar comunidade
- Coordenar com mídia

### 🤝 Oficial de Ligações (LNO)

**Acesso:**
- Coordenar agências
- Manter contatos
- Documentar acordos

---

## 🔐 SISTEMA DE PERMISSÕES

### Hierarquia

```
CI (Comandante)
├── Acesso total
├── Pode aprovar POs
├── Pode desbloquear POs
└── Acesso à auditoria

Chefias de Seção
├── Podem criar/editar em sua seção
├── Podem visualizar outras seções
└── Podem sugerir aprovação

Membros de Equipe
├── Visualização completa
├── Edição limitada (próprios dados)
└── Notificações de mudanças
```

### RLS (Row Level Security)

**Incidentes:**
- SELECT: Todos autenticados
- INSERT: Apenas comandantes
- UPDATE: Apenas comandantes ou criador
- DELETE: Apenas comandantes

**Períodos Operacionais:**
- SELECT: Todos autenticados
- INSERT: Todos autenticados
- UPDATE: Apenas se não bloqueado OU comandante
- DELETE: Apenas comandante

**Missões, Recursos:**
- SELECT: Todos autenticados
- INSERT/UPDATE/DELETE: Todos autenticados

**Auditoria:**
- SELECT: Apenas comandantes
- INSERT: Automático (triggers)

---

## 📈 WORKFLOW DO PO

### Estados do PO

```
Rascunho
   ↓ (preencher seções)
Em Revisão
   ↓ (validar gates)
Aprovado
   ↓ (executar)
Encerrado (bloqueado)
   ↓
Próximo PO (PO-03)
```

### Gates Obrigatórios

**Nível 1 (Simples):**
- Planejamento
- Operações

**Nível 2 (Intermediário):**
- Planejamento
- Operações
- Logística
- Segurança

**Nível 3 (Complexo):**
- Planejamento
- Operações
- Logística
- Segurança
- Adm/Finanças
- Info Pública
- Ligações

---

## 📱 TECNOLOGIAS UTILIZADAS

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilo (variáveis CSS)
- **JavaScript ES6+** - Lógica
- **Lucide Icons** - Ícones
- **Leaflet** - Mapas táticos

### Backend
- **Supabase** - BaaS completo
- **PostgreSQL** - Banco de dados
- **PostgREST** - API REST automática
- **GoTrue** - Autenticação
- **Realtime** - WebSockets

### Segurança
- **RLS** - Row Level Security
- **JWT** - Tokens de sessão
- **bcrypt** - Hash de senhas
- **HTTPS** - Criptografia de transporte

---

## 📊 COMPARAÇÃO: V1 vs V2

| Funcionalidade | V1 (localStorage) | V2 (Supabase) |
|----------------|-------------------|---------------|
| **Persistência** | ❌ Local apenas | ✅ Banco real |
| **Autenticação** | ❌ Nenhuma | ✅ JWT + RLS |
| **Múltiplos usuários** | ❌ Não | ✅ Sim |
| **Sincronização** | ❌ Não | ✅ Tempo real |
| **Backup** | ❌ Manual | ✅ Automático |
| **Auditoria** | ❌ Não | ✅ Completa |
| **Permissões** | ❌ Não | ✅ Por papel |
| **Escalabilidade** | ❌ Limitada | ✅ Ilimitada |
| **Segurança** | ⚠️ Básica | ✅ Enterprise |

---

## 🎓 CASOS DE USO

### Operação de Campo

1. CI cria incidente no sistema
2. Planejamento define objetivos
3. Operações cria missões
4. Logística aloca recursos
5. Equipes recebem notificações
6. Status atualizado em tempo real
7. Comandante monitora dashboard
8. PO aprovado e bloqueado
9. Próximo PO criado automaticamente

### Múltiplas Equipes

1. 5 usuários logados simultaneamente
2. Operações atualiza missão M21
3. Todos veem atualização instantânea
4. Logística adiciona pendência
5. Segurança marca risco
6. CI aprova mudanças
7. Sistema versiona PAI
8. Auditoria registra tudo

---

## 🔧 MANUTENÇÃO

### Backup

**Automático:**
- Supabase: backup diário
- Retenção: 7 dias (plano gratuito)

**Manual:**
```bash
# Via Supabase CLI
supabase db dump > backup.sql
```

### Logs

**Auditoria:**
```sql
SELECT * FROM auditoria
WHERE incidente_id = 'xxx'
ORDER BY timestamp DESC
LIMIT 100;
```

**Performance:**
- Supabase Dashboard → Database → Logs

---

## 🚀 DEPLOY

### Opção 1: Vercel (Recomendado)
```bash
vercel
```

### Opção 2: Netlify
```bash
netlify deploy
```

### Opção 3: GitHub Pages
```bash
git push origin main
```

---

## 📞 SUPORTE

- **Documentação**: [INSTALACAO.md](INSTALACAO.md)
- **Guia de Uso**: [GUIA-DE-USO.md](GUIA-DE-USO.md)
- **Issues**: GitHub

---

## ✅ CHECKLIST DE FUNCIONALIDADES

### Implementado ✅

- [x] Banco de dados Supabase
- [x] Schema completo (13 tabelas)
- [x] Autenticação email/senha
- [x] Sistema de perfis/papéis
- [x] RLS (Row Level Security)
- [x] API completa (CRUD)
- [x] Auditoria automática
- [x] Sincronização realtime
- [x] Workflow de PO
- [x] Gates dinâmicos por nível
- [x] Versionamento de PAI
- [x] Sistema de aprovações
- [x] Bloqueio de PO
- [x] Dashboard interativo
- [x] Mapa tático
- [x] Gestão de missões
- [x] Gestão de recursos
- [x] Planejamento operacional
- [x] Logística
- [x] Segurança
- [x] Adm/Finanças
- [x] Info Pública
- [x] Ligações
- [x] Relatórios
- [x] Triggers automáticos
- [x] Índices de performance
- [x] Validações
- [x] Tratamento de erros
- [x] Responsividade
- [x] Documentação completa

### Próximas Melhorias 🚧

- [ ] Notificações push
- [ ] Export PDF de relatórios
- [ ] Integração com sistemas externos (IBAMA, Defesa Civil)
- [ ] App mobile (React Native)
- [ ] Análise de dados (BI)
- [ ] Previsão de tendências (ML)
- [ ] Integração com drones
- [ ] Visão 3D do terreno

---

## 📜 LICENÇA

MIT License - Uso livre para fins operacionais

---

## 🏆 CRÉDITOS

**Desenvolvido para:**
- Bombeiros Militares
- Defesa Civil
- Órgãos de Resposta a Emergências

**Baseado em:**
- ICS (Incident Command System)
- NIMS (National Incident Management System)
- SCI Brasil (Sistema de Comando de Incidentes)

---

## 🎉 STATUS FINAL

```
✅ Sistema completamente funcional
✅ Backend real (Supabase)
✅ Autenticação implementada
✅ Banco de dados criado
✅ API completa
✅ Auditoria automática
✅ Sincronização em tempo real
✅ Documentação completa
✅ Pronto para produção
```

**🚀 ARGOS SCI V2 - OPERACIONAL!**

---

**Versão:** 2.1 - Supabase Edition
**Data:** Janeiro 2026
**Mantenedor:** Equipe ARGOS SCI
