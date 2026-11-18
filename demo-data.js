// ============================================================
// UP Co. Suite — Dados de demonstração · Barbearia Navalha & Cia (FICTÍCIA)
// ============================================================
// Usados SOMENTE com DEMO_MODE = true. Pessoas, empresas e números
// são inventados. As datas são relativas a hoje, para a demo estar
// sempre "viva" em qualquer dia em que for apresentada.
// SUITE_TEMPLATES (fim do arquivo) são modelos importáveis no Base e no Core.
// Novidade desta cópia: seeds "estoque", "pedidos_stars" e "vendas".
// ============================================================

(function initDemoData() {
  const U = window.Suite.U;
  const T = U.today();
  const DAY = Number(T.slice(8, 10));
  const d = n => U.addDays(T, n);                                   // hoje + n dias
  const ts = (n, h = 9) => `${d(n)}T${String(h).padStart(2, '0')}:00:00`;
  const week = n => U.isoWeek(d(n * 7));
  // Os dados ficam no navegador com as datas do dia em que foram criados.
  // Num dia novo, recomeça do zero para a demo continuar 'viva'.
  try {
    const prefix = 'upco_' + CLIENT_CONFIG.empresa_id + '_', dayKey = prefix + '_dia_da_demo';
    if (localStorage.getItem(dayKey) !== T) {
      Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k));
      localStorage.setItem(dayKey, T);
    }
  } catch { /* sem localStorage: os dados vivem só nesta aba */ }
  const monthStart = off => { const dt = U.parseDate(T.slice(0, 8) + '01'); dt.setMonth(dt.getMonth() + off); return U.iso(dt); };
  const md = (off, day) => U.addDays(monthStart(off), day - 1);
  const cm = frac => U.addDays(monthStart(0), Math.floor(frac * (DAY - 1)));

  // ── UP·Vault — 3 meses de caixa ─────────────────────────
  let tid = 0;
  const tx = (tipo, status, descricao, valor, data, categoria) => ({ id: 't' + (++tid), tipo, status, descricao, valor, data, categoria });
  const despesasFixas = (when, comissoes) => [
    tx('despesa', 'pago', 'Comissão dos barbeiros', comissoes, when(5), 'Pessoal'),
    tx('despesa', 'pago', 'Salário da recepção e administrativo', 5200, when(5), 'Pessoal'),
    tx('despesa', 'pago', 'Aluguel do ponto', 4800, when(10), 'Infraestrutura'),
    tx('despesa', 'pago', 'Impostos (Simples Nacional)', 3100, when(20), 'Impostos'),
    tx('despesa', 'pago', 'Compra de insumos (lâminas, capas, higienização)', 1900, when(8), 'Estoque / Produtos'),
    tx('despesa', 'pago', 'UP Co. Suite — mensalidade', 390, when(10), 'Software / Ferramentas'),
    tx('despesa', 'pago', 'Meta Ads — campanhas do Instagram', 1200, when(12), 'Marketing'),
    tx('despesa', 'pago', 'Contabilidade', 650, when(15), 'Outros'),
    tx('despesa', 'pago', 'Retirada do dono (pró-labore)', 8000, when(25), 'Pessoal'),
  ];
  const transacoes = [
    // mês retrasado
    tx('receita', 'pago', 'Cortes e barbas — semana 1', 12400, md(-2, 7), 'Serviços prestados'),
    tx('receita', 'pago', 'Cortes e barbas — semana 2', 13100, md(-2, 14), 'Serviços prestados'),
    tx('receita', 'pago', 'Cortes e barbas — semana 3', 12800, md(-2, 21), 'Serviços prestados'),
    tx('receita', 'pago', 'Cortes e barbas — semana 4', 13500, md(-2, 28), 'Serviços prestados'),
    tx('receita', 'pago', 'Planos mensais (assinaturas)', 7200, md(-2, 5), 'Serviços prestados'),
    tx('receita', 'pago', 'Pomadas e produtos no balcão', 3600, md(-2, 26), 'Vendas de produtos'),
    ...despesasFixas(day => md(-2, day), 17200),
    // mês passado
    tx('receita', 'pago', 'Cortes e barbas — semana 1', 13900, md(-1, 7), 'Serviços prestados'),
    tx('receita', 'pago', 'Cortes e barbas — semana 2', 14300, md(-1, 14), 'Serviços prestados'),
    tx('receita', 'pago', 'Cortes e barbas — semana 3', 14100, md(-1, 21), 'Serviços prestados'),
    tx('receita', 'pago', 'Cortes e barbas — semana 4', 14800, md(-1, 28), 'Serviços prestados'),
    tx('receita', 'pago', 'Planos mensais (assinaturas)', 8400, md(-1, 5), 'Serviços prestados'),
    tx('receita', 'pago', 'Pomadas e produtos no balcão', 4300, md(-1, 26), 'Vendas de produtos'),
    ...despesasFixas(day => md(-1, day), 18600),
    // este mês — pagos até hoje
    tx('receita', 'pago', 'Cortes e barbas — semana 1', 14600, cm(.2), 'Serviços prestados'),
    tx('receita', 'pago', 'Cortes e barbas — semana 2', 15100, cm(.45), 'Serviços prestados'),
    tx('receita', 'pago', 'Planos mensais (assinaturas)', 9300, cm(.1), 'Serviços prestados'),
    tx('receita', 'pago', 'Pacote de padrinhos — casamento Thales', 1800, cm(.6), 'Serviços prestados'),
    tx('receita', 'pago', 'Pomadas e produtos no balcão', 3900, cm(.8), 'Vendas de produtos'),
    tx('receita', 'pago', 'Cortes e barbas — semana 3', 15400, cm(1), 'Serviços prestados'),
    tx('despesa', 'pago', 'Comissão dos barbeiros', 19300, cm(.15), 'Pessoal'),
    tx('despesa', 'pago', 'Salário da recepção e administrativo', 5200, cm(.15), 'Pessoal'),
    tx('despesa', 'pago', 'Aluguel do ponto', 4800, cm(.3), 'Infraestrutura'),
    tx('despesa', 'pago', 'Compra de insumos (lâminas, capas, higienização)', 1900, cm(.25), 'Estoque / Produtos'),
    tx('despesa', 'pago', 'Reposição de pomadas — pedido Stars #1042', 2150, cm(.35), 'Estoque / Produtos'),
    tx('despesa', 'pago', 'UP Co. Suite — mensalidade', 390, cm(.3), 'Software / Ferramentas'),
    tx('despesa', 'pago', 'Meta Ads — campanhas do Instagram', 1200, cm(.4), 'Marketing'),
    tx('despesa', 'pago', 'Contabilidade', 650, cm(.5), 'Outros'),
    tx('despesa', 'pago', 'Retirada do dono (pró-labore)', 8000, cm(.55), 'Pessoal'),
    // a pagar / a receber
    tx('despesa', 'pendente', 'Impostos (Simples Nacional)', 3300, d(2), 'Impostos'),
    tx('despesa', 'pendente', 'Bancada — pedido Stars #1043 (capas e borrifadores)', 340, d(5), 'Estoque / Produtos'),
    tx('despesa', 'pendente', 'Manutenção das cadeiras', 600, d(9), 'Infraestrutura'),
    tx('receita', 'pendente', 'Convênio Lemos & Filhos — 1º mês', 2700, d(3), 'Serviços prestados'),
    tx('receita', 'pendente', 'Planos mensais — renovações da semana', 2100, d(6), 'Serviços prestados'),
    tx('receita', 'pendente', 'Cortes e barbas — semana 4', 15000, d(10), 'Serviços prestados'),
  ];

  // ── UP·Lead — clientes e vendas ─────────────────────────
  const chat = (...msgs) => msgs.map(([dir, text, time]) => ({ dir: dir === '>' ? 'inbound' : 'outbound', text, time }));
  const leads = [
    { id: 'l1', nome: 'Rafael Nunes', canal: 'WhatsApp', temperatura: 'quente', prioridade: 5, status: 'open', lead_score: 88,
      mensagem_original: 'Vi o antes e depois do degradê (P-016). Tem plano mensal de corte e barba?',
      proximo_passo: 'Fechar o plano mensal com 4 visitas',
      ai_intencao: 'Quer cortar toda semana e barba quinzenal; trabalha perto da barbearia.',
      ai_qualificacao: 'Perfil ideal para plano mensal. Só falta escolher o barbeiro.',
      criado_em: d(-9), ultima_interacao: ts(-3, 18), post_codigo: 'P-016', post_ponto: 'S', post_origem: 'codigo',
      historico: chat(
        ['>', 'Vi o antes e depois do degradê (P-016-S). Tem plano mensal de corte e barba?', '10:12'],
        ['<', 'Oi, Rafael! Temos sim: 4 visitas por mês, com horário garantido. Você prefere corte toda semana?', '10:20'],
        ['>', 'Corte toda semana e barba a cada 15 dias.', '10:31'],
        ['<', 'Fecha em R$ 289/mês. Posso reservar quinta às 18h para a primeira visita?', '10:33'],
        ['>', 'Quinta serve. Dá para escolher o barbeiro?', '18:05'],
      ) },
    { id: 'l2', nome: 'Gustavo Lemos — Lemos & Filhos Advocacia', canal: 'Indicação', temperatura: 'quente', prioridade: 5, status: 'open', lead_score: 92,
      mensagem_original: 'Meu sócio indicou vocês. Quero um convênio para os 15 funcionários do escritório.',
      proximo_passo: 'Fechar condições do convênio — quer faturar tudo no mesmo boleto',
      ai_intencao: 'Benefício corporativo recorrente para 15 pessoas.',
      ai_qualificacao: 'Alta intenção, decisor único, veio por indicação de cliente satisfeito.',
      criado_em: d(-16), ultima_interacao: ts(-1, 17), post_codigo: 'P-011', post_ponto: 'B', post_origem: 'codigo',
      historico: chat(
        ['>', 'Boa tarde. Meu sócio indicou vocês. Quero um convênio para os 15 funcionários do escritório.', '14:02'],
        ['<', 'Boa tarde, Gustavo! Funciona com horário livre e fatura única no fim do mês. Quantos cortes por pessoa?', '14:10'],
        ['>', 'Um corte por mês, alguns com barba.', '14:22'],
        ['<', 'Envio a proposta até sexta com valor por pessoa.', '14:25'],
        ['>', 'Gostei. Dá para faturar tudo num boleto só?', '17:40'],
      ) },
    { id: 'l3', nome: 'Thales Moura — pacote de padrinhos', canal: 'Instagram DM', temperatura: 'morno', prioridade: 3, status: 'open', lead_score: 64,
      mensagem_original: 'Vou casar em dezembro. Vocês atendem 6 padrinhos no mesmo dia?',
      proximo_passo: 'Montar pacote para 6 pessoas e reservar a data',
      ai_intencao: 'Pacote de noivo e padrinhos para o dia anterior ao casamento.',
      ai_qualificacao: 'Bom ticket único; confirmar a data antes de reservar a agenda.',
      criado_em: d(-6), ultima_interacao: ts(-1, 11), post_codigo: 'P-014', post_ponto: null, post_origem: 'informado',
      historico: chat(
        ['>', 'Vou casar em dezembro. Vocês atendem 6 padrinhos no mesmo dia?', '20:15'],
        ['<', 'Oi, Thales! Atendemos sim, com duas cadeiras ao mesmo tempo. Qual a data?', '09:02'],
        ['>', 'Dia 12 de dezembro, pela manhã.', '11:30'],
      ) },
    { id: 'l4', nome: 'Marta Prado — Academia Corpo Ativo', canal: 'Formulário', temperatura: 'morno', prioridade: 4, status: 'pending', lead_score: 71,
      mensagem_original: 'Queremos uma parceria: alunos da academia com desconto na barbearia.',
      proximo_passo: 'Cobrar retorno da proposta de parceria enviada',
      ai_intencao: 'Parceria de indicação com a academia do bairro, com desconto mútuo.',
      ai_qualificacao: 'Potencial de recorrência. Decisão passa pelos sócios da academia.',
      criado_em: d(-21), ultima_interacao: ts(-9, 16),
      historico: chat(
        ['>', 'Queremos uma parceria: alunos da academia com desconto na barbearia.', '16:00'],
        ['<', 'Adorei a ideia, Marta! Envio uma proposta de 10% de desconto nos dois sentidos.', '16:40'],
      ) },
    { id: 'l5', nome: 'Diogo Farias', canal: 'WhatsApp', temperatura: 'morno', prioridade: 3, status: 'open', lead_score: 58,
      mensagem_original: 'Vocês fazem barba terapia? Quanto fica?',
      proximo_passo: 'Marcar horário de barba terapia com o Marcelo',
      ai_intencao: 'Quer experimentar o serviço de barba com toalha quente.', ai_qualificacao: 'Ticket menor, bom para encaixe na agenda.',
      criado_em: d(-2), ultima_interacao: ts(-2, 21), post_codigo: 'P-014', post_ponto: 'D', post_origem: 'codigo',
      historico: chat(['>', 'Oi! Vim pelo P-014-D. Vocês fazem barba terapia? Quanto fica?', '21:10']) },
    { id: 'l6', nome: 'Escola de Idiomas Fluent', canal: 'Instagram DM', temperatura: 'frio', prioridade: 2, status: 'open', lead_score: 40,
      mensagem_original: 'Estamos avaliando um dia de cuidados para os professores no fim do ano.',
      proximo_passo: 'Retomar contato em novembro', ai_intencao: 'Ação de fim de ano para a equipe.', ai_qualificacao: 'Sem urgência; manter aquecido.',
      criado_em: d(-12), ultima_interacao: ts(-11, 15),
      historico: chat(['>', 'Estamos avaliando um dia de cuidados para os professores no fim do ano. Podemos conversar?', '15:00']) },
    { id: 'l7', nome: 'Igor Castro', canal: 'WhatsApp', temperatura: 'frio', prioridade: 1, status: 'open', lead_score: 15,
      mensagem_original: 'Vocês fazem tatuagem ou só corte?',
      proximo_passo: 'Responder que não fazemos — fora do escopo', ai_intencao: 'Procura estúdio de tatuagem.', ai_qualificacao: 'Fora do perfil.',
      criado_em: d(-1), ultima_interacao: ts(-1, 13),
      historico: chat(['>', 'Oi, vocês fazem tatuagem ou só corte?', '13:20']) },
    { id: 'l8', nome: 'Eduardo Pires', canal: 'Indicação', temperatura: 'morno', prioridade: 3, status: 'open', lead_score: 66,
      mensagem_original: 'O Rafael me passou seu contato. Quero experimentar antes de assinar o plano.',
      proximo_passo: 'Oferecer o primeiro corte com desconto', ai_intencao: 'Cliente novo que veio por indicação.', ai_qualificacao: 'Indicação de cliente; boa chance de plano.',
      criado_em: d(-3), ultima_interacao: ts(-2, 10),
      historico: chat(
        ['>', 'O Rafael me passou seu contato. Quero experimentar antes de assinar o plano.', '10:05'],
        ['<', 'Claro, Eduardo! O primeiro corte sai com 20% de desconto. Qual dia fica bom?', '10:30'],
      ) },
    { id: 'l9', nome: 'Beto Almeida', canal: 'Instagram DM', temperatura: 'quente', prioridade: 4, status: 'open', lead_score: 80,
      mensagem_original: 'Amei o degradê do P-006-B. Moro aqui do lado e quero o plano.',
      proximo_passo: 'Cliente — plano ativo', ai_intencao: 'Plano mensal completo.', ai_qualificacao: 'Fechou.',
      criado_em: d(-40), ultima_interacao: ts(-15, 14), post_codigo: 'P-006', post_ponto: 'B', post_origem: 'codigo',
      historico: chat(['>', 'Amei o degradê do P-006-B. Moro aqui do lado e quero o plano.', '19:30'], ['<', 'Que bom, Beto! Vamos agendar a primeira visita?', '19:45']) },
    { id: 'l10', nome: 'Condomínio Parque das Flores', canal: 'Formulário', temperatura: 'quente', prioridade: 4, status: 'open', lead_score: 78,
      mensagem_original: 'Queremos um dia de barbearia no salão de festas para os moradores.',
      proximo_passo: 'Evento realizado — cliente recorrente', ai_intencao: 'Evento mensal no condomínio.', ai_qualificacao: 'Fechou.',
      criado_em: d(-34), ultima_interacao: ts(-12, 11), post_codigo: 'P-004', post_ponto: null, post_origem: 'informado',
      historico: chat(['>', 'Queremos um dia de barbearia no salão de festas para os moradores.', '08:50']) },
    { id: 'l11', nome: 'Família Tanaka', canal: 'WhatsApp', temperatura: 'quente', prioridade: 4, status: 'open', lead_score: 82,
      mensagem_original: 'Vi o vídeo do plano família (P-009-S). Somos pai e dois filhos.',
      proximo_passo: 'Cliente — plano família ativo', ai_intencao: 'Plano família para 3 pessoas.', ai_qualificacao: 'Fechou.',
      criado_em: d(-30), ultima_interacao: ts(-20, 16), post_codigo: 'P-009', post_ponto: 'S', post_origem: 'codigo',
      historico: chat(['>', 'Vi o vídeo do plano família (P-009-S). Somos pai e dois filhos.', '16:00']) },
    { id: 'l12', nome: 'Gustavo Reis', canal: 'WhatsApp', temperatura: 'frio', prioridade: 1, status: 'closed', lead_score: 30,
      mensagem_original: 'Quanto custa o plano mensal?',
      proximo_passo: 'Perdido — achou o valor alto', ai_intencao: 'Comparando preço.', ai_qualificacao: 'Sensível a preço.',
      criado_em: d(-28), ultima_interacao: ts(-14, 10),
      historico: chat(['>', 'Quanto custa o plano mensal?', '10:00'], ['>', 'Obrigado, mas achei acima do que posso agora.', '10:30']) },
  ].map(l => ({ telefone: '', ...l }));

  const deal = (id, titulo, lead_id, valor, criado, movido) => ({ id, titulo, lead_id, lead: leads.find(l => l.id === lead_id)?.nome || titulo, valor, criado_em: criado, movido_em: movido });
  const pipeline = [
    { id: 'st1', nome: 'Novo',        cor: '#57999B', deals: [
      deal('dl1', 'Barba terapia — Diogo Farias', 'l5', 90, ts(-2), ts(-2)),
      deal('dl2', 'Primeiro corte — Eduardo Pires', 'l8', 289, ts(-3), ts(-3)),
      deal('dl3', 'Dia de cuidados — Escola Fluent', 'l6', 1800, ts(-12), ts(-12)),
    ] },
    { id: 'st2', nome: 'Qualificado', cor: '#8B5CF6', deals: [deal('dl4', 'Pacote de padrinhos — Thales', 'l3', 1800, ts(-6), ts(-4))] },
    { id: 'st3', nome: 'Proposta',    cor: '#F5A623', deals: [
      deal('dl5', 'Parceria Academia Corpo Ativo', 'l4', 3200, ts(-21), ts(-9)),
      deal('dl6', 'Plano mensal — Rafael Nunes', 'l1', 3468, ts(-9), ts(-3)),
    ] },
    { id: 'st4', nome: 'Negociação',  cor: '#27AE60', deals: [deal('dl7', 'Convênio 15 pessoas — Lemos & Filhos', 'l2', 32400, ts(-16), ts(-1))] },
    { id: 'st5', nome: 'Ganho ✓',     cor: '#27AE60', deals: [
      deal('dl8', 'Plano família — Tanaka', 'l11', 6300, ts(-30), `${cm(.1)}T11:00:00`),
      deal('dl9', 'Plano mensal — Beto Almeida', 'l9', 3468, ts(-40), `${cm(.45)}T15:00:00`),
      deal('dl10', 'Evento mensal — Condomínio Parque das Flores', 'l10', 7200, ts(-34), `${cm(.65)}T10:00:00`),
      { id: 'dl11', titulo: 'Plano mensal — Igor Bastos', lead: 'Igor Bastos', valor: 3468, criado_em: `${md(-2, 20)}T10:00:00`, movido_em: `${md(-1, 10)}T10:00:00` },
    ] },
    { id: 'st6', nome: 'Perdido',     cor: '#E74C3C', deals: [
      deal('dl12', 'Plano mensal — Gustavo Reis', 'l12', 3468, ts(-28), `${cm(.3)}T10:00:00`),
      { id: 'dl13', titulo: 'Dia de beleza — Salão Aura (parceria)', lead: 'Salão Aura', valor: 2500, criado_em: `${md(-2, 5)}T10:00:00`, movido_em: `${md(-1, 18)}T10:00:00` },
    ] },
  ];

  // ── UP·Flow — projetos ──────────────────────────────────
  let eid = 0;
  const etapas = list => list.map(([nome, responsavel, concluido]) => ({ id: 'e' + (++eid), nome, responsavel, status: concluido != null ? 'concluido' : 'pendente', ...(concluido != null ? { concluido_em: d(concluido) } : {}) }));
  const projetos = [
    { id: 'p1', nome: 'Reforma da sala de espera', cliente: 'Interno', responsavel: 'Rodrigo Teles', inicio: d(-48), previsao: d(-2), retrabalhos: 1,
      ai_suggestion: { gargalo: 'O marceneiro atrasou 9 dias a bancada e travou pintura e inauguração', acao: 'Avisar os clientes da agenda hoje com a nova data e cobrar o fornecedor por escrito', responsavel: 'Rodrigo Teles' },
      etapas: etapas([['Projeto e orçamento', 'Rodrigo Teles', -40], ['Demolição e elétrica', 'Rodrigo Teles', -28], ['Revestimento e piso', 'Rodrigo Teles', -14], ['Bancada e prateleiras', 'Aline Souza'], ['Pintura e inauguração', 'Rodrigo Teles']]) },
    { id: 'p2', nome: 'Lançamento da linha própria Stars', cliente: 'Interno', responsavel: 'Rodrigo Teles', inicio: d(-12), previsao: d(38), ai_suggestion: null,
      etapas: etapas([['Escolher produtos da linha', 'Rodrigo Teles', -11], ['Aprovar rótulo e tampa', 'Rodrigo Teles', -4], ['Pedido do primeiro lote', 'Bia Campos'], ['Exposição no balcão', 'Aline Souza'], ['Post de lançamento', 'Aline Souza']]) },
    { id: 'p3', nome: 'Convênio Lemos & Filhos', cliente: 'Gustavo Lemos', responsavel: 'Aline Souza', inicio: d(-18), previsao: d(30), ai_suggestion: null,
      etapas: etapas([['Proposta enviada', 'Aline Souza', -17], ['Combinar fatura única', 'Bia Campos', -14], ['Cadastrar os 15 funcionários', 'Aline Souza', -3], ['Primeiro mês de atendimento', 'Caio Ramos'], ['Revisão após 30 dias', 'Rodrigo Teles']]) },
    { id: 'p4', nome: 'Aniversário de 5 anos da barbearia', cliente: 'Interno', responsavel: 'Aline Souza', inicio: d(-9), previsao: d(52), ai_suggestion: null,
      etapas: etapas([['Definir data e orçamento', 'Rodrigo Teles', -8], ['Convidar clientes do plano', 'Aline Souza', -5], ['Combinar parceiros e brindes', 'Rodrigo Teles'], ['Decoração', 'Aline Souza'], ['Evento e fotos', 'Dudu Lima']]) },
    { id: 'p5', nome: 'Novo sistema de agendamento', cliente: 'Interno', responsavel: 'Bia Campos', inicio: d(-70), previsao: d(9), ai_suggestion: null,
      etapas: etapas([['Mapear horários e barbeiros', 'Bia Campos', -68], ['Testar o agendamento online', 'Aline Souza', -55], ['Treinar a equipe', 'Rodrigo Teles', -38], ['Lançar para os clientes', 'Aline Souza', -10], ['Ajustes após 30 dias', 'Bia Campos']]) },
    { id: 'p6', nome: 'Segunda cadeira de barba', cliente: 'Interno', responsavel: 'Rodrigo Teles', inicio: d(-110), previsao: d(-30),
      ai_suggestion: { licao: 'Treinar o barbeiro antes de abrir a cadeira poupou 2 semanas. Repetir ao contratar o próximo.' },
      etapas: etapas([['Orçamento da cadeira', 'Rodrigo Teles', -108], ['Compra e instalação', 'Bia Campos', -95], ['Treinamento de barba terapia', 'Caio Ramos', -75], ['Teste com clientes do plano', 'Caio Ramos', -38], ['Abertura na agenda', 'Aline Souza', -32]]) },
  ];

  // ── UP·Team ─────────────────────────────────────────────
  const hist = (...rows) => rows.map(([c, a, at, au], i) => ({ semana: week(-(i + 1)), fechado_em: d(-7 * i - 3), tarefas_concluidas: c, tarefas_abertas: a, atrasos: at, ausencias: au }));
  const membros = [
    { id: 'm1', nome: 'Rodrigo Teles', cargo: 'Sócio-dono e barbeiro', ativo: true, tarefas_concluidas: 11, tarefas_abertas: 3, atrasos: 0, ausencias: 0, historico: hist([10, 4, 0, 0], [9, 3, 1, 0], [12, 2, 0, 0]) },
    { id: 'm2', nome: 'Caio Ramos',    cargo: 'Barbeiro sênior',        ativo: true, tarefas_concluidas: 9,  tarefas_abertas: 4, atrasos: 0, ausencias: 0, historico: hist([8, 4, 0, 0], [9, 5, 0, 0], [7, 3, 1, 0]) },
    { id: 'm3', nome: 'Dudu Lima',     cargo: 'Barbeiro',               ativo: true, tarefas_concluidas: 8,  tarefas_abertas: 3, atrasos: 0, ausencias: 0, historico: hist([7, 3, 0, 0], [8, 2, 0, 0], [6, 4, 0, 1]) },
    { id: 'm4', nome: 'Léo Fonseca',   cargo: 'Barbeiro (novo)',        ativo: true, tarefas_concluidas: 5,  tarefas_abertas: 7, atrasos: 2, ausencias: 1, historico: hist([6, 6, 1, 0], [7, 4, 1, 0], [8, 3, 0, 0]) },
    { id: 'm5', nome: 'Marcelo Pires', cargo: 'Barbeiro e barba terapia', ativo: true, tarefas_concluidas: 10, tarefas_abertas: 4, atrasos: 1, ausencias: 0, historico: hist([9, 3, 0, 0], [10, 4, 0, 0], [8, 2, 0, 0]) },
    { id: 'm6', nome: 'Aline Souza',   cargo: 'Recepção e agenda',      ativo: true, tarefas_concluidas: 14, tarefas_abertas: 2, atrasos: 0, ausencias: 0, historico: hist([12, 3, 0, 0], [11, 2, 0, 0], [10, 4, 0, 0]) },
    { id: 'm7', nome: 'Bia Campos',    cargo: 'Administrativo-financeiro', ativo: true, tarefas_concluidas: 12, tarefas_abertas: 1, atrasos: 0, ausencias: 0, historico: hist([11, 2, 0, 0], [12, 1, 0, 0], [11, 1, 0, 0]) },
  ];

  // ── UP·Base — manuais e políticas ───────────────────────
  const docs = [
    { id: 'd1', titulo: 'SOP — Atendimento do primeiro contato', categoria: 'Vendas', responsavel: 'Aline Souza', atualizado: d(-12),
      steps: ['Responder em até 30 minutos, pelo mesmo canal', 'Perguntar serviço desejado, barbeiro preferido e melhor horário', 'Registrar o contato no UP·Lead com o código do post, se houver', 'Confirmar o horário por mensagem no dia anterior', 'Oferecer o plano mensal para quem volta mais de uma vez por mês'],
      nota: 'Todo contato que chega pelo Instagram deve ter o post de origem registrado — é assim que sabemos qual conteúdo traz cliente.' },
    { id: 'd2', titulo: 'SOP — Atendimento na cadeira', categoria: 'SOPs', responsavel: 'Rodrigo Teles', atualizado: d(-20),
      steps: ['Receber o cliente pelo nome e oferecer bebida', 'Conversar 2 minutos sobre o corte desejado e mostrar referências', 'Higienizar a cadeira e trocar a capa a cada cliente', 'Finalizar com acabamento e oferecer a pomada para uso em casa', 'Perguntar se quer deixar o próximo horário marcado'],
      nota: 'Corte mal combinado é a principal causa de retrabalho e de cliente que não volta.' },
    { id: 'd3', titulo: 'SOP — Higienização de ferramentas', categoria: 'Operação', responsavel: 'Marcelo Pires', atualizado: d(-9),
      steps: ['Lavar máquinas e tesouras ao fim de cada atendimento', 'Imergir lâminas no desinfetante por 10 minutos', 'Trocar lâminas de navalha a cada cliente', 'Registrar a higienização no checklist do dia', 'Repor o estoque de insumos quando chegar ao mínimo'],
      nota: 'Meta definida com a UP Co.: zero atendimento sem checklist de higiene.' },
    { id: 'd4', titulo: 'Política — Comissão e planos', categoria: 'Políticas', responsavel: 'Bia Campos', atualizado: d(-30),
      steps: ['Comissão de 50% sobre corte e barba, paga todo dia 5', 'Plano mensal: comissão sobre cada visita realizada', 'Venda de pomada no balcão: 10% para quem indicou', 'Cancelamento com menos de 2 horas de antecedência cobra 50% do serviço'],
      nota: '' },
    { id: 'd5', titulo: 'SOP — Reposição de estoque semanal', categoria: 'Operação', responsavel: 'Bia Campos', atualizado: d(-6),
      steps: ['Contar toda segunda as pomadas e os insumos no UP·Vault', 'Repor o que estiver abaixo do mínimo pelo pedido à Stars', 'Registrar o pedido no UP·Vault como conta a pagar', 'Conferir a chegada e atualizar a quantidade em estoque'],
      nota: 'Regra nova: nenhuma pomada chega ao zero sem pedido já feito.' },
    { id: 'd6', titulo: 'SOP — Fechamento de caixa diário', categoria: 'Financeiro', responsavel: 'Bia Campos', atualizado: d(-15),
      steps: ['Lançar todos os recebimentos do dia no UP·Vault', 'Conferir dinheiro, cartão e Pix com o relatório da máquina', 'Registrar as comissões do dia', 'Enviar o resumo ao Rodrigo antes de fechar'],
      nota: '' },
  ];

  // ── UP·Core — processos ─────────────────────────────────
  const processos = [
    { id: 'bp1', nome: 'Do agendamento ao pós-corte', classificacao: 'Crítico', status: 'ativo',
      etapas: ['Pedido de horário', 'Confirmação', 'Recepção', 'Atendimento na cadeira', 'Pagamento', 'Próximo horário marcado', 'Mensagem de pós-corte'],
      tempo_padrao: 55, tempo_real: 63, compliance: 78, ultima_atualizacao: d(-5), nota: 'Minutos por atendimento. Atrasos na cadeira empurram a agenda; meta é 55.' },
    { id: 'bp2', nome: 'Plano mensal e renovação', classificacao: 'Crítico', status: 'ativo',
      etapas: ['Oferta do plano', 'Cadastro', 'Pagamento', 'Reserva de horários', 'Aviso de renovação', 'Renovação'],
      tempo_padrao: 15, tempo_real: 17, compliance: 88, ultima_atualizacao: d(-8), nota: 'Minutos por cliente novo. Planos são a receita mais previsível.' },
    { id: 'bp3', nome: 'Reposição de pomadas e insumos', classificacao: 'Crítico', status: 'ativo',
      etapas: ['Contagem semanal', 'Conferir mínimo', 'Pedido à Stars', 'Pagamento', 'Conferência na chegada', 'Atualizar estoque'],
      tempo_padrao: 30, tempo_real: 40, compliance: 81, ultima_atualizacao: d(-4), nota: 'Falta de pomada no balcão foi o principal desvio no mês.' },
    { id: 'bp4', nome: 'Reunião semanal de gestão', classificacao: 'Importante', status: 'ativo',
      etapas: ['Abrir o UP·Dash', 'Revisar vendas', 'Revisar estoque', 'Revisar caixa', 'Definir prioridades da semana'],
      tempo_padrao: 1, tempo_real: 1, compliance: 100, ultima_atualizacao: d(-3), nota: 'Toda segunda às 9h, com o consultor da UP Co.' },
    { id: 'bp5', nome: 'Pós-venda e pedido de indicação', classificacao: 'Importante', status: 'ativo',
      etapas: ['Mensagem no dia seguinte', 'Pesquisa de satisfação', 'Pedido de indicação', 'Post de antes e depois'],
      tempo_padrao: 3, tempo_real: 3, compliance: 92, ultima_atualizacao: d(-10), nota: 'Indicações geraram 3 dos últimos 8 planos mensais.' },
    { id: 'bp6', nome: 'Eventos e pacotes especiais', classificacao: 'Suporte', status: 'pausado',
      etapas: ['Pedido do cliente', 'Orçamento', 'Reserva de agenda', 'Atendimento', 'Pós-evento'],
      tempo_padrao: 6, tempo_real: null, compliance: null, ultima_atualizacao: d(-45), nota: 'Pausado até a segunda cadeira de barba estar liberada.' },
  ];

  // ── UP·Post — Instagram da barbearia ────────────────────
  const posts = [
    ['Antes e depois: degradê navalhado', 'Reel', 'Antes / depois', 'Corte', 'Chamar no WhatsApp', -3, [18400, 1240, 96, 880, 410, 520], 'acima'],
    ['5 erros que estragam a sua barba', 'Carrossel', 'Erro comum', 'Barba', 'Salvar para depois', -7, [9600, 610, 48, 1150, 230, 260], 'acima'],
    ['Quanto custa o plano mensal?', 'Reel', 'Pergunta direta', 'Planos', 'Chamar no WhatsApp', -11, [12800, 720, 140, 640, 190, 410], 'acima'],
    ['Bastidor: abrindo a barbearia', 'Reel', 'Bastidor', 'Bastidores', 'Sem CTA', -14, [3100, 210, 12, 40, 18, 70], 'abaixo'],
    ['3 pomadas e o acabamento de cada uma', 'Carrossel', 'Lista / passo a passo', 'Produto', 'Salvar para depois', -18, [7400, 520, 31, 960, 150, 180], 'media'],
    ['Antes e depois: barba terapia', 'Reel', 'Antes / depois', 'Barba', 'Link na bio', -22, [14200, 880, 64, 520, 300, 470], 'acima'],
    ['Navalha afiada muda tudo', 'Imagem', 'Afirmação', 'Barba', 'Sem CTA', -26, [2400, 190, 8, 60, 12, 40], 'abaixo'],
    ['Você sabe qual pomada usar no seu cabelo?', 'Reel', 'Pergunta direta', 'Produto', 'Comentar palavra', -30, [8200, 470, 210, 300, 90, 230], null],
    ['Erro comum: lavar o cabelo antes do corte', 'Reel', 'Erro comum', 'Corte', 'Salvar para depois', -35, [10100, 690, 72, 870, 340, 260], null],
    ['Bastidor: o dia do Caio na cadeira', 'Reel', 'Bastidor', 'Bastidores', 'Sem CTA', -39, [4300, 330, 21, 90, 25, 110], null],
    ['Antes e depois: corte clássico', 'Carrossel', 'Antes / depois', 'Corte', 'Chamar no WhatsApp', -44, [11600, 830, 58, 720, 260, 380], null],
    ['Plano família vale a pena?', 'Reel', 'Pergunta direta', 'Planos', 'Comentar palavra', -50, [6900, 400, 120, 410, 80, 170], null],
    ['Convênio para empresas: como funciona', 'Carrossel', 'Lista / passo a passo', 'Planos', 'Link na bio', -56, [5200, 300, 18, 380, 70, 190], null],
    ['Barba bem cuidada não é barba sem graça', 'Imagem', 'Afirmação', 'Barba', 'Sem CTA', -63, [2100, 160, 6, 70, 10, 30], null],
    ['Bastidor: reunião de equipe', 'Reel', 'Bastidor', 'Bastidores', 'Sem CTA', -70, [2900, 190, 9, 30, 14, 52], null],
    ['Como manter o degradê por mais tempo', 'Carrossel', 'Lista / passo a passo', 'Corte', 'Salvar para depois', -77, [6100, 410, 26, 690, 120, 140], null],
  ].map(([titulo, formato, gancho, tema, cta, dias, m, previsto], i, list) => ({
    id: 'po' + (i + 1), codigo: 'P-' + String(list.length - i).padStart(3, '0'), titulo, formato, gancho, tema, cta, roteiro: '',
    status: 'publicado', publicado_em: d(dias), url: '', criado_em: d(dias - 2),
    metricas: { alcance: m[0], curtidas: m[1], comentarios: m[2], salvamentos: m[3], compartilhamentos: m[4], visitas_perfil: m[5] },
    previsao: previsto ? { faixa: previsto, score: 1, confianca: 'média', comparaveis: 6, objetivo: 'alcance', feita_em: d(dias - 1) } : null,
  }));
  posts.unshift({ id: 'po0', codigo: 'P-017', titulo: 'Lançamento: a pomada própria da Navalha & Cia', formato: 'Reel', gancho: 'Antes / depois', tema: 'Produto', cta: 'Chamar no WhatsApp',
    roteiro: 'Abrir com o pote na bancada → aplicação no cabelo → resultado final → "leve a Navalha para casa. Chama no WhatsApp".', status: 'rascunho', publicado_em: null, url: '', metricas: {}, previsao: null, criado_em: d(-1) });

  // ── Histórico: GOS sobe desde a entrada da suíte (8 semanas) ──
  const gos_historico = [
    [71, 70, 80, 74, 70, 82], [69, 68, 78, 73, 69, 80], [67, 66, 75, 72, 68, 78], [64, 63, 72, 70, 66, 70],
    [62, 60, 70, 68, 65, 66], [60, 58, 66, 67, 64, 62], [57, 55, 62, 65, 62, 55], [55, 52, 60, 63, 60, 50],
  ].map(([score, financeiro, comercial, operacional, equipe, processos], i) => ({ semana: week(-(i + 1)), score, financeiro, comercial, operacional, equipe, processos }));

  const mind_historico = [
    { semana: week(-1), health_score: 71, gerado_em: `${d(-7)}T08:30:00`,
      padrao_identificado: 'A pomada acaba no balcão antes de o pedido chegar — 3 das últimas 4 reposições.',
      contexto_narrativo: 'Melhor mês comercial do ano até aqui. O gargalo saiu da agenda e foi para o estoque.',
      insights: [
        { titulo: 'Reposição de pomada chega tarde', contexto: 'A Pomada Efeito Molhado está zerada e o padrão se repete com outras da linha.', acao: 'Definir quantidade mínima por produto no UP·Vault e pedir à Stars quando bater o mínimo.', urgencia: 'alta' },
        { titulo: 'Posts de antes e depois trazem plano', contexto: 'Os 3 planos fechados no mês vieram de posts "antes e depois" ou de indicação.', acao: 'Publicar 1 antes e depois por semana e pedir foto autorizada em todo atendimento.', urgencia: 'media' },
      ] },
    { semana: week(-2), health_score: 69, gerado_em: `${d(-14)}T08:30:00`,
      padrao_identificado: null,
      contexto_narrativo: 'Os planos mensais passaram de 30% da receita. Caixa confortável.',
      insights: [
        { titulo: 'Proposta da academia sem dono', contexto: 'A parceria com a Corpo Ativo não tinha próximo passo registrado.', acao: 'Aline assume o follow-up com data na agenda.', urgencia: 'media' },
      ] },
  ];

  // Alertas já tratados em semanas anteriores (mostram o histórico do UP·Voice)
  const voice_alerts = [
    { id: 'al_h1', key: `proposta_parada:dl0:${d(-8)}`, regra: 'proposta_parada', fonte: 'UP·Lead', titulo: 'Proposta parada há 8 dias — Plano mensal — Beto Almeida', urgencia: 'media', publico: 'rafael',
      contexto: 'O deal "Plano mensal — Beto Almeida" (R$ 3.468) estava em Proposta sem movimento havia 8 dias.',
      mensagem: '🔔 A proposta do Beto (R$ 3.468) está parada há 8 dias. Vale um follow-up hoje.', status: 'enviado', destinatarios: ['rafael'], criado_em: `${d(-8)}T08:00:00`, enviado_em: `${d(-8)}T08:15:00` },
    { id: 'al_h2', key: `equipe_padrao:m4:${d(-14)}`, regra: 'equipe_padrao', fonte: 'UP·Team', titulo: 'Padrão de atraso — Léo Fonseca', urgencia: 'media', publico: 'founder',
      contexto: 'Léo Fonseca acumulou 2 atrasos e 1 ausência na semana.',
      mensagem: 'Rodrigo, um ponto de atenção: o Léo acumulou 2 atrasos e 1 ausência. Vale uma conversa 1:1 para entender se a agenda dele está pesada para quem acabou de entrar.', status: 'descartado', destinatarios: [], criado_em: `${d(-14)}T08:00:00` },
  ];

  // ── Estoque (UP·Vault) — linha Stars + insumos da casa ──
  // Os ids da linha Stars batem com o painel do parceiro do site (pasta, argila, gel, molhado, fibra, cera)
  const estoque = [
    // nomes iguais aos do catálogo do site (home-v2/data.js, ids stars-*)
    { id: 'pasta',   nome: 'Pasta Modeladora',    grupo: 'Linha Stars', qtd: 18,  minimo: 8,   custo: 22.5, preco: 49.9, unidade: 'pote' },
    { id: 'argila',  nome: 'Argila Matte',        grupo: 'Linha Stars', qtd: 6,   minimo: 8,   custo: 24,   preco: 54.9, unidade: 'pote' },
    { id: 'gel',     nome: 'Gel-Cera Brilho',     grupo: 'Linha Stars', qtd: 12,  minimo: 8,   custo: 14,   preco: 34.9, unidade: 'pote' },
    { id: 'molhado', nome: 'Efeito Molhado',      grupo: 'Linha Stars', qtd: 0,   minimo: 8,   custo: 21,   preco: 47.9, unidade: 'pote' },
    { id: 'fibra',   nome: 'Fibra Texturizadora', grupo: 'Linha Stars', qtd: 9,   minimo: 8,   custo: 23,   preco: 52.9, unidade: 'pote' },
    { id: 'cera',    nome: 'Cera Black',          grupo: 'Linha Stars', qtd: 4,   minimo: 8,   custo: 20,   preco: 44.9, unidade: 'pote' },
    { id: 'laminas', nome: 'Lâminas de navalha',          grupo: 'Insumos',     qtd: 140, minimo: 100, custo: 0.8,  preco: null, unidade: 'un' },
    { id: 'capas',   nome: 'Capas descartáveis',          grupo: 'Insumos',     qtd: 60,  minimo: 80,  custo: 0.6,  preco: null, unidade: 'un' },
    { id: 'toalhas', nome: 'Toalhas de barba',            grupo: 'Insumos',     qtd: 45,  minimo: 30,  custo: 4.5,  preco: null, unidade: 'un' },
  ];
  // Pedidos que a Navalha & Cia faz para a Stars (fornecedora da linha)
  // Espelho do painel do site Stars: mesmos números (1042, 1043, 1031), tipos e etapas de Documents\Stars\...\home-v2\data.js.
  // tipo + etapa (posição em STARS_ETAPAS) definem o status. Valores e itens são exemplos.
  window.STARS_ETAPAS = {
    lote: ['Pedido recebido', 'Arte em revisão com o designer', 'Arte aprovada por você', 'Em produção na fábrica', 'Controle de qualidade', 'Enviado', 'Entregue'],
    revenda: ['Pedido recebido', 'Pagamento aprovado', 'Separando os itens', 'Enviado', 'Entregue'],
  };
  const pedidos_stars = [
    { id: '1042', tipo: 'lote',    etapa: 3, titulo: 'Lote · Pasta Modeladora',          itens: 'Pasta Modeladora x 12', repor: { pasta: 12 }, total: 2150, feito_em: d(-18), previsao: d(5) },
    { id: '1043', tipo: 'revenda', etapa: 3, titulo: 'Bancada · 2 capas, 4 borrifadores', itens: '2 capas, 4 borrifadores', repor: {},          total: 340,  feito_em: d(-4),  previsao: d(2) },
    { id: '1031', tipo: 'revenda', etapa: 4, titulo: 'Corte · 1 kit de pentes',           itens: '1 kit de pentes',        repor: {},          total: 118,  feito_em: d(-65), previsao: d(-60) },
  ].map(p => ({ ...p, status: window.STARS_ETAPAS[p.tipo][p.etapa] }));
  // Indicadores sem fonte pública: valores de exemplo (nenhum cálculo da demo gera retorno ou ocupação)
  const indicadores = { retorno30: 68, ocupacao: 71, exemplo: true };
  // Comissão dos barbeiros: percentuais e produção do mês são exemplos (a pomada vendida vem do seed "vendas")
  const comissoes = [
    // soma ≈ R$ 19,3 mil, o mesmo valor de "Comissão dos barbeiros" no caixa deste mês
    { membro: 'm2', nome: 'Caio Ramos',    pct_servico: 50, pct_produto: 10, servicos: 12800 },
    { membro: 'm3', nome: 'Dudu Lima',     pct_servico: 45, pct_produto: 10, servicos: 10200 },
    { membro: 'm4', nome: 'Léo Fonseca',   pct_servico: 40, pct_produto: 10, servicos: 6200 },
    { membro: 'm5', nome: 'Marcelo Pires', pct_servico: 50, pct_produto: 10, servicos: 11400 },
  ];
  // Clube de assinatura: preços de exemplo (289 = os R$ 3.468/ano dos deals; 525 = os R$ 6.300/ano do plano família)
  const clube = {
    planos: [
      { id: 'mensal',  nome: 'Plano Mensal · corte + barba, 4 visitas', preco: 289, ativos: 28 },
      { id: 'familia', nome: 'Plano Família · até 3 pessoas',           preco: 525, ativos: 2 },
    ],
    movimentos: [
      { data: d(-3),  tipo: 'novo',     nome: 'Gustavo Reis',   plano: 'mensal' },
      { data: d(-8),  tipo: 'cancelou', nome: 'Anderson Melo',  plano: 'mensal' },
      { data: d(-12), tipo: 'novo',     nome: 'Igor Bastos',    plano: 'mensal' },
      { data: d(-19), tipo: 'cancelou', nome: 'Paulo Viana',    plano: 'mensal' },
      { data: d(-24), tipo: 'novo',     nome: 'Beto Almeida',   plano: 'mensal' },
    ],
  };
  // Vendas de pomada no balcão e pela agenda (alimentam o painel de vendas do UP·Dash)
  const vendas = [
    ['Pasta Modeladora', 'pasta', 5, 49.9, -1], ['Fibra Texturizadora', 'fibra', 3, 52.9, -1], ['Gel-Cera Brilho', 'gel', 4, 34.9, -2],
    ['Argila Matte', 'argila', 2, 54.9, -3], ['Efeito Molhado', 'molhado', 6, 47.9, -5], ['Cera Black', 'cera', 3, 44.9, -6],
    ['Pasta Modeladora', 'pasta', 7, 49.9, -9], ['Gel-Cera Brilho', 'gel', 5, 34.9, -11], ['Fibra Texturizadora', 'fibra', 4, 52.9, -14],
  ].map(([nome, produto, qtd, preco, dias], i) => ({ id: 'v' + (i + 1), nome, produto, qtd, preco, total: Math.round(qtd * preco * 100) / 100, data: d(dias), barbeiro: ['Caio Ramos', 'Dudu Lima', 'Marcelo Pires'][i % 3] }));

  window.DEMO_SEEDS = {
    leads, pipeline, transacoes, projetos, membros, processos, docs, posts,
    gos_historico, mind_historico, voice_alerts, estoque, pedidos_stars, vendas, indicadores, clube, comissoes,
    voice_state: { last_check: `${d(-1)}T08:00:00` },
    dash_narrativa: [],
    post_regras: [
      { id: 'rg1', texto: 'Conteúdo original é priorizado; repostagem sem alteração perde distribuição.', afeta: 'Reels', link: '', data: d(-40), ativa: true },
      { id: 'rg2', texto: 'Vídeos com marca d\'água de outras plataformas têm alcance reduzido.', afeta: 'Reels', link: '', data: d(-200), ativa: true },
    ],
    post_padroes: [
      { id: 'pd1', label: 'Antes e depois com revelação no final', contas: ['@referencia_barber_1', '@referencia_barber_2', '@referencia_barber_3'], aplicavel: true },
      { id: 'pd2', label: 'Tour pela barbearia em plano-sequência', contas: ['@referencia_barber_2', '@referencia_barber_4'], aplicavel: true },
      { id: 'pd3', label: 'Trend de áudio com dancinha', contas: ['@referencia_barber_1'], aplicavel: false },
    ],
    post_pautas: [],
  };

  // Modelos importáveis no UP·Base e no UP·Core — sem números fictícios
  window.SUITE_TEMPLATES = {
    docs: docs.map(x => ({ ...x, atualizado: U.today() })),
    processos: processos.map(x => ({ ...x, status: 'ativo', tempo_real: null, compliance: null, nota: '', ultima_atualizacao: U.today() })),
  };
})();
