/**
 * PLANO DE AÇÃO - COMBATE INCÊNDIO FLORESTAL
 * SCI-2026-004 | Serra Central | Cuiabá/MT
 * Data: 13 JAN 2026 | PO-02: 13 JAN 18:00 → 14 JAN 06:00
 */

const PLANO_ACAO = {
  // Dados gerais do incidente
  incidente: {
    id: "SCI-2026-004",
    nome: "Incêndio Florestal - Serra Central",
    tipo: "Combate Estruturado - Nível 2",
    local: "Serra Central, Cuiabá/MT",
    data_inicio: "13 JAN 2026, 08:30",
    comandante: "Maj. Rodrigo Silva",
    subcomandante: "Cap. Menezes",
    status: "ATIVO",
    perimetro_km2: 8.2,
    contencao_percentual: 40
  },

  // Estrutura de comando (Organograma SCI)
  comando: {
    ci: { nome: "Maj. Rodrigo Silva", funcao: "Comandante do Incidente" },
    subci: { nome: "Cap. Menezes", funcao: "Subcomandante / Chefe de Operações" },
    operacoes: { nome: "Cap. Menezes", funcao: "Chefe de Operações" },
    planejamento: { nome: "Ten. Alencar", funcao: "Chefe de Planejamento" },
    logistica: { nome: "Sgt. Porto", funcao: "Chefe de Logística" },
    admfin: { nome: "Cap. Souza", funcao: "Chefe de Adm/Finanças" }
  },

  // Campos de Planejamento detalhados (PAI)
  planejamento_form: {
    nome_incidente: "Incêndio Florestal - Serra Central",
    nivel_operacao: "Nível 2",
    data_estabelecimento_sci: "13 JAN 2026",
    periodo_operacional_atual: "PO-02",
    data_elaboracao_pai: "13 JAN 2026",
    situacao_incendio: "Ativo controlado",
    dados_incendio: {
      numero_evento: "Ev-2026.001",
      categoria: "Combate Florestal",
      data_hora_inicio: "13 JAN 2026 08:30",
      duracao_horas: 10,
      focos_calor: 3,
      radiacao_fogo: "Alta",
      area_influencia_ha: 820,
      propagacao: "Rápida - Direção SE",
      unidade_conservacao: "Parque Municipal Serra Central",
      terra_indigena: null,
      bioma_origem: "Cerrado",
      bioma_atingido: "Cerrado",
      municipio_origem: "Cuiabá",
      municipios_atingidos: ["Cuiabá","Chapada"],
      propriedades_atingidas: [],
      car_origem: null,
      car_atingidos: [],
      sigef_origem: null,
      sigef_atingidos: []
    },
    meteorologia_prev3pu: [
      { periodo: "PU-02", direcao_vento: "SE", vel_kmh: 22, temp_c: 34, umidade_pct: 18 },
      { periodo: "PU-03", direcao_vento: "S", vel_kmh: 18, temp_c: 32, umidade_pct: 22 },
      { periodo: "PU-04", direcao_vento: "NE", vel_kmh: 12, temp_c: 30, umidade_pct: 28 }
    ],
    objetivos_operacao: [
      "Manter segurança de pessoal",
      "Proteger infraestrutura crítica (TX)",
      "Conter área e reduzir perímetro de fogo",
      "Minimizar impacto ambiental"
    ],
    pontos_acoes: []
  },

  // Flancos e setores críticos
  flancos: {
    norte: {
      nome: "Flanco Norte",
      status: "Aceiro em progresso",
      prioridade: "ALTA",
      frente_ativa: true,
      observacoes: "Expansão possível com mudança de vento"
    },
    leste: {
      nome: "Flanco Leste",
      status: "40% contido",
      prioridade: "MÉDIA",
      frente_ativa: false,
      observacoes: "Contenção estável, possível foco residual"
    },
    central: {
      nome: "Setor Central",
      status: "Proteção de estruturas TX",
      prioridade: "CRÍTICA",
      frente_ativa: false,
      observacoes: "Torres de transmissão como prioridade máxima"
    }
  },

  // Recursos disponíveis (por tipo de equipe)
  recursos: [
    { id: "GUA-01", tipo: "Combate Terrestre", responsavel: "Sgt. Oliveira", status: "Em Operação", localizacao: "Flanco Norte", equipamento: "Mangueiras, bombas, EPI completo" },
    { id: "GUA-02", tipo: "Combate Terrestre", responsavel: "Sgt. Mendes", status: "Em Operação", localizacao: "Flanco Leste", equipamento: "Mangueiras, abafadores, EPI completo" },
    { id: "GUA-03", tipo: "Combate Terrestre", responsavel: "Cabo Silva", status: "Prontidão", localizacao: "Base - Reserva", equipamento: "Kit completo pronto" },
    { id: "GUA-04", tipo: "Combate Terrestre", responsavel: "Sgt. Rocha", status: "Em Operação", localizacao: "Setor Central (TX)", equipamento: "Proteção estrutura, mangueiras" },
    { id: "GUA-05", tipo: "Transporte/Logística", responsavel: "Sgt. Santos", status: "Disponível", localizacao: "Base PCA", equipamento: "Caminhão, abastecimento" },
    { id: "GUA-06", tipo: "Suprimento", responsavel: "Cb. Costa", status: "Disponível", localizacao: "Base - Suprimentos", equipamento: "Estoque, distribuição" },
    { id: "AER-01", tipo: "Helicóptero de Combate", responsavel: "Cap. Freitas", status: "Manutenção", localizacao: "Hangar Municipal", equipamento: "Sistema de lançamento de água (retorno 16:00h)" },
    { id: "AMB-02", tipo: "Saúde / Resgate", responsavel: "Ten. Ana", status: "Prontidão", localizacao: "PC Central", equipamento: "Ambulância, EPR, maca" }
  ],

  // Missões operacionais
  missoes: [
    {
      id: "M21",
      descricao: "Aceiro de Contenção - Flanco Norte",
      setor: "Flanco Norte",
      recurso: "GUA-01",
      status: "Em curso",
      prioridade: "ALTA",
      observacoes: "Expansão de 500m² esperada até 06:00h"
    },
    {
      id: "M22",
      descricao: "Proteção de Estrutura - Torre TX",
      setor: "Setor Central",
      recurso: "GUA-04",
      status: "Concluído",
      prioridade: "CRÍTICA",
      observacoes: "Torre protegida, mantendo vigilância"
    },
    {
      id: "M25",
      descricao: "Ataque Aéreo - Setor 3 (Leste)",
      setor: "Flanco Leste",
      recurso: "AER-01",
      status: "Pendente",
      prioridade: "MÉDIA",
      observacoes: "Aguardando finalização de manutenção AER-01 (16:00h)"
    },
    {
      id: "M26",
      descricao: "Suporte Logístico Setor Norte",
      setor: "Flanco Norte",
      recurso: "GUA-05, GUA-06",
      status: "Em curso",
      prioridade: "ALTA",
      observacoes: "Alimentação, água, EPI - entrega 14:00h"
    }
  ],

  // Condições meteorológicas críticas
  meteorologia: {
    temperatura: "34°C",
    umidade_relativa: "18%",
    velocidade_vento: "22 km/h",
    direcao_vento: "SE",
    status: "CRÍTICA",
    alerta: "Risco de expansão rápida com mudança de direção"
  },

  // Necessidades logísticas
  logistica: {
    necessidades_prioritarias: [
      "Água de abastecimento para AER-01 (1.200L)",
      "Alimentação para 42 militares (Setor Norte: prioritário)",
      "EPI completo - 6 camisetas aluminizadas",
      "Mangueiras de 75mm - 200m",
      "Kit de reparos para equipamentos"
    ],
    comunicacao: {
      vhf_comando: "161.925 MHz",
      uhf_campo: "Freq. X",
      canais: {
        terrestre_ops: { tipo: "HT", frequencia: "--", canal: "--", modo: "Analógico" },
        aereo_ops: { tipo: "Aéreo", frequencia: "--", canal: "--", modo: "Analógico" }
      },
      contatos: {
        contato_ci: { nome: "Maj. Rodrigo Silva", tel: null },
        contato_logistica: { nome: "Sgt. Porto", tel: null }
      },
      whatsapp: { nome_grupo: null, link: null }
    },
    transporte: {
      rota_principal: "Base → Flanco Norte → Setor Central",
      rota_secundaria: "Base → Flanco Leste",
      combustivel_disponivel: "200L",
      reabastecimento_previsto: "04:00h"
    },
    pendencias: [
      "AER-01: Manutenção concluída até 16:00h",
      "Reposição de mangueiras para GUA-01",
      "Verificação bateria rádios portáteis"
    ]
  },

  // Segurança e contingências
  seguranca: {
    riscos_principais: [
      "EPI insuficiente/uso incorreto",
      "Segurança no trânsito e condução operacional",
      "Limites físicos, fadiga e hidratação",
      "Proibição de uso de álcool/psicoativos",
      "Animais peçonhentos e fauna silvestre",
      "Consciência situacional e comportamento do fogo",
      "Rotas de fuga não definidas",
      "Zonas de segurança não identificadas",
      "Acidentes gerais (quedas/colisões)",
      "Uso inseguro de ferramentas/equipamentos",
      "Intoxicação por fumaça e gases",
      "Queimaduras e exposição ao calor"
    ],
    protocolos: [
      "Briefing diário com todas as equipes (06:00h e 14:00h)",
      "Check-in via rádio a cada 30 minutos",
      "Rotas de fuga & pontos de encontro estabelecidos",
      "Zonas de segurança identificadas e comunicadas"
    ]
  },

  // Plano Médico
  medico: {
    ambulancia_presente: true,
    equipe_saude: true,
    medico_presente: false,
    modo_evacuacao: ["Viatura terrestre","Aeronave de asa rotativa"],
    unidade_destino: {
      nome: null,
      municipio: null,
      endereco: null,
      coordenadas: { lat: null, lon: null },
      telefone: null,
      distancia_km: null,
      tempo_estimado: null
    }
  },

  // Administração e Finanças (doações / registro de recursos)
  admfin: {
    cadastro_recursos: [],
    doacoes_financeiras: [],
    registros_incidentes: {
      acidentes_pessoal: [],
      acidentes_material: [],
      outros_acidentes: []
    }
  },

  // Objetivos do período operacional
  objetivos_po: [
    "Manter contenção de 40% em Flanco Leste",
    "Expandir aceiro em Flanco Norte (meta: 300m²)",
    "Proteger Torres TX sem interrupção",
    "Manter efetivo seguro e operacional",
    "Coordenar e executar ataque aéreo AER-01 (Leste)"
  ],

  // Projeção (próximas 12 horas)
  projecao: {
    tendencia: "Possível expansão NE se vento mudar",
    prioridade_proximas_12h: "Manter e expandir aceiro Flanco Norte",
    cenario_favoravel: "Contenção atingirá 60% até 18:00h",
    cenario_adverso: "Vento girar para N: ativar Contingência 2 (evacuação setores)",
    proximos_pu: "PO-03 iniciará 14 JAN 06:00 com reavaliação completa"
  },

  // Integração interagências
  ligacoes: [
    { agencia: "Defesa Civil", contato: "Coordenador Regional", funcao: "Alerta população" },
    { agencia: "IBAMA", contato: "Vigilância Ambiental", funcao: "Monitoramento de impacto" },
    { agencia: "Prefeitura", contato: "Proteção Civil", funcao: "Suporte logístico municipal" }
  ],

  // Informação pública
  comunicacao_publica: {
    mensagem_alerta: "Incêndio florestal em contenção - evacuar zona de risco a 500m",
    atualizacoes: "A cada 2 horas via mídias oficiais",
    contacto_midia: { porta_voz_local: null, assessoria: null },
    release: null
  }
};

// Função para carregar dados no localStorage
function initPlanoDados() {
  if (!Store.get('plano_acao_loaded')) {
    // Carregar incidente
    Store.set('argos_inc', PLANO_ACAO.incidente);
    
    // Carregar recursos
    Store.set('argos_resources', PLANO_ACAO.recursos);
    
    // Carregar missões
    Store.set('argos_missions', PLANO_ACAO.missoes);
    
    // Marcar como carregado
    Store.set('plano_acao_loaded', true);
    
    console.log('✓ Plano de Ação carregado no sistema');
  }
}

// Auto-inicialização quando página carrega
if (typeof Store !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initPlanoDados);
}
