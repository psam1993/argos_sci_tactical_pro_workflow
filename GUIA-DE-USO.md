# 🎖️ GUIA DE USO - ARGOS SCI TACTICAL PRO V2 | PLANO DE AÇÃO INTEGRADO

## 📱 COMO ACESSAR O SISTEMA

### Via Navegador
1. Abra a pasta: `argos_sci_tactical_pro_workflow_v2`
2. Clique 2x em: `index.html`
3. Sistema carregará com dados do Plano de Ação automaticamente

### Interface Principal
```
ARGOS SCI
├── Dashboard (Home) ..................... Visão geral do incidente
├── Configuração SCI ..................... Dados da operação
├── Mapa Tático .......................... Perímetro e setores
├── Workflow PO .......................... Versionamento do plano
├── Painel por Papel ..................... Telas por função
├── Planejamento ......................... Objetivos e estratégia
├── Operações ............................ Missões no campo
├── Logística ............................ Suprimentos e apoio
├── Adm/Finanças ......................... Custos e recursos
├── Segurança ............................ Riscos e protocolos
├── Info Pública ......................... Comunicação para população
├── Ligações ............................. Coordenação interagências
├── Recursos ............................. Equipes e efetivo
└── Relatórios/PAI ....................... Gerar documentos
```

---

## 🎯 DADOS CARREGADOS (SCI-2026-004)

### Incidente
- **ID:** SCI-2026-004
- **Nome:** Incêndio Florestal - Serra Central
- **Local:** Cuiabá/MT
- **Perímetro:** 8.2 km²
- **Contenção:** 40% (Flanco Leste)
- **Comandante:** Maj. Rodrigo Silva
- **Status:** ATIVO

### Estrutura de Comando
| Papel | Nome | Função |
|-------|------|--------|
| CI | Maj. Rodrigo Silva | Comandante |
| OpOps | Cap. Menezes | Chefe de Operações |
| Planej. | Ten. Alencar | Chefe de Planejamento |
| Log | Sgt. Porto | Chefe de Logística |
| Adm | Cap. Souza | Chefe Adm/Finanças |

### Recursos Disponíveis (42 Militares)
```
TERRESTRES (6):
  ✓ GUA-01 - Combate (Sgt. Oliveira) - Flanco Norte [Em Operação]
  ✓ GUA-02 - Combate (Sgt. Mendes) - Flanco Leste [Em Operação]
  ✓ GUA-03 - Combate (Cabo Silva) - Base [Prontidão]
  ✓ GUA-04 - Combate (Sgt. Rocha) - Setor Central [Em Operação]
  ✓ GUA-05 - Logística (Sgt. Santos) - Base PCA [Disponível]
  ✓ GUA-06 - Suprimento (Cb. Costa) - Base [Disponível]

AÉREO (1):
  ✓ AER-01 - Helicóptero (Cap. Freitas) - Hangar [Manutenção até 16:00h]

SAÚDE (1):
  ✓ AMB-02 - Ambulância (Ten. Ana) - PC Central [Prontidão]
```

### Missões Operacionais (PO-02)
| ID | Descrição | Setor | Recurso | Status |
|----|-----------|-------|---------|--------|
| M21 | Aceiro de Contenção | Flanco Norte | GUA-01 | ▶️ Em curso |
| M22 | Proteção de Estrutura (TX) | Central | GUA-04 | ✅ Concluído |
| M25 | Ataque Aéreo | Flanco Leste | AER-01 | ⏳ Pendente |
| M26 | Suporte Logístico | Flanco Norte | GUA-05/06 | ▶️ Em curso |

---

## 📊 COMO USAR CADA TELA

### 1️⃣ Dashboard (index.html)
**Função:** Visão geral do incidente em tempo real

**Informações Principais:**
- Perímetro do incêndio (8.2 km²)
- Efetivo empenhado (42 militares)
- Condições meteorológicas críticas
- Missões em campo
- Timeline de eventos

**Ação Sugerida:** Revisar a cada 30 minutos

---

### 2️⃣ Configuração SCI (incidente.html)
**Função:** Dados gerais do incidente

**Campos Editáveis:**
- Nome da operação
- Comandante do Incidente (CI)
- Objetivos de comando (5 listados)
- Nível de complexidade (Nível 2)

**Ação Sugerida:** Consultar ao abrir caso mude o CI

---

### 3️⃣ Planejamento (planejamento.html)
**Função:** Definir estratégia do período operacional (PO)

**Seções a Preencher:**
1. **Situação Atual**
   - Perímetro: 8.2 km²
   - Contenção: 40% Flanco Leste
   - Meteorologia: crítica

2. **Objetivos do PO**
   - [ ] Manter contenção 40% Flanco Leste
   - [ ] Expandir aceiro Flanco Norte
   - [ ] Proteger Torres TX
   - [ ] Manter efetivo seguro
   - [ ] Coordenar AER-01

3. **Riscos e Mitigações**
   - Vento aumentando → reposicionar equipes
   - Recursos limitados → priorizar crítico

4. **Projeção (12h)**
   - Possível expansão NE
   - Contenção pode atingir 60% até 18:00h

**Ação Sugerida:** Preencher ao início de cada PO

---

### 4️⃣ Operações (operacoes.html)
**Função:** Registrar missões em campo

**Para Adicionar Missão:**
1. ID (Ex: M26)
2. Status (Pendente/Em curso/Concluído)
3. Descrição (Ex: Aceiro Flanco Norte)
4. Setor (Flanco N/L/Central)
5. Recursos (GUA-01, GUA-05)

**Missões Pré-carregadas:**
- M21: Aceiro Flanco Norte (GUA-01)
- M22: Proteção Torres TX (GUA-04)
- M25: Ataque Aéreo (AER-01)
- M26: Suporte Logístico (GUA-05/06)

**Ação Sugerida:** Atualizar status a cada 1 hora

---

### 5️⃣ Logística (logistica.html)
**Função:** Gerenciar apoio e suprimentos

**Campos Críticos:**
1. **Necessidades Prioritárias**
   - Água p/ AER-01: 1.200L
   - Alimentação (Setor Norte)
   - EPI completo
   - Mangueiras 200m

2. **Comunicação**
   - VHF 161.925 (comando)
   - UHF Freq.X (campo)
   - Contato CI: Maj. Silva
   - Backup: Sgt. Porto (Logística)

3. **Transporte**
   - GUA-05: rota base-norte
   - Combustível: 200L disponível
   - Reabastecimento: 04:00h

4. **Pendências**
   - [ ] AER-01: manutenção até 16:00h
   - [ ] Reposição mangueiras GUA-01
   - [ ] Bateria rádios portáteis

**Ação Sugerida:** Revisar a cada 2 horas

---

### 6️⃣ Recursos (equipes.html)
**Função:** Acompanhar status de efetivo

**Colunas:**
- Recurso (ID)
- Tipo (Combate/Logística/Aéreo/Saúde)
- Responsável
- Status (Em Operação/Disponível/Prontidão/Manutenção)
- Localização

**Ação Sugerida:** Check-in a cada 30 minutos via rádio

---

### 7️⃣ Workflow PO (workflow.html)
**Função:** Versionamento e aprovação do plano

**Gates Obrigatórios (Nível 2):**
1. ✓ Planejamento (definir estratégia)
2. ✓ Operações (missões mapeadas)
3. ✓ Logística (suprimentos OK)
4. ✓ Segurança (riscos mitigados)

**Processo:**
- Preencher cada seção → Gate marca ✅
- Quando todos OK → Enviar para aprovação
- CI aprova → PO fica bloqueado (somente leitura)
- Final PO → Gerar versão v.X com hash

**Ação Sugerida:** Seguir fluxo rigorosamente

---

## 🔔 ALERTS E CONTINGÊNCIAS

### Alertas Críticos (Revisar Imediatamente)
```
🔴 ALERTA MÁXIMO - Vento em mudança
   → Ativar Contingência 2: Evacuação de setores

🟠 ALERTA ALTO - AER-01 em manutenção
   → Aguardar até 16:00h para ataque aéreo

🟡 ALERTA MÉDIO - Recursos limitados
   → Priorizar Setor Central (Torres TX)
```

### Briefings Mandatórios
- 06:00h → Briefing geral com todo staff
- 14:00h → Reunião de reavaliação de situação

---

## 💾 DADOS PERSISTENTES

### localStorage
Todo dado preenchido é salvo automaticamente em:
```
localStorage.getItem('argos_inc')          → Incidente
localStorage.getItem('argos_missions')     → Missões
localStorage.getItem('argos_resources')    → Recursos
localStorage.getItem('plan_form')          → Planejamento
localStorage.getItem('log_form')           → Logística
```

### Como Recuperar Dados
Se atualizar a página, os dados permanecem carregados.

### Como Resetar Tudo
Abrir Console (F12) e executar:
```javascript
localStorage.clear();
location.reload();
```

---

## 🎓 DICAS DE USO

✅ **Sempre atualize o Dashboard** a cada 30 minutos  
✅ **Use o Mapa Tático** para referência de perímetro  
✅ **Check-in** de recursos via rádio regularmente  
✅ **Versione o PAI** quando houver mudanças relevantes  
✅ **Mantenha Logística** sincronizada com Operações  
✅ **Comunique** via Info Pública quando necessário  
✅ **Registre Ligações** com órgãos externos  

---

## 🚨 CONTINGÊNCIAS MAPEADAS

### Contingência 1: Expansão Rápida
- Condição: Vento gira para N/NE
- Ação: Reposicionar GUA-01 e GUA-02
- Responsável: Cap. Menezes (OpOps)

### Contingência 2: Evacuação
- Condição: Incêndio atinge perímetro evacuação
- Ação: Ativar protocolo evacuação (PC Central)
- Responsável: Maj. Rodrigo Silva (CI)

### Contingência 3: AER-01 Indisponível
- Condição: Helicóptero não retorna à operação
- Ação: Intensificar aceiro terrestre
- Responsável: Cap. Menezes (OpOps)

---

## 📞 CONTATOS EMERGÊNCIA

| Papel | Nome | Telefone | Canal |
|-------|------|----------|-------|
| CI | Maj. Rodrigo Silva | (65) - | VHF 161.925 |
| OpOps | Cap. Menezes | (65) - | VHF 161.925 |
| Log | Sgt. Porto | (65) - | VHF 161.925 |
| Defesa Civil | Coordenador Regional | (65) - | Telefone |
| IBAMA | Vigilância | (65) - | Telefone |

---

## ✅ CHECKLIST DIÁRIO

### Manhã (06:00h)
- [ ] Verificar Dashboard
- [ ] Briefing com staff
- [ ] Atualizar status recursos
- [ ] Revisar logística

### Tarde (14:00h)
- [ ] Reunião de situação
- [ ] Atualizar missões
- [ ] Verificar pendências
- [ ] Preparar relatório noturno

### Noite (22:00h)
- [ ] Resumo do dia
- [ ] Projeção próximas 12h
- [ ] Versionar PAI se necessário
- [ ] Repouso equipes

---

## 📄 EXPORTAR RELATÓRIO PAI

Na tela de Relatórios (relatorios.html):
1. Clique em "Gerar PAI - Versão vX"
2. Sistema exporta PDF com:
   - Situação atual
   - Objetivos
   - Missões
   - Recursos
   - Logística
   - Assinado por: CI + Chefes de Seção

---

**Versão:** 2.1 | Integrado Plano de Ação  
**Data:** 29 JAN 2026  
**Incidente:** SCI-2026-004 | Combate Incêndio Florestal Serra Central  
**Status:** ✅ OPERACIONAL
