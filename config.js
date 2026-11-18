// ============================================================
// UP Co. Suite — CLIENT_CONFIG · CÓPIA DE DEMONSTRAÇÃO
// ============================================================
// Esta pasta é só para apresentação. A empresa abaixo é FICTÍCIA.
// A suíte de operação fica em up-suite-v1.5 / up-suite-online.
// ============================================================

const DEMO_MODE = true; // nunca usar esta pasta em operação

const CLIENT_CONFIG = {
  // ── Identidade (empresa fictícia) ──────────────────────
  empresa_id:           'demo-navalha',
  empresa:              'Barbearia Navalha & Cia',
  setor:                'Barbearia',
  porte:                'pequena',
  cidade:               'São Paulo, SP',
  tempo_mercado:        '5 anos',

  // ── Financeiro ──────────────────────────────────────────
  faturamento_estimado: 'R$ 62.000/mês',
  ticket_medio:         'R$ 70',
  meta_mrr:             65000,
  saldo_inicial:        6000,

  // ── Comercial ───────────────────────────────────────────
  publico_alvo:         'Homens do bairro e de empresas próximas que querem corte e barba com hora marcada',
  principais_servicos:  [
    'Corte e barba',
    'Planos mensais e convênio para empresas',
    'Venda de pomadas e produtos no balcão',
  ],
  sazonalidade:         'Pico em dezembro (festas e casamentos) e antes do Dia dos Pais. Movimento cai em janeiro.',

  // ── Estratégia ──────────────────────────────────────────
  dores_mapeadas: [
    'O dono não sabia quanto entrava no mês até o contador fechar',
    'Pomada acabando no balcão sem pedido feito',
    'Cliente que sumia sem ninguém perceber',
  ],
  objetivos: [
    'Chegar a R$ 65 mil/mês de receita até dezembro',
    'Passar dos planos mensais de 30% para 40% da receita',
    'Nunca deixar uma pomada chegar a zero no balcão',
  ],
  kpis_criticos: [
    'Receita do mês vs meta',
    'Planos mensais ativos',
    'Produtos abaixo do estoque mínimo',
  ],

  painel_interno:       false,

  // ── Comunicação ─────────────────────────────────────────
  tom_voz: 'Direto, parceiro, sem enrolação. Fala como quem resolve, não como quem explica.',
  contexto_adicional: 'Empresa fictícia da demonstração. O dono é o barbeiro Rodrigo Teles; o consultor da UP Co. acompanha a operação toda semana.',

  // ── WhatsApp (na demonstração nenhum WhatsApp é aberto — ver tour.js) ──
  whatsapp_phone:       '+55 (11) 90000-1010',
  whatsapp_atendimento: '+55 (11) 90000-2020',
  evolution_api_url:    '',

  // ── UP·Voice ────────────────────────────────────────────
  rafael_whatsapp:      '+55 (11) 90000-3030',
  voice_daily_limit:    1,
  voice_require_approval: true,
};

// ── Aplicar brand color dinamicamente ──────────────────────
const BRAND = {
  bg:     '#0F0F0F',
  bg2:    '#161616',
  bg3:    '#1E1E1E',
  text:   '#F2F2F2',
  muted:  '#8A8A8A',
  dim:    '#4A4A4A',
  teal:   '#57999B',
  border: '#2A2A2A',
  green:  '#27AE60',
  amber:  '#F5A623',
  red:    '#E74C3C',
};

(function applyBrand() {
  const r = document.documentElement;
  Object.entries(BRAND).forEach(([k, v]) => r.style.setProperty(`--${k}`, v));
  const hex = (h, a) => h + Math.round(a * 255).toString(16).padStart(2, '0');
  r.style.setProperty('--teal-12',  hex(BRAND.teal, .12));
  r.style.setProperty('--teal-22',  hex(BRAND.teal, .22));
  r.style.setProperty('--green-12', hex(BRAND.green, .12));
  r.style.setProperty('--red-12',   hex(BRAND.red, .12));
  r.style.setProperty('--amber-12', hex(BRAND.amber, .12));
})();
