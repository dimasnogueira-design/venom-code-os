import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const SYSTEM = `Você é COMMANDER, o orquestrador central da VENOM CODE, uma agência digital AI-native.
Sua função não é simplesmente responder ao usuário: é transformar uma missão comercial confusa em um plano operacional profissional.

Especialistas disponíveis:
STRATEGY: diagnóstico, mercado, concorrência, posicionamento, oferta, escopo e proposta.
CREATIVE: branding, UX/UI, copy, conteúdo e campanhas.
TECH: web, e-commerce, integrações, analytics, SEO técnico, código, testes e deploy.
GROWTH: aquisição, funil, CRO, canais, métricas e experimentação.
AUDIT: procura falhas, riscos, premissas frágeis e contradições.

Regras:
- Chame conceitualmente apenas os especialistas necessários.
- Não invente dados ausentes.
- Diferencie fato, hipótese e informação faltante.
- Não prometa faturamento, vendas ou resultado sem evidência.
- Toda ação externa crítica, preço final, publicação, gasto, contrato ou compromisso depende de aprovação do Diretor.
- AUDIT deve questionar a estratégia antes da consolidação.
- Responda em português do Brasil, direto e profissional.

Retorne SOMENTE JSON válido neste formato:
{"title":"título curto","diagnosis":"diagnóstico","agents":["STRATEGY"],"plan":["ação 1","ação 2"],"questions":["informação necessária"],"audit":"principal crítica/risco","directorDecision":"o que precisa de aprovação humana","status":"READY_FOR_DIRECTOR"}`;

function simulateCommander(mission: string) {
  const text = mission.trim();
  const lower = text.toLowerCase();
  const selected = new Set<string>(['STRATEGY', 'AUDIT']);
  if (/site|landing|loja|e-commerce|ecommerce|shopify|app|sistema|integra|seo/.test(lower)) selected.add('TECH');
  if (/design|marca|branding|copy|conteúdo|conteudo|instagram|social|criativo|banner/.test(lower)) selected.add('CREATIVE');
  if (/lead|venda|matrícula|matricula|tráfego|trafego|funil|convers|aquisi|growth|campanha/.test(lower)) selected.add('GROWTH');

  const plan = [
    'Transformar a missão em briefing: objetivo, público, oferta, prazo, orçamento e restrições.',
    'Mapear o estado atual e separar fatos confirmados de hipóteses e informações ausentes.',
    'Definir a solução mínima capaz de atacar o objetivo antes de ampliar escopo.',
  ];
  if (selected.has('TECH')) plan.push('TECH: definir arquitetura, páginas/fluxos, integrações, analytics e critérios de teste.');
  if (selected.has('CREATIVE')) plan.push('CREATIVE: estruturar mensagem, identidade aplicada, UX, copy e ativos necessários.');
  if (selected.has('GROWTH')) plan.push('GROWTH: desenhar aquisição, conversão, métricas e primeiro ciclo de experimentação.');
  plan.push('AUDIT: revisar premissas, riscos, dependências e pontos que exigem aprovação do Diretor.');

  return {
    title: 'SIMULAÇÃO / MISSÃO ESTRUTURADA',
    diagnosis: `Missão recebida: “${text}”. O Commander está operando em modo simulação sem consumo de API. A estrutura abaixo serve para validar o VENOM CODE OS enquanto o motor de IA pago permanece desligado.`,
    agents: Array.from(selected),
    plan,
    questions: ['Qual é o resultado mensurável esperado?', 'Qual é o prazo?', 'Existe orçamento disponível?', 'Quais ativos, acessos e dados já existem?'],
    audit: 'Sem pesquisa externa, dados do cliente e execução real dos especialistas, este plano é uma estrutura operacional e não uma conclusão baseada em evidências.',
    directorDecision: 'Confirmar briefing, prioridade e escopo antes de qualquer ação externa ou gasto.',
    status: 'SIMULATION_READY_FOR_DIRECTOR',
    mode: 'SIMULATION',
  };
}

export async function POST(request: Request) {
  try {
    const { mission } = await request.json();
    if (!mission || typeof mission !== 'string' || !mission.trim()) {
      return NextResponse.json({ error: 'Missão obrigatória.' }, { status: 400 });
    }

    // Zero-cost development mode. Set COMMANDER_MODE=live when API billing is available.
    const liveMode = process.env.COMMANDER_MODE === 'live' && Boolean(process.env.OPENAI_API_KEY);
    if (!liveMode) return NextResponse.json(simulateCommander(mission));

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-terra',
      input: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: `MISSÃO DO DIRETOR:\n${mission.trim()}` },
      ],
    });

    const text = response.output_text?.trim() || '{}';
    let result;
    try { result = JSON.parse(text.replace(/^```json\s*|\s*```$/g, '')); }
    catch { result = { title: 'Missão analisada', diagnosis: text, agents: ['AUDIT'], plan: [], questions: [], audit: 'Saída não estruturada; requer revisão.', directorDecision: 'Revisar resposta.', status: 'READY_FOR_DIRECTOR' }; }

    return NextResponse.json({ ...result, mode: 'LIVE' });
  } catch (error) {
    console.error('Commander error:', error);
    return NextResponse.json({ error: 'Falha ao executar Commander.' }, { status: 500 });
  }
}
