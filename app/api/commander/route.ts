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

export async function POST(request: Request) {
  try {
    const { mission } = await request.json();
    if (!mission || typeof mission !== 'string' || !mission.trim()) {
      return NextResponse.json({ error: 'Missão obrigatória.' }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'COMMANDER_OFFLINE', message: 'Configure OPENAI_API_KEY na Vercel para ativar o Commander.' }, { status: 503 });
    }

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

    return NextResponse.json(result);
  } catch (error) {
    console.error('Commander error:', error);
    return NextResponse.json({ error: 'Falha ao executar Commander.' }, { status: 500 });
  }
}
