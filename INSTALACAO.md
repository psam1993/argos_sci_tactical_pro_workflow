# 🚀 GUIA DE INSTALAÇÃO - ARGOS SCI TACTICAL PRO V2

## Sistema Completo com Supabase Backend

---

## ✅ PRÉ-REQUISITOS

1. **Navegador moderno** (Chrome, Firefox, Edge, Safari)
2. **Conta Supabase** (gratuita)
3. **Editor de código** (opcional, para personalização)

---

## 📦 PASSO 1: CONFIGURAR SUPABASE

### 1.1 Criar Projeto Supabase

1. Acesse: https://app.supabase.com
2. Clique em "New Project"
3. Preencha:
   - Nome: `ARGOS SCI`
   - Database Password: (anote em local seguro)
   - Region: São Paulo (South America)

### 1.2 Obter Credenciais

Após criar o projeto:

1. Vá em **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://seu-projeto.supabase.co`)
   - **Anon/Public Key** (chave pública)

### 1.3 Configurar Variáveis de Ambiente

Abra o arquivo `.env` na raiz do projeto e preencha:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-aqui
```

---

## 🗄️ PASSO 2: CRIAR BANCO DE DADOS

### Opção A: Via SQL Editor (Supabase Dashboard)

1. No Supabase, vá em **SQL Editor**
2. Clique em "New Query"
3. Cole o conteúdo do arquivo de migration (já aplicado automaticamente)
4. Execute

### Opção B: Via Supabase CLI (Avançado)

```bash
npm install -g supabase
supabase login
supabase db push
```

---

## 🔐 PASSO 3: CRIAR PRIMEIRO USUÁRIO

### Via Interface

1. Abra `login.html` no navegador
2. Clique em "Registre-se aqui"
3. Preencha:
   - **Nome Completo**: Seu nome
   - **Email**: seu@email.com
   - **Senha**: Mínimo 6 caracteres
   - **Papel no SCI**: Selecione seu papel (ex: CI, Operações, etc.)
4. Clique em "Criar Conta"
5. Faça login com as credenciais criadas

### Via SQL (Para criar usuário administrativo)

```sql
-- Criar usuário via SQL (opcional)
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  'comandante@argos.com',
  crypt('senha123', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"nome_completo": "Maj. Rodrigo Silva", "papel_sci": "CI"}'
);
```

---

## 🌐 PASSO 4: EXECUTAR O SISTEMA

### Desenvolvimento Local

```bash
# Se usar npm
npm install
npm run dev

# Se usar Python
python -m http.server 8000

# Se usar PHP
php -S localhost:8000
```

### Acesso Direto

Abra o arquivo `index.html` diretamente no navegador (funciona offline após primeiro carregamento).

---

## 📊 PASSO 5: VERIFICAR INSTALAÇÃO

### Checklist

- [ ] Você consegue acessar `login.html`
- [ ] Consegue criar uma conta
- [ ] Após login, é redirecionado para `index.html`
- [ ] Dashboard carrega incidente SCI-2026-004
- [ ] Recursos (guarnições) aparecem em "Recursos"
- [ ] Missões aparecem em "Operações"
- [ ] Você pode criar novos recursos/missões
- [ ] Alterações são salvas no banco (recarregue a página para testar)

---

## 🔧 CONFIGURAÇÕES AVANÇADAS

### Autenticação

Por padrão, usa email/senha. Para adicionar outros métodos:

1. Supabase Dashboard → **Authentication** → **Providers**
2. Habilite: Google, GitHub, etc.

### Row Level Security (RLS)

Já está configurado! Regras:

- Usuários autenticados veem todos incidentes
- Apenas comandantes podem criar/editar incidentes
- Todos podem criar missões/recursos
- POs bloqueados só podem ser editados por comandantes

### Realtime

Para sincronização em tempo real entre usuários:

```javascript
// No código, já está preparado
SupabaseDB.realtime.subscribeMissoes(incidenteId, (payload) => {
  console.log('Missão atualizada:', payload);
  // Atualizar interface
});
```

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Erro: "Failed to fetch"

**Causa**: Credenciais Supabase incorretas

**Solução**:
1. Verifique `.env`
2. Confirme URL e chave no Supabase Dashboard
3. Recarregue a página

### Erro: "Invalid login credentials"

**Causa**: Email/senha incorretos

**Solução**:
1. Verifique se criou conta
2. Resete senha via Supabase Dashboard
3. Confirme email (se habilitado)

### Dados não salvam

**Causa**: RLS bloqueando (sem autenticação)

**Solução**:
1. Faça login
2. Verifique se token está válido
3. Veja console do navegador (F12) para erros

### Página redireciona para login constantemente

**Causa**: Token expirado

**Solução**:
1. Limpe localStorage (F12 → Application → Clear Site Data)
2. Faça login novamente

---

## 📱 DEPLOY EM PRODUÇÃO

### Via Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Via Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Via GitHub Pages

1. Push para GitHub
2. Settings → Pages → Source: main branch
3. Acesse: `https://seu-usuario.github.io/argos-sci`

---

## 🔒 SEGURANÇA

### Boas Práticas

1. **NUNCA** commite `.env` com credenciais reais
2. Use **variáveis de ambiente** no servidor
3. Habilite **confirmação de email** para produção
4. Configure **rate limiting** no Supabase
5. Use **HTTPS** em produção
6. Faça **backup** regular do banco

### Backup do Banco

No Supabase:
1. **Database** → **Backups**
2. Configure backup automático diário
3. Export manual: `pg_dump` via CLI

---

## 📚 PRÓXIMOS PASSOS

1. **Personalize** os dados do incidente
2. **Configure** papéis e permissões
3. **Treine** equipes no uso do sistema
4. **Monitore** logs de auditoria
5. **Ajuste** workflow conforme necessidade

---

## 🆘 SUPORTE

- **Documentação Supabase**: https://supabase.com/docs
- **Issues**: GitHub do projeto
- **Email**: suporte@argos-sci.com

---

## ✅ STATUS DA INSTALAÇÃO

Após seguir todos os passos:

```
✅ Supabase configurado
✅ Banco de dados criado
✅ Usuário administrador criado
✅ Sistema rodando
✅ Autenticação funcionando
✅ Dados sendo salvos
✅ Pronto para uso operacional!
```

---

**Versão:** 2.1 - Supabase Backend
**Data:** Janeiro 2026
**Status:** Produção

🎉 **SISTEMA OPERACIONAL!**
