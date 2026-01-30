# ⚡ INÍCIO RÁPIDO - ARGOS SCI V2

## Sistema 100% Funcional em 5 Minutos

---

## 🚀 PASSO 1: VERIFICAR BANCO DE DADOS

✅ **Banco já criado!** Schema completo com 13 tabelas:

```
✓ incidentes
✓ periodos_operacionais
✓ planejamentos
✓ operacoes
✓ missoes
✓ recursos
✓ logistica
✓ seguranca
✓ admfin
✓ informacao_publica
✓ ligacoes
✓ profiles
✓ auditoria
```

✅ **Dados iniciais carregados:**
- Incidente SCI-2026-004 (Incêndio Florestal Serra Central)
- 8 Recursos (GUA-01 até AMB-02)
- 4 Missões operacionais (M21 até M26)

---

## 🔐 PASSO 2: CRIAR SEU USUÁRIO

### Opção A: Via Interface (Recomendado)

1. **Abra:** `login.html` no navegador
2. **Clique:** "Registre-se aqui"
3. **Preencha:**
   - Nome: Seu nome completo
   - Email: seu@email.com
   - Senha: mínimo 6 caracteres
   - Papel: Escolha seu papel no SCI
4. **Crie a conta**
5. **Faça login**

### Opção B: Criar Usuário de Teste (SQL)

No Supabase SQL Editor:

```sql
-- Criar usuário de teste
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'comandante@argos.com',
  crypt('senha123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"nome_completo":"Maj. Rodrigo Silva","papel_sci":"CI"}',
  now(),
  now()
);

-- Criar perfil
INSERT INTO profiles (id, nome_completo, papel_sci)
SELECT id, 'Maj. Rodrigo Silva', 'CI'
FROM auth.users WHERE email = 'comandante@argos.com';
```

**Credenciais:**
- Email: `comandante@argos.com`
- Senha: `senha123`

---

## 🌐 PASSO 3: ACESSAR O SISTEMA

### Abrir no Navegador

1. **Abra:** `login.html`
2. **Login:** Use as credenciais criadas
3. **Dashboard:** Você será redirecionado automaticamente
4. **Explore:** Todas funcionalidades estão ativas!

### Navegação

```
Dashboard (index.html)
├── Ver incidente ativo
├── Missões em andamento
└── Timeline de eventos

Planejamento (planejamento.html)
├── Situação atual
├── Objetivos do PO
├── Riscos e mitigações
└── Projeções

Operações (operacoes.html)
├── Criar missões
├── Alocar recursos
├── Atualizar status
└── Registrar feedback

Recursos (equipes.html)
├── Listar equipes
├── Adicionar recursos
├── Atualizar localização
└── Gerenciar status

Workflow (workflow.html)
├── Checklist de gates
├── Aprovar PO
├── Bloquear/desbloquear
└── Versionar PAI
```

---

## 🧪 PASSO 4: TESTAR FUNCIONALIDADES

### Teste 1: Criar Missão

1. Vá em **Operações**
2. Preencha:
   - ID: M27
   - Descrição: Reconhecimento Área Sul
   - Setor: Flanco Sul
   - Recursos: GUA-03
   - Status: Pendente
3. Clique **Adicionar Missão**
4. ✅ Missão aparece na lista
5. ✅ Salva no banco (recarregue para confirmar)

### Teste 2: Adicionar Recurso

1. Vá em **Recursos**
2. Clique **Adicionar Recurso**
3. Preencha:
   - ID: GUA-07
   - Categoria: Guarnição
   - Responsável: Sgt. Teste
   - Status: Disponível
   - Localização: Base
4. Salve
5. ✅ Recurso aparece na lista

### Teste 3: Salvar Planejamento

1. Vá em **Planejamento**
2. Preencha os campos
3. Clique **Salvar Planejamento**
4. ✅ Gate de Planejamento marca OK
5. Vá em **Workflow** para confirmar

### Teste 4: Aprovar PO

1. Vá em **Workflow**
2. Preencha todas seções obrigatórias
3. Clique **Enviar p/ Revisão**
4. Clique **Aprovar PO**
5. ✅ Status muda para "Aprovado"

---

## 👥 PASSO 5: TESTAR MÚLTIPLOS USUÁRIOS

### Simular Colaboração

1. **Crie 2 usuários diferentes:**
   - Usuario 1: comandante@argos.com (CI)
   - Usuario 2: operacoes@argos.com (Operações)

2. **Abra 2 navegadores:**
   - Chrome: Login como CI
   - Firefox: Login como Operações

3. **Teste sincronização:**
   - No Firefox: Crie uma missão
   - No Chrome: Veja a missão aparecer (recarregue se necessário)

4. **Teste permissões:**
   - Operações tenta aprovar PO → bloqueado
   - CI aprova PO → sucesso

---

## 📊 VERIFICAR AUDITORIA

### Ver Histórico de Mudanças

No Supabase SQL Editor:

```sql
-- Ver últimas 20 mudanças
SELECT
  timestamp,
  tabela,
  operacao,
  usuario_nome,
  dados_novos->>'codigo' as codigo_registro
FROM auditoria
ORDER BY timestamp DESC
LIMIT 20;
```

---

## 🔍 TROUBLESHOOTING RÁPIDO

### Erro ao fazer login

**Problema:** "Invalid login credentials"

**Solução:**
1. Confirme email/senha corretos
2. Verifique se usuário foi criado (profiles table)
3. Limpe cache do navegador
4. Tente criar nova conta

### Dados não salvam

**Problema:** Alterações não persistem

**Solução:**
1. Abra Console (F12)
2. Veja erros no console
3. Verifique se está logado
4. Confirme credenciais Supabase no .env

### Página em branco

**Problema:** Dashboard não carrega

**Solução:**
1. Verifique .env com credenciais corretas
2. Abra Console e veja erros
3. Confirme conexão com internet
4. Teste URL Supabase no navegador

### Sem permissão

**Problema:** "RLS policy violation"

**Solução:**
1. Faça login novamente
2. Verifique se token não expirou
3. Confirme papel do usuário
4. Comandantes têm mais permissões

---

## 📱 USAR NO CELULAR

### Via Navegador Mobile

1. Acesse mesma URL do desktop
2. Sistema é responsivo
3. Login funciona igual
4. Todas funções disponíveis

### PWA (Progressive Web App)

1. No Chrome Mobile: "Adicionar à tela inicial"
2. Ícone aparece como app
3. Funciona offline (após primeiro carregamento)
4. Sincroniza quando volta online

---

## 🚀 DEPLOY EM PRODUÇÃO

### Vercel (1 minuto)

```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel

# Seguir prompts
# URL gerada: https://argos-sci.vercel.app
```

### Netlify (1 minuto)

```bash
# Instalar CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Seguir prompts
# URL gerada: https://argos-sci.netlify.app
```

---

## ✅ CHECKLIST FINAL

Antes de usar em produção:

```
□ Supabase configurado (.env correto)
□ Primeiro usuário criado
□ Login funciona
□ Dashboard carrega
□ Missões podem ser criadas
□ Recursos podem ser adicionados
□ Planejamento salva
□ Workflow funciona
□ Auditoria registra mudanças
□ RLS está ativo (segurança)
□ Backup automático configurado
□ Deploy realizado (se necessário)
```

---

## 🎯 PRÓXIMOS PASSOS

1. **Personalize dados:**
   - Edite incidente padrão
   - Configure recursos da sua unidade
   - Ajuste papéis conforme necessidade

2. **Treine equipe:**
   - Faça demo do sistema
   - Crie usuários para cada membro
   - Pratique workflows

3. **Configure alertas:**
   - Email de recuperação de senha
   - Notificações (opcional)

4. **Monitore:**
   - Dashboard Supabase (uso, performance)
   - Auditoria (mudanças críticas)
   - Backup (verificar regularmente)

---

## 📞 AJUDA

- **Documentação:** [INSTALACAO.md](INSTALACAO.md)
- **Técnica:** [README_V2_SUPABASE.md](README_V2_SUPABASE.md)
- **Melhorias:** [MELHORIAS_IMPLEMENTADAS.md](MELHORIAS_IMPLEMENTADAS.md)
- **Uso:** [GUIA-DE-USO.md](GUIA-DE-USO.md)

---

## 🎉 TUDO PRONTO!

```
✅ Banco de dados: Criado
✅ Autenticação: Implementada
✅ API: Completa
✅ Auditoria: Ativa
✅ Segurança: RLS habilitado
✅ Dados iniciais: Carregados
✅ Documentação: Completa

🚀 SISTEMA OPERACIONAL!
```

**Comece agora:** Abra `login.html` e crie sua conta! 🎖️

---

**Tempo total:** ~5 minutos
**Complexidade:** Básica (seguir passos)
**Resultado:** Sistema 100% funcional
