# ATUALIZAÇÃO PROJETO V2 - PLANO DE AÇÃO DO INCIDENTE
## Combate Incêndio Florestal - Serra Central | SCI-2026-004

**Data de Atualização:** 29 de Janeiro de 2026  
**Versão:** 2.1 - Alinhado ao Plano de Ação de Combate  

---

## RESUMO DAS ALTERAÇÕES

O projeto **argos_sci_tactical_pro_workflow_v2** foi completamente atualizado com base no **Plano de Ação de Combate ao Incêndio Florestal - Serra Central**. Todas as telas, dados e informações agora refletem o cenário operacional real do incidente.

---

## ARQUIVOS MODIFICADOS

### 1. **Arquivos HTML Principais**

#### `index.html` - Dashboard Central
- ✅ Atualizado com dados reais do perímetro (8.2 km²)
- ✅ Status da contenção (40% no Flanco Leste)
- ✅ Condições meteorológicas críticas
- ✅ Missões operacionais alinhadas ao plano
- ✅ Timeline com eventos reais do incidente

#### `incidente.html` - Configuração SCI
- ✅ Nome da operação: "Incêndio Florestal - Serra Central | Combate Estruturado"
- ✅ Objetivos expandidos (5 objetivos principais)
- ✅ Dados do CI: Maj. Rodrigo Silva

#### `planejamento.html` - Planejamento (PO)
- ✅ Placeholders atualizados com informações específicas do plano
- ✅ Situação: Perímetro 8.2 km², contenção 40%, frente ativa norte
- ✅ Objetivos do PO alinhados ao plano de ação
- ✅ Riscos e mitigações contextualizadas

#### `operacoes.html` - Operações e Missões
- ✅ Descrições de missões conforme PAI
- ✅ Setores: Flanco Norte, Flanco Leste, Setor Central
- ✅ Recursos designados por missão

#### `logistica.html` - Logística e Apoio
- ✅ Necessidades prioritárias do plano
- ✅ Plano de comunicação (VHF, UHF, contatos)
- ✅ Transporte e combustível
- ✅ Pendências críticas (manutenção AER-01, reposições)
- ✅ Responsável: Sgt. Porto (Chefia de Logística)

#### `equipes.html` - Recursos e Efetivo
- ✅ Expandido de 4 para 8 recursos
- ✅ Novos recursos: GUA-02, GUA-03, GUA-04, GUA-06
- ✅ Status e localização em tempo real
- ✅ Estrutura: 6 equipes terrestres + 1 helicóptero + 1 ambulância

#### Demais arquivos HTML
- ✅ `workflow.html`, `mapa.html`, `painel_papel.html`
- ✅ `admfin.html`, `seguranca.html`, `informacao_publica.html`
- ✅ `ligacoes.html`, `relatorios.html`
- ✅ Todos agora carregam o arquivo `data-plano-acao.js`

---

### 2. **Novo Arquivo de Dados**

#### `assets/data-plano-acao.js` - Repositório de Dados do Plano
Arquivo JavaScript com estrutura completa do plano:

**Seções incluídas:**
- **Incidente:** ID, nome, tipo, local, data, CI, status, perímetro
- **Comando:** Organograma (CI, Operações, Planejamento, Logística, Adm/Fin)
- **Flancos:** Norte (aceiro em progresso), Leste (40% contido), Central (proteção TX)
- **Recursos:** 8 recursos com tipo, responsável, status, localização
- **Missões:** 4 missões operacionais (M21, M22, M25, M26)
- **Meteorologia:** Temperatura, umidade, vento, direção, status crítico
- **Logística:** Necessidades, comunicação, transporte, pendências
- **Segurança:** Riscos, mitigações, protocolos
- **Objetivos:** 5 objetivos do período operacional
- **Projeção:** Tendências para próximas 12 horas
- **Ligações:** Defesa Civil, IBAMA, Prefeitura
- **Comunicação Pública:** Mensagens de alerta

---

## DADOS OPERACIONAIS ATUALIZADOS

### Incidente
```
ID: SCI-2026-004
Nome: Incêndio Florestal - Serra Central
Complexidade: Nível 2
Comandante: Maj. Rodrigo Silva
Perímetro: 8.2 km²
Contenção: 40% (Flanco Leste)
Status: ATIVO
```

### Recursos Disponibilizados
| ID | Tipo | Responsável | Status | Localização |
|---|---|---|---|---|
| GUA-01 | Combate | Sgt. Oliveira | Em Operação | Flanco Norte |
| GUA-02 | Combate | Sgt. Mendes | Em Operação | Flanco Leste |
| GUA-03 | Combate | Cabo Silva | Prontidão | Base - Reserva |
| GUA-04 | Combate | Sgt. Rocha | Em Operação | Setor Central (TX) |
| GUA-05 | Logística | Sgt. Santos | Disponível | Base PCA |
| GUA-06 | Suprimento | Cb. Costa | Disponível | Base - Suprimentos |
| AER-01 | Helicóptero | Cap. Freitas | Manutenção | Hangar (retorno 16:00h) |
| AMB-02 | Saúde/Resgate | Ten. Ana | Prontidão | PC Central |

### Missões Operacionais
- **M21:** Aceiro de Contenção - Flanco Norte (GUA-01) | Em curso
- **M22:** Proteção de Estrutura - Torre TX (GUA-04) | Concluído
- **M25:** Ataque Aéreo - Setor 3/Leste (AER-01) | Pendente
- **M26:** Suporte Logístico - Setor Norte (GUA-05, GUA-06) | Em curso

### Condições Meteorológicas
- Temperatura: 34°C
- Umidade: 18%
- Vento: 22 km/h (SE)
- Status: **CRÍTICA**

---

## ESTRUTURA DO ORGANOGRAMA DE COMANDO

```
┌─────────────────────────────┐
│   Maj. Rodrigo Silva        │
│  (Comandante do Incidente)  │
└────────────┬────────────────┘
             │
    ┌────────┼────────┬────────┐
    │        │        │        │
    ▼        ▼        ▼        ▼
  Cap.     Ten.     Sgt.     Cap.
Menezes  Alencar   Porto    Souza
(OpOps) (Planej)  (Log)    (Adm)
```

---

## OBJETIVOS DO PERÍODO OPERACIONAL (PO-02)

1. Manter contenção de 40% em Flanco Leste
2. Expandir aceiro em Flanco Norte (meta: 300m²)
3. Proteger Torres TX sem interrupção
4. Manter efetivo seguro e operacional
5. Coordenar e executar ataque aéreo AER-01 (Leste)

---

## NECESSIDADES LOGÍSTICAS CRÍTICAS

- Água p/ AER-01: 1.200L
- Alimentação para 42 militares (prioritário: Setor Norte)
- EPI completo: 6 camisetas aluminizadas
- Mangueiras: 200m de 75mm
- Reposição: mangueiras para GUA-01
- Verificação: baterias rádios portáteis
- Manutenção: AER-01 até 16:00h

---

## PROJEÇÃO (PRÓXIMAS 12 HORAS)

- **Tendência:** Possível expansão NE se vento mudar
- **Prioridade:** Flanco Norte (aceiro)
- **Cenário Favorável:** Contenção 60% até 18:00h
- **Cenário Adverso:** Evacuação de setores se vento girar para N
- **Próximo PU:** PO-03 (14 JAN 06:00) com reavaliação completa

---

## COMO USAR O NOVO SISTEMA

1. **Carregamento Automático:** Ao abrir qualquer página, `data-plano-acao.js` carrega os dados no localStorage
2. **Sincronização:** Todos os formulários usam dados do arquivo quando inicializados
3. **Persistência:** Dados salvos no localStorage permanecem entre navegações
4. **Versionamento:** Sistema registra versões do PAI conforme mudanças

---

## INTEGRAÇÃO COM WORKFLOW (WF)

O sistema agora integra automaticamente:
- ✅ Gates de planejamento, operações, logística, segurança
- ✅ Aprovações por papel (CI, OpOps, Planej, Log, Adm)
- ✅ Versionamento de PO com hash de conteúdo
- ✅ Auditoria de mudanças no localStorage
- ✅ Bloqueio de PO quando encerrado

---

## VALIDAÇÃO

✅ Todos os arquivos HTML atualizados  
✅ Arquivo de dados criado e integrado  
✅ Referências aos scripts adicionadas  
✅ Dados do plano mapeados para sistema  
✅ Estrutura operacional completa  
✅ Missões e recursos sincronizados  

---

## PRÓXIMAS ETAPAS

1. **Validação em Campo:** Testar sistema com equipes operacionais
2. **Ajustes Finos:** Feedback dos usuários (CI, Logística, Planejamento)
3. **Backup:** Exportar versão do PAI para arquivo externo
4. **Treinamento:** Capacitar staff no uso da plataforma V2
5. **PO-03:** Preparar próximo período operacional

---

**Status:** ✅ COMPLETO  
**Última Atualização:** 29 JAN 2026  
**Responsável:** Sistema ARGOS SCI  
**Versão Sistema:** 2.1
