/**
 * ARGOS SCI TACTICAL PRO - Plano de Ação Integrado
 * Incêndio Florestal - Serra Central | SCI-2026-004
 * Data: 29 de Janeiro de 2026
 */

const PLANO_ACAO = {
  // ===== INCIDENTE =====
  incidente: {
    id: 'SCI-2026-004',
    nome: 'Incêndio Florestal - Serra Central',
    tipo: 'Incêndio Florestal Estruturado',
    local: 'Serra Central, Cuiabá/MT',
    data_inicio: '13 Jan 2026, 08:30',
    perimetro: '8.2 km²',
    conten_percentual: '40%',
    conten_flanco: 'Flanco Leste',
    status: 'ATIVO',
    complexidade: 'Nível 2',
    ci_nome: 'Maj. Rodrigo Silva'
  },

  // ===== ESTRUTURA DE COMANDO =====
  comando: {
    ci: { papel: 'Comandante Incidente', nome: 'Maj. Rodrigo Silva', sigla: 'CI', funcao: 'Comando Geral' },
    ops: { papel: 'Chefe de Operações', nome: 'Cap. Menezes', sigla: 'OpOps', funcao: 'Execução Tática' },
    plan: { papel: 'Chefe de Planejamento', nome: 'Ten. Alencar', sigla: 'Planej.', funcao: 'Estratégia PO' },
    log: { papel: 'Chefe de Logística', nome: 'Sgt. Porto', sigla: 'Log', funcao: 'Apoio/Suprimentos' },
    adm: { papel: 'Chefe Adm/Finanças', nome: 'Cap. Souza', sigla: 'Adm', funcao: 'Finanças/Recursos' },
    safe: { papel: 'Oficial de Segurança', nome: 'Sgt. Silva', sigla: 'Safe', funcao: 'Proteção/Riscos' }
  },

  // ===== RECURSOS =====
  recursos: [
    { id: 'GUA-01', tipo: 'Combate', responsavel: 'Sgt. Oliveira', status: 'Em Operação', localizacao: 'Flanco Norte', efetivo: 6 },
    { id: 'GUA-02', tipo: 'Combate', responsavel: 'Cb. Martins', status: 'Em Operação', localizacao: 'Flanco Leste', efetivo: 6 },
    { id: 'GUA-03', tipo: 'Combate', responsavel: 'Sd. Ferreira', status: 'Disponível', localizacao: 'Setor Central', efetivo: 6 },
    { id: 'GUA-04', tipo: 'Proteção', responsavel: 'Cb. Lima', status: 'Concluído', localizacao: 'Torre TX', efetivo: 4 },
    { id: 'GUA-05', tipo: 'Logística', responsavel: 'Cb. Rocha', status: 'Em Operação', localizacao: 'Flanco Norte', efetivo: 4 },
    { id: 'GUA-06', tipo: 'Suprimento', responsavel: 'Cb. Costa', status: 'Disponível', localizacao: 'Base', efetivo: 3 },
    { id: 'AER-01', tipo: 'Helicóptero', responsavel: 'Cap. Freitas', status: 'Manutenção', localizacao: 'Hangar', efetivo: 3, obs: 'Manutenção até 16:00h' },
    { id: 'AMB-02', tipo: 'Ambulância', responsavel: 'Ten. Ana', status: 'Prontidão', localizacao: 'PC Central', efetivo: 1 }
  ],

  // ===== MISSÕES OPERACIONAIS =====
  missoes: [
    {
      id: 'M21',
      titulo: 'Aceiro de Contenção',
      descricao: 'Construção de aceiro de contenção no Flanco Norte para evitar avanço da frente de fogo',
      setor: 'Flanco Norte',
      recurso: 'GUA-01',
      status: 'Em curso',
      prioridade: 'Alta',
      objetivos: ['Conter frente norte', 'Proteger estruturas', 'Reduzir área de risco'],
      riscos: ['Mudança de vento', 'Fadiga da tropa', 'Falta de visibilidade']
    },
    {
      id: 'M22',
      titulo: 'Proteção de Estrutura (TX)',
      descricao: 'Proteção das torres de transmissão localizadas ao norte da área afetada',
      setor: 'Setor Central',
      recurso: 'GUA-04',
      status: 'Concluído',
      prioridade: 'Alta',
      objetivos: ['Salvar estruturas críticas', 'Manter comunicações', 'Completar evacuação'],
      riscos: ['Proximidade do fogo', 'Acesso limitado']
    },
    {
      id: 'M25',
      titulo: 'Ataque Aéreo',
      descricao: 'Ataque aéreo com helicóptero no Flanco Leste para intensificar combate',
      setor: 'Flanco Leste',
      recurso: 'AER-01',
      status: 'Pendente',
      prioridade: 'Alta',
      objetivos: ['Intensificar combate aéreo', 'Abrir nova frente', 'Apoiar GUA-02'],
      riscos: ['Manutenção do helicóptero', 'Condições meteorológicas críticas']
    },
    {
      id: 'M26',
      titulo: 'Suporte Logístico',
      descricao: 'Suporte logístico contínuo para equipes em campo',
      setor: 'Flanco Norte',
      recurso: 'GUA-05/06',
      status: 'Em curso',
      prioridade: 'Crítica',
      objetivos: ['Abastecer equipes', 'Transportar feridos', 'Manter suprimentos'],
      riscos: ['Vias congestionadas', 'Falta de combustível']
    }
  ],

  // ===== METEOROLOGIA =====
  meteorologia: {
    temperatura: '34°C',
    umidade: '18%',
    velocidade_vento: '22 km/h',
    direcao_vento: 'SE',
    status: 'CRÍTICA',
    tendencia: 'Piora esperada próximas 12h',
    previsao: 'Risco de mudança de vento para NE com velocidade aumentada'
  },

  // ===== OBJETIVOS DO PERÍODO OPERACIONAL =====
  objetivos: [
    'Manter a contenção de 40% no Flanco Leste e expandir contenção no Flanco Norte',
    'Proteger as torres de transmissão (TX) localizadas ao norte',
    'Conter o incêndio em 40% do perímetro e evitar avanço para estruturas habitadas',
    'Minimizar danos ambientais na área de preservação permanente',
    'Manter comunicações com órgãos de defesa civil e meio ambiente'
  ],

  // ===== SITUAÇÃO ATUAL =====
  situacao: {
    perimetro: '8.2 km²',
    conten_percentual: '40%',
    conten_flanco: 'Flanco Leste em contenção',
    frentes_ativas: 'Flanco Norte (aceiro em progresso), Flanco Leste (avanço controlado)',
    efetivo_empenhado: '42 militares',
    materiais_criticos: 'Combustível, água, EPI, equipamentos de combate',
    estruturas_ameacadas: 'Torres de transmissão, zona rural próxima'
  },

  // ===== RISCOS E MITIGAÇÕES =====
  riscos: [
    {
      id: 'R01',
      titulo: 'MUDANÇA DE VENTO',
      descricao: 'Risco de alteração da direção do vento (SE para NE) com intensidade aumentada',
      impacto: 'Crítico',
      probabilidade: 'Alta',
      mitigacao: 'Manter monitoramento meteorológico contínuo; reposicionar equipes em tempo real'
    },
    {
      id: 'R02',
      titulo: 'FADIGA DA TROPA',
      descricao: 'Desgaste físico extremo após 12h de operação contínua',
      impacto: 'Alto',
      probabilidade: 'Média',
      mitigacao: 'Rotação de equipes; repouso obrigatório; nutrição e hidratação contínuas'
    },
    {
      id: 'R03',
      titulo: 'FALTA DE COMBUSTÍVEL',
      descricao: 'Esgotamento de combustível para equipamentos de combate e transporte',
      impacto: 'Crítico',
      probabilidade: 'Média',
      mitigacao: 'Reabastecimento de emergência via GUA-06; planejamento de suprimentos 24h'
    },
    {
      id: 'R04',
      titulo: 'ACIDENTES COM PESSOAL',
      descricao: 'Queimaduras, traumas e mal súbito em operação com EPI',
      impacto: 'Alto',
      probabilidade: 'Média',
      mitigacao: 'AMB-02 em prontidão; protocolo de evacuação; kits médicos nos setores'
    }
  ],

  // ===== NECESSIDADES LOGÍSTICAS =====
  logistica: {
    necessidades: [
      'Combustível: 500L (para GUA-01/02/05, AER-01)',
      'Água: 2.000L (hidratação de tropa)',
      'EPI: Reposição de luvas, máscaras, óculos de proteção',
      'Equipamentos: Manutenção de motosserras, limpeza de equipamento'
    ],
    comunicacao: [
      'VHF: Canal 1 (comando)', 'UHF: Canal 2 (operações)', 'Rádio de campanha: Backup'
    ],
    transporte: [
      'GUA-05: Logística',
      'GUA-06: Suprimento',
      'Resgate via AMB-02 se necessário'
    ],
    pendencias: [
      'Manutenção AER-01: Conclusão até 16:00h',
      'Reabastecimento combustível: Crítico',
      'Reposição de água: Média prioridade'
    ]
  },

  // ===== LIGAÇÕES INTERAGÊNCIAS =====
  ligacoes: [
    { agencia: 'Defesa Civil', contato: 'Coordenador Regional', telefone: '(65) 3611-8800', acordo: 'Coordenação de evacuações' },
    { agencia: 'IBAMA', contato: 'Chefe de Operações', telefone: '(65) 3644-2222', acordo: 'Preservação de fauna/flora' },
    { agencia: 'Prefeitura Municipal', contato: 'Secretário de Defesa', telefone: '(65) 3219-8000', acordo: 'Apoio local e comunicação' },
    { agencia: 'Saúde Municipal', contato: 'Coordenador de Emergência', telefone: '(65) 3219-9000', acordo: 'Suporte médico para feridos' }
  ],

  // ===== INFORMAÇÃO PÚBLICA =====
  comunicacao_publica: {
    mensagem_principal: 'Incêndio Florestal - Serra Central em combate estruturado. Contenção em 40% no Flanco Leste. Equipes em campo com apoio de helicóptero. Monitoramento contínuo.',
    avisos: [
      'Restrição de acesso à área de operação',
      'Evitar zona de 5km ao redor do perímetro',
      'Seguir orientações da Defesa Civil'
    ],
    contato_imprensa: 'informacoes@bombeiros.mt.gov.br | (65) 9999-9999'
  },

  // ===== PROJEÇÃO 12H =====
  projecao: {
    horizonte: '12 horas',
    cenario_otimista: 'Contenção expandida para 60% com apoio aéreo contínuo',
    cenario_realista: 'Manutenção de 40-50% de contenção; mudança de vento sob controle',
    cenario_pessimista: 'Avanço para 35% de contenção; mudança de vento não controlada',
    recomendacoes: [
      'Manter monitoramento meteorológico hora a hora',
      'Preparar plano contingencial para mudança de vento',
      'Aumentar efetivo de logística para 12h de operação',
      'Coordenar reabastecimento com déficit crítico'
    ]
  }
};

// ===== VARIÁVEIS GLOBAIS PARA COMPATIBILIDADE =====
window.ARGOS = window.ARGOS || {};
window.ARGOS.inc = PLANO_ACAO.incidente;
window.ARGOS.cmd = PLANO_ACAO.comando;
window.ARGOS.rec = PLANO_ACAO.recursos;
window.ARGOS.miss = PLANO_ACAO.missoes;
window.ARGOS.met = PLANO_ACAO.meteorologia;

// ===== HELPERS =====
function getIncidentLevel() {
  const inc = Store.get('argos_inc', ARGOS.inc || {});
  return inc.complexidade || 'Nível 2';
}

function isLocked() {
  const po = WF.getPO ? WF.getPO() : {};
  return po.status === 'Encerrado' || po.status === 'Em revisão';
}

// ===== STORAGE SIMULATION =====
const Store = {
  storage: {},
  set: function(key, value) {
    this.storage[key] = value;
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: function(key, defaultValue) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : (this.storage[key] || defaultValue);
  }
};

// ===== WORKFLOW CONTROLLER =====
const WF = {
  getPO: function() {
    return Store.get('po_data', {
      id: 'PO-02',
      status: 'Rascunho',
      checklist: {
        plan: { done: false, label: 'Planejamento' },
        ops: { done: false, label: 'Operações' },
        log: { done: false, label: 'Logística' },
        adm: { done: false, label: 'Adm/Fin' },
        safety: { done: false, label: 'Segurança' },
        pio: { done: false, label: 'Info Pública' },
        lno: { done: false, label: 'Ligações' }
      },
      aprovacoes: [],
      versoes: [],
      timestamp: new Date().toISOString()
    });
  },
  mark: function(key, done) {
    const po = this.getPO();
    if (po.checklist[key]) po.checklist[key].done = done;
    Store.set('po_data', po);
  },
  setStatus: function(status, locked) {
    const po = this.getPO();
    po.status = status;
    po.locked = locked;
    Store.set('po_data', po);
  },
  addApproval: function(approval) {
    const po = this.getPO();
    po.aprovacoes = po.aprovacoes || [];
    po.aprovacoes.push({ ...approval, timestamp: new Date().toISOString() });
    Store.set('po_data', po);
  },
  bumpVersion: function(descricao) {
    const po = this.getPO();
    po.versoes = po.versoes || [];
    po.versoes.push({
      id: 'v' + (po.versoes.length + 1),
      descricao: descricao,
      timestamp: new Date().toISOString()
    });
    Store.set('po_data', po);
  }
};

// ===== GATEWAY HELPERS =====
function markProgress(gate, done) {
  WF.mark(gate, done);
}

function requiredGates(level) {
  if (level === 'Nível 1') return ['plan', 'ops'];
  if (level === 'Nível 2') return ['plan', 'ops', 'log', 'safety'];
  return ['plan', 'ops', 'log', 'adm', 'safety', 'pio', 'lno'];
}

function requiredGatesOK() {
  const level = getIncidentLevel();
  const req = requiredGates(level);
  const po = WF.getPO();
  return req.every(k => po.checklist[k]?.done);
}

// ===== TOAST NOTIFICATION =====
if (!window.ARGOS.toast) {
  window.ARGOS.toast = function(msg) {
    console.log('[TOAST]', msg);
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed; bottom:20px; right:20px; padding:12px 20px;
      background:#333; color:#fff; border-radius:6px; z-index:9999;
      font-size:14px; box-shadow:0 4px 12px rgba(0,0,0,0.3);
      animation: slideUp 0.3s ease-out;
    `;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  };
}

console.log('✓ ARGOS SCI Plano de Ação carregado | SCI-2026-004 | PO-02');
