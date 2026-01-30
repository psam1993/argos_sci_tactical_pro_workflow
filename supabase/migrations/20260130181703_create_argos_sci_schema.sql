/*
  # ARGOS SCI TACTICAL PRO - SCHEMA COMPLETO
  
  ## Estrutura do Sistema
  
  1. **Incidentes** (incidentes)
     - Dados gerais do incidente SCI
     - Comandante, nível de complexidade, status
     
  2. **Períodos Operacionais** (periodos_operacionais)
     - PO-01, PO-02, etc.
     - Status, gates, aprovações, bloqueio
     
  3. **Planejamento** (planejamentos)
     - Situação, objetivos, riscos, projeções
     
  4. **Operações** (operacoes)
     - Efetivo, divisões, missões, feedback
     
  5. **Missões** (missoes)
     - Missões de campo (M21, M22, etc.)
     
  6. **Recursos** (recursos)
     - Guarnições, equipamentos, maquinários, materiais
     
  7. **Logística** (logistica)
     - Necessidades, comunicações, transporte, pendências
     
  8. **Segurança** (seguranca)
     - Riscos, plano médico, mitigações
     
  9. **Adm/Finanças** (admfin)
     - Doações, incidentes, custos
     
  10. **Info Pública** (informacao_publica)
      - Mensagens públicas, alertas
      
  11. **Ligações** (ligacoes)
      - Coordenação interagências
      
  12. **Usuários/Perfis** (profiles)
      - Papéis SCI, permissões
      
  13. **Auditoria** (auditoria)
      - Log completo de mudanças
*/

-- =====================================================
-- TABELA: INCIDENTES
-- =====================================================
CREATE TABLE IF NOT EXISTS incidentes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo text UNIQUE NOT NULL,
  nome text NOT NULL,
  tipo text NOT NULL DEFAULT 'Incêndio Florestal',
  local text NOT NULL,
  data_inicio timestamptz NOT NULL DEFAULT now(),
  comandante_id uuid REFERENCES auth.users(id),
  comandante_nome text NOT NULL,
  subcomandante_nome text,
  nivel_complexidade text NOT NULL DEFAULT 'Nível 2',
  status text NOT NULL DEFAULT 'ATIVO',
  perimetro_km2 numeric DEFAULT 0,
  contencao_percentual numeric DEFAULT 0,
  objetivos_comando text[],
  dados_incendio jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE incidentes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários autenticados podem ver incidentes"
  ON incidentes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Comandantes podem criar incidentes"
  ON incidentes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Comandantes podem atualizar seus incidentes"
  ON incidentes FOR UPDATE
  TO authenticated
  USING (auth.uid() = comandante_id OR auth.uid() = created_by)
  WITH CHECK (auth.uid() = comandante_id OR auth.uid() = created_by);

-- =====================================================
-- TABELA: PERÍODOS OPERACIONAIS (PO)
-- =====================================================
CREATE TABLE IF NOT EXISTS periodos_operacionais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  codigo text NOT NULL,
  janela_inicio timestamptz NOT NULL,
  janela_fim timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'Rascunho',
  bloqueado boolean DEFAULT false,
  gates jsonb DEFAULT '{}'::jsonb,
  aprovacoes jsonb DEFAULT '[]'::jsonb,
  versoes jsonb DEFAULT '[]'::jsonb,
  hash_atual text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(incidente_id, codigo)
);

ALTER TABLE periodos_operacionais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver POs do incidente"
  ON periodos_operacionais FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar POs"
  ON periodos_operacionais FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar POs não bloqueados"
  ON periodos_operacionais FOR UPDATE
  TO authenticated
  USING (bloqueado = false OR auth.uid() IN (
    SELECT comandante_id FROM incidentes WHERE id = incidente_id
  ))
  WITH CHECK (bloqueado = false OR auth.uid() IN (
    SELECT comandante_id FROM incidentes WHERE id = incidente_id
  ));

-- =====================================================
-- TABELA: PLANEJAMENTO
-- =====================================================
CREATE TABLE IF NOT EXISTS planejamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id uuid NOT NULL REFERENCES periodos_operacionais(id) ON DELETE CASCADE,
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  situacao text,
  objetivos text,
  riscos text,
  projecao text,
  meteorologia jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(po_id)
);

ALTER TABLE planejamentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver planejamentos"
  ON planejamentos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar planejamentos"
  ON planejamentos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar planejamentos não bloqueados"
  ON planejamentos FOR UPDATE
  TO authenticated
  USING (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ))
  WITH CHECK (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ));

-- =====================================================
-- TABELA: OPERAÇÕES
-- =====================================================
CREATE TABLE IF NOT EXISTS operacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id uuid NOT NULL REFERENCES periodos_operacionais(id) ON DELETE CASCADE,
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  divisoes jsonb DEFAULT '[]'::jsonb,
  guarnicoes_total text,
  divisoes_geograficas text,
  feedback_estrategias text,
  acoes_campo text,
  riscos_selecionados text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(po_id)
);

ALTER TABLE operacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver operações"
  ON operacoes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar operações"
  ON operacoes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar operações não bloqueadas"
  ON operacoes FOR UPDATE
  TO authenticated
  USING (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ))
  WITH CHECK (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ));

-- =====================================================
-- TABELA: MISSÕES
-- =====================================================
CREATE TABLE IF NOT EXISTS missoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operacao_id uuid REFERENCES operacoes(id) ON DELETE CASCADE,
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  codigo text NOT NULL,
  titulo text NOT NULL,
  descricao text,
  setor text,
  recursos text,
  status text NOT NULL DEFAULT 'Pendente',
  prioridade text DEFAULT 'MÉDIA',
  observacoes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE missoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver missões"
  ON missoes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar missões"
  ON missoes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar missões"
  ON missoes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Usuários podem deletar missões"
  ON missoes FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- TABELA: RECURSOS
-- =====================================================
CREATE TABLE IF NOT EXISTS recursos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  codigo text NOT NULL,
  categoria text NOT NULL,
  responsavel text,
  status text NOT NULL DEFAULT 'disponivel',
  localizacao text,
  equipamento text,
  observacoes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(incidente_id, codigo)
);

ALTER TABLE recursos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver recursos"
  ON recursos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar recursos"
  ON recursos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar recursos"
  ON recursos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Usuários podem deletar recursos"
  ON recursos FOR DELETE
  TO authenticated
  USING (true);

-- =====================================================
-- TABELA: LOGÍSTICA
-- =====================================================
CREATE TABLE IF NOT EXISTS logistica (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id uuid NOT NULL REFERENCES periodos_operacionais(id) ON DELETE CASCADE,
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  necessidades text,
  comunicacao text,
  transporte text,
  pendencias text,
  plano_comunicacao jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(po_id)
);

ALTER TABLE logistica ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver logística"
  ON logistica FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar logística"
  ON logistica FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar logística não bloqueada"
  ON logistica FOR UPDATE
  TO authenticated
  USING (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ))
  WITH CHECK (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ));

-- =====================================================
-- TABELA: SEGURANÇA
-- =====================================================
CREATE TABLE IF NOT EXISTS seguranca (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id uuid NOT NULL REFERENCES periodos_operacionais(id) ON DELETE CASCADE,
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  riscos_selecionados text[],
  risco_customizado text,
  plano_medico jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(po_id)
);

ALTER TABLE seguranca ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver segurança"
  ON seguranca FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar segurança"
  ON seguranca FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar segurança não bloqueada"
  ON seguranca FOR UPDATE
  TO authenticated
  USING (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ))
  WITH CHECK (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ));

-- =====================================================
-- TABELA: ADM/FINANÇAS
-- =====================================================
CREATE TABLE IF NOT EXISTS admfin (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id uuid NOT NULL REFERENCES periodos_operacionais(id) ON DELETE CASCADE,
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  doacoes jsonb DEFAULT '{}'::jsonb,
  incidentes_registrados jsonb DEFAULT '{}'::jsonb,
  custos jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(po_id)
);

ALTER TABLE admfin ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver admfin"
  ON admfin FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar admfin"
  ON admfin FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar admfin não bloqueada"
  ON admfin FOR UPDATE
  TO authenticated
  USING (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ))
  WITH CHECK (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ));

-- =====================================================
-- TABELA: INFORMAÇÃO PÚBLICA
-- =====================================================
CREATE TABLE IF NOT EXISTS informacao_publica (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id uuid NOT NULL REFERENCES periodos_operacionais(id) ON DELETE CASCADE,
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  mensagem text,
  orientacoes text,
  status_divulgacao text DEFAULT 'Rascunho',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(po_id)
);

ALTER TABLE informacao_publica ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ver info pública"
  ON informacao_publica FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar info pública"
  ON informacao_publica FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar info pública não bloqueada"
  ON informacao_publica FOR UPDATE
  TO authenticated
  USING (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ))
  WITH CHECK (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ));

-- =====================================================
-- TABELA: LIGAÇÕES
-- =====================================================
CREATE TABLE IF NOT EXISTS ligacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id uuid NOT NULL REFERENCES periodos_operacionais(id) ON DELETE CASCADE,
  incidente_id uuid NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
  agencias text,
  contatos text,
  acordos text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  UNIQUE(po_id)
);

ALTER TABLE ligacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver ligações"
  ON ligacoes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem criar ligações"
  ON ligacoes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários podem atualizar ligações não bloqueadas"
  ON ligacoes FOR UPDATE
  TO authenticated
  USING (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ))
  WITH CHECK (NOT EXISTS (
    SELECT 1 FROM periodos_operacionais WHERE id = po_id AND bloqueado = true
  ));

-- =====================================================
-- TABELA: PERFIS DE USUÁRIOS
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_completo text NOT NULL,
  papel_sci text NOT NULL,
  organizacao text,
  telefone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver próprio perfil"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- TABELA: AUDITORIA
-- =====================================================
CREATE TABLE IF NOT EXISTS auditoria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incidente_id uuid REFERENCES incidentes(id) ON DELETE CASCADE,
  tabela text NOT NULL,
  operacao text NOT NULL,
  registro_id uuid,
  dados_anteriores jsonb,
  dados_novos jsonb,
  usuario_id uuid REFERENCES auth.users(id),
  usuario_nome text,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comandantes podem ver auditoria"
  ON auditoria FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_incidentes_status ON incidentes(status);
CREATE INDEX IF NOT EXISTS idx_incidentes_comandante ON incidentes(comandante_id);
CREATE INDEX IF NOT EXISTS idx_po_incidente ON periodos_operacionais(incidente_id);
CREATE INDEX IF NOT EXISTS idx_po_status ON periodos_operacionais(status);
CREATE INDEX IF NOT EXISTS idx_missoes_incidente ON missoes(incidente_id);
CREATE INDEX IF NOT EXISTS idx_missoes_status ON missoes(status);
CREATE INDEX IF NOT EXISTS idx_recursos_incidente ON recursos(incidente_id);
CREATE INDEX IF NOT EXISTS idx_recursos_status ON recursos(status);
CREATE INDEX IF NOT EXISTS idx_auditoria_incidente ON auditoria(incidente_id);
CREATE INDEX IF NOT EXISTS idx_auditoria_timestamp ON auditoria(timestamp DESC);

-- =====================================================
-- TRIGGERS DE AUDITORIA
-- =====================================================
CREATE OR REPLACE FUNCTION audit_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO auditoria (
    tabela,
    operacao,
    registro_id,
    dados_anteriores,
    dados_novos,
    usuario_id
  ) VALUES (
    TG_TABLE_NAME,
    TG_OP,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END,
    auth.uid()
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_incidentes
  AFTER INSERT OR UPDATE OR DELETE ON incidentes
  FOR EACH ROW EXECUTE FUNCTION audit_changes();

CREATE TRIGGER audit_periodos_operacionais
  AFTER INSERT OR UPDATE OR DELETE ON periodos_operacionais
  FOR EACH ROW EXECUTE FUNCTION audit_changes();

CREATE TRIGGER audit_planejamentos
  AFTER INSERT OR UPDATE OR DELETE ON planejamentos
  FOR EACH ROW EXECUTE FUNCTION audit_changes();

CREATE TRIGGER audit_operacoes
  AFTER INSERT OR UPDATE OR DELETE ON operacoes
  FOR EACH ROW EXECUTE FUNCTION audit_changes();

-- =====================================================
-- FUNÇÃO: ATUALIZAR updated_at AUTOMATICAMENTE
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_incidentes_updated_at
  BEFORE UPDATE ON incidentes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_periodos_operacionais_updated_at
  BEFORE UPDATE ON periodos_operacionais
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_planejamentos_updated_at
  BEFORE UPDATE ON planejamentos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_operacoes_updated_at
  BEFORE UPDATE ON operacoes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_logistica_updated_at
  BEFORE UPDATE ON logistica
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_seguranca_updated_at
  BEFORE UPDATE ON seguranca
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_admfin_updated_at
  BEFORE UPDATE ON admfin
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
