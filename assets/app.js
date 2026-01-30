
const ARGOS = {
    init() {
        this.checkAuth();
        this.loadState();
        this.setActiveNav();
        this.loadUserInfo();
        lucide.createIcons();
    },
    async checkAuth() {
        if (typeof SupabaseDB === 'undefined' || typeof window.location === 'undefined') return;

        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'login.html') return;

        try {
            const user = SupabaseDB.auth.getCurrentUser();
            if (!user) {
                window.location.href = 'login.html';
                return;
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
        }
    },
    async loadState() {
        if (typeof SupabaseDB !== 'undefined') {
            try {
                const incidente = await SupabaseDB.incidentes.getAtivo();
                if (incidente) {
                    this.inc = {
                        id: incidente.codigo,
                        name: incidente.nome,
                        status: incidente.status,
                        level: incidente.nivel_complexidade,
                        ci: incidente.comandante_nome,
                        po: 'PO-02',
                        start: new Date(incidente.data_inicio).toLocaleString('pt-BR')
                    };
                    Store.set('argos_inc', this.inc);
                    return;
                }
            } catch (error) {
                console.error('Erro ao carregar incidente:', error);
            }
        }

        this.inc = JSON.parse(localStorage.getItem('argos_inc')) || {
            id: 'SCI-2026-004',
            name: 'Incêndio Florestal - Serra Central',
            status: 'Ativo',
            level: 'Nível 2',
            ci: 'Maj. Rodrigo Silva',
            po: 'PO-02',
            start: '13 Jan 2026, 08:30'
        };
    },
    setActiveNav() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav a').forEach(a => {
            if(a.getAttribute('href') === path) a.classList.add('active');
        });
    },
    loadUserInfo() {
        if (typeof SupabaseDB === 'undefined') return;

        const profile = SupabaseDB.auth.getUserProfile();
        if (profile) {
            const initials = profile.nome_completo
                .split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();

            const userBadge = document.querySelector('.topbar [style*="width:38px"]');
            if (userBadge) {
                userBadge.textContent = initials;
                userBadge.title = `${profile.nome_completo} (${profile.papel_sci})`;
                userBadge.style.cursor = 'pointer';
                userBadge.onclick = () => this.showUserMenu();
            }
        }
    },
    showUserMenu() {
        const profile = SupabaseDB.auth.getUserProfile();
        if (!profile) return;

        const menu = `
            <div style="position:fixed; top:70px; right:30px; background:var(--card); border:1px solid var(--border); border-radius:12px; padding:16px; z-index:1000; min-width:250px; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                <div style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border);">
                    <div style="font-weight:700; margin-bottom:4px;">${profile.nome_completo}</div>
                    <div style="font-size:12px; color:var(--muted);">${profile.papel_sci}</div>
                </div>
                <button onclick="ARGOS.logout()" class="btn btn-danger" style="width:100%; padding:8px; font-size:13px;">
                    <i data-lucide="log-out" style="width:16px; height:16px;"></i> Sair
                </button>
            </div>
        `;

        const existing = document.getElementById('user-menu');
        if (existing) {
            existing.remove();
        } else {
            const div = document.createElement('div');
            div.id = 'user-menu';
            div.innerHTML = menu;
            document.body.appendChild(div);

            lucide.createIcons();

            setTimeout(() => {
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('#user-menu') && !e.target.closest('[style*="width:38px"]')) {
                        document.getElementById('user-menu')?.remove();
                    }
                }, { once: true });
            }, 100);
        }
    },
    async logout() {
        try {
            await SupabaseDB.auth.signOut();
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            this.toast('Erro ao sair do sistema');
        }
    },
    toast(msg) {
        const t = document.createElement('div');
        t.style = 'position:fixed; bottom:30px; right:30px; background:var(--brand); color:#000; padding:12px 24px; border-radius:8px; font-weight:bold; z-index:10000; box-shadow:0 10px 25px rgba(0,0,0,0.3); animation: slideUp 0.3s ease-out';
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => ARGOS.init());


// ===== Storage Helper =====
const Store = {
  get(key, fallback=null){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }catch(e){ return fallback; }
  },
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  del(key){ localStorage.removeItem(key); }
};

// ===== Workflow PO (Período Operacional) =====
const WF = {
  defaultPO(){
    return {
      id: "PO-02",
      janela: "13 JAN 2026 18:00 → 14 JAN 2026 06:00",
      status: "Rascunho", // Rascunho | Em revisão | Aprovado | Encerrado
      bloqueado: false,
      checklist: {
        plan: {done:false, note:"Objetivos, situação, riscos, estratégia e projeção"},
        ops:  {done:false, note:"Missões, setores e recursos designados"},
        log:  {done:false, note:"Suprimentos, comunicações, apoio e pendências"},
        adm:  {done:false, note:"Custos, horas, registros e contratos (quando aplicável)"},
        safety:{done:false, note:"Riscos e medidas de segurança validadas"},
        pio:  {done:false, note:"Mensagem pública alinhada (quando aplicável)"},
        lno:  {done:false, note:"Coordenação interagências / ligações (quando aplicável)"}
      },
      aprovacoes: [], // {papel, nome, quando, acao, comentario}
      versoes: []     // {v, quando, resumo, hash}
    };
  },
  getPO(){ return Store.get('wf_po', WF.defaultPO()); },
  setPO(po){ Store.set('wf_po', po); },
  setStatus(status, bloqueado=false){
    const po = WF.getPO();
    po.status = status;
    po.bloqueado = !!bloqueado;
    WF.setPO(po);
    return po;
  },
  mark(key, done, note=null){
    const po = WF.getPO();
    if(!po.checklist[key]) return po;
    po.checklist[key].done = !!done;
    if(note!==null) po.checklist[key].note = note;
    WF.setPO(po);
    return po;
  },
  addApproval({papel, nome, acao, comentario}){
    const po = WF.getPO();
    po.aprovacoes.unshift({
      papel, nome, acao,
      comentario: comentario || "",
      quando: new Date().toLocaleString('pt-BR')
    });
    WF.setPO(po);
    return po;
  },
  bumpVersion(resumo){
    const po = WF.getPO();
    const v = (po.versoes[0]?.v ?? 0) + 1;
    const payload = {
      incident: Store.get('argos_inc', null),
      planejamento: Store.get('plan_form', null),
      operacoes: Store.get('ops_form', null),
      logistica: Store.get('log_form', null),
      admfin: Store.get('adm_form', null),
      safety: Store.get('safety_form', null),
      pio: Store.get('pio_form', null),
      lno: Store.get('lno_form', null),
      recursos: Store.get('argos_resources', null),
      missões: Store.get('argos_missions', null)
    };
    const hash = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).slice(0,22);
    po.versoes.unshift({
      v,
      resumo: resumo || "Atualização",
      quando: new Date().toLocaleString('pt-BR'),
      hash
    });
    WF.setPO(po);
    return po;
  }
};

function isLocked(){
  const po = WF.getPO();
  return po.bloqueado || po.status === 'Encerrado';
}

function getProgress(){
  return Store.get('secProgress', {plan:false, ops:false, log:false, adm:false, safety:false, pio:false});
}
function setProgress(p){ Store.set('secProgress', p); }
function markProgress(key, done){
  const p = getProgress();
  p[key] = !!done;
  setProgress(p);
  // Mantém checklist sincronizado
  WF.mark(key, !!done);
}


// ===== Regras dinâmicas por Nível (gates obrigatórios) =====
function getIncidentLevel(){
  const inc = Store.get('argos_inc', ARGOS.inc || null);
  return (inc && inc.level) ? inc.level : 'Nível 2';
}

// Gates obrigatórios por nível (dinâmico)
function requiredGates(level=getIncidentLevel()){
  if(level === 'Nível 1'){
    // SCI enxuto: CI acumula; exige o mínimo para executar com segurança básica
    return ['plan','ops']; // logística e segurança podem ser registradas, mas não travam aprovação
  }
  if(level === 'Nível 2'){
    return ['plan','ops','log','safety'];
  }
  // Nível 3 (complexo)
  return ['plan','ops','log','safety','adm','pio','lno'];
}

// Utilitário: valida se gates obrigatórios estão OK
function requiredGatesOK(){
  const po = WF.getPO();
  const req = requiredGates();
  return req.every(k => po.checklist[k] && po.checklist[k].done);
}
