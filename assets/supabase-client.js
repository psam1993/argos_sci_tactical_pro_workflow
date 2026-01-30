/**
 * ARGOS SCI - SUPABASE CLIENT
 * Integração completa com banco de dados e autenticação
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient = null;
let currentUser = null;
let currentIncidenteId = null;

// ===== INICIALIZAÇÃO =====
function initSupabase() {
  if (typeof supabase === 'undefined') {
    console.error('Supabase library not loaded');
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Monitorar mudanças de autenticação
    supabaseClient.auth.onAuthStateChange((event, session) => {
      currentUser = session?.user || null;
      if (event === 'SIGNED_IN') {
        console.log('Usuário autenticado:', currentUser?.email);
        loadUserProfile();
      } else if (event === 'SIGNED_OUT') {
        console.log('Usuário desconectado');
        currentUser = null;
        window.location.href = 'login.html';
      }
    });

    // Verificar sessão atual
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      currentUser = session?.user || null;
      if (currentUser) {
        loadUserProfile();
      }
    });
  }

  return supabaseClient;
}

// ===== AUTENTICAÇÃO =====
async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

async function signUp(email, password, nomeCompleto, papelSci) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        nome_completo: nomeCompleto,
        papel_sci: papelSci
      }
    }
  });

  if (error) throw error;

  // Criar perfil
  if (data.user) {
    await supabaseClient.from('profiles').insert({
      id: data.user.id,
      nome_completo: nomeCompleto,
      papel_sci: papelSci
    });
  }

  return data;
}

async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
}

async function loadUserProfile() {
  if (!currentUser) return null;

  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', currentUser.id)
    .single();

  if (error) {
    console.error('Erro ao carregar perfil:', error);
    return null;
  }

  localStorage.setItem('user_profile', JSON.stringify(data));
  return data;
}

function getCurrentUser() {
  return currentUser;
}

function getUserProfile() {
  const profile = localStorage.getItem('user_profile');
  return profile ? JSON.parse(profile) : null;
}

// ===== INCIDENTES =====
async function getIncidenteAtivo() {
  const { data, error } = await supabaseClient
    .from('incidentes')
    .select('*')
    .eq('status', 'ATIVO')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  if (data) {
    currentIncidenteId = data.id;
    localStorage.setItem('current_incidente_id', data.id);
  }

  return data;
}

async function createIncidente(incidenteData) {
  const { data, error } = await supabaseClient
    .from('incidentes')
    .insert({
      ...incidenteData,
      created_by: currentUser?.id
    })
    .select()
    .single();

  if (error) throw error;

  currentIncidenteId = data.id;
  localStorage.setItem('current_incidente_id', data.id);

  return data;
}

async function updateIncidente(id, updates) {
  const { data, error } = await supabaseClient
    .from('incidentes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ===== PERÍODOS OPERACIONAIS =====
async function getPOAtual(incidenteId) {
  const { data, error } = await supabaseClient
    .from('periodos_operacionais')
    .select('*')
    .eq('incidente_id', incidenteId || currentIncidenteId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function createPO(poData) {
  const { data, error } = await supabaseClient
    .from('periodos_operacionais')
    .insert({
      ...poData,
      incidente_id: currentIncidenteId,
      created_by: currentUser?.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function updatePO(id, updates) {
  const { data, error } = await supabaseClient
    .from('periodos_operacionais')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ===== PLANEJAMENTO =====
async function getPlanejamento(poId) {
  const { data, error } = await supabaseClient
    .from('planejamentos')
    .select('*')
    .eq('po_id', poId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function savePlanejamento(poId, planejamentoData) {
  const existing = await getPlanejamento(poId);

  if (existing) {
    const { data, error } = await supabaseClient
      .from('planejamentos')
      .update({
        ...planejamentoData,
        incidente_id: currentIncidenteId
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabaseClient
      .from('planejamentos')
      .insert({
        po_id: poId,
        incidente_id: currentIncidenteId,
        ...planejamentoData,
        created_by: currentUser?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// ===== OPERAÇÕES =====
async function getOperacoes(poId) {
  const { data, error } = await supabaseClient
    .from('operacoes')
    .select('*')
    .eq('po_id', poId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function saveOperacoes(poId, operacoesData) {
  const existing = await getOperacoes(poId);

  if (existing) {
    const { data, error } = await supabaseClient
      .from('operacoes')
      .update({
        ...operacoesData,
        incidente_id: currentIncidenteId
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabaseClient
      .from('operacoes')
      .insert({
        po_id: poId,
        incidente_id: currentIncidenteId,
        ...operacoesData,
        created_by: currentUser?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// ===== MISSÕES =====
async function getMissoes(incidenteId) {
  const { data, error } = await supabaseClient
    .from('missoes')
    .select('*')
    .eq('incidente_id', incidenteId || currentIncidenteId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

async function createMissao(missaoData) {
  const { data, error } = await supabaseClient
    .from('missoes')
    .insert({
      ...missaoData,
      incidente_id: currentIncidenteId,
      created_by: currentUser?.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function updateMissao(id, updates) {
  const { data, error } = await supabaseClient
    .from('missoes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function deleteMissao(id) {
  const { error } = await supabaseClient
    .from('missoes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===== RECURSOS =====
async function getRecursos(incidenteId) {
  const { data, error } = await supabaseClient
    .from('recursos')
    .select('*')
    .eq('incidente_id', incidenteId || currentIncidenteId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

async function createRecurso(recursoData) {
  const { data, error } = await supabaseClient
    .from('recursos')
    .insert({
      ...recursoData,
      incidente_id: currentIncidenteId,
      created_by: currentUser?.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function updateRecurso(id, updates) {
  const { data, error } = await supabaseClient
    .from('recursos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function deleteRecurso(id) {
  const { error } = await supabaseClient
    .from('recursos')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===== LOGÍSTICA =====
async function getLogistica(poId) {
  const { data, error } = await supabaseClient
    .from('logistica')
    .select('*')
    .eq('po_id', poId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function saveLogistica(poId, logisticaData) {
  const existing = await getLogistica(poId);

  if (existing) {
    const { data, error } = await supabaseClient
      .from('logistica')
      .update({
        ...logisticaData,
        incidente_id: currentIncidenteId
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabaseClient
      .from('logistica')
      .insert({
        po_id: poId,
        incidente_id: currentIncidenteId,
        ...logisticaData,
        created_by: currentUser?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// ===== SEGURANÇA =====
async function getSeguranca(poId) {
  const { data, error } = await supabaseClient
    .from('seguranca')
    .select('*')
    .eq('po_id', poId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function saveSeguranca(poId, segurancaData) {
  const existing = await getSeguranca(poId);

  if (existing) {
    const { data, error } = await supabaseClient
      .from('seguranca')
      .update({
        ...segurancaData,
        incidente_id: currentIncidenteId
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabaseClient
      .from('seguranca')
      .insert({
        po_id: poId,
        incidente_id: currentIncidenteId,
        ...segurancaData,
        created_by: currentUser?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// ===== AUDITORIA =====
async function getAuditoria(incidenteId, limit = 50) {
  const { data, error } = await supabaseClient
    .from('auditoria')
    .select('*')
    .eq('incidente_id', incidenteId || currentIncidenteId)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// ===== REALTIME =====
function subscribeToIncidente(incidenteId, callback) {
  return supabaseClient
    .channel(`incidente:${incidenteId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        filter: `incidente_id=eq.${incidenteId}`
      },
      callback
    )
    .subscribe();
}

function subscribeToMissoes(incidenteId, callback) {
  return supabaseClient
    .channel(`missoes:${incidenteId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'missoes',
        filter: `incidente_id=eq.${incidenteId}`
      },
      callback
    )
    .subscribe();
}

function subscribeToRecursos(incidenteId, callback) {
  return supabaseClient
    .channel(`recursos:${incidenteId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'recursos',
        filter: `incidente_id=eq.${incidenteId}`
      },
      callback
    )
    .subscribe();
}

// Inicializar automaticamente
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initSupabase();
  });
}

// Exportar funções
window.SupabaseDB = {
  init: initSupabase,
  auth: {
    signIn,
    signUp,
    signOut,
    getCurrentUser,
    getUserProfile
  },
  incidentes: {
    getAtivo: getIncidenteAtivo,
    create: createIncidente,
    update: updateIncidente
  },
  po: {
    getAtual: getPOAtual,
    create: createPO,
    update: updatePO
  },
  planejamento: {
    get: getPlanejamento,
    save: savePlanejamento
  },
  operacoes: {
    get: getOperacoes,
    save: saveOperacoes
  },
  missoes: {
    list: getMissoes,
    create: createMissao,
    update: updateMissao,
    delete: deleteMissao
  },
  recursos: {
    list: getRecursos,
    create: createRecurso,
    update: updateRecurso,
    delete: deleteRecurso
  },
  logistica: {
    get: getLogistica,
    save: saveLogistica
  },
  seguranca: {
    get: getSeguranca,
    save: saveSeguranca
  },
  auditoria: {
    list: getAuditoria
  },
  realtime: {
    subscribeIncidente: subscribeToIncidente,
    subscribeMissoes: subscribeToMissoes,
    subscribeRecursos: subscribeToRecursos
  }
};
