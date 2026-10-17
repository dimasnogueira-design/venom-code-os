import { NextResponse } from 'next/server';
import { isValidEngineerResult, safeEqualToken } from '@/lib/commander-result-contract.mjs';
import { createCommanderPrivateStore } from '@/lib/commander-private-store';

export const runtime = 'nodejs';
const MAX_BODY_BYTES = 16_384;

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== 'preview') {
    return NextResponse.json({ error: 'Endpoint disponível somente em staging.' }, { status: 404 });
  }
  const expectedToken = process.env.VENOM_ENGINEER_RESULT_TOKEN || '';
  const suppliedToken = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!safeEqualToken(suppliedToken, expectedToken)) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > MAX_BODY_BYTES) return NextResponse.json({ error: 'Resultado muito longo.' }, { status: 413 });

  let result: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return NextResponse.json({ error: 'Resultado muito longo.' }, { status: 413 });
    result = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }
  if (!isValidEngineerResult(result)) return NextResponse.json({ error: 'Formato de resultado inválido.' }, { status: 400 });

  const store = createCommanderPrivateStore();
  if (!store) return NextResponse.json({ error: 'Banco privado de staging não configurado ou aponta para o CRM.' }, { status: 503 });
  const { error } = await store.from('commander_engineer_results').upsert({
    job_id: result.jobId,
    source_message_id: result.sourceMessageId,
    mission_digest: result.missionDigest,
    result,
    expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  }, { onConflict: 'job_id' });
  if (error) {
    console.error('Commander result persistence failed:', error.code || 'unknown');
    return NextResponse.json({ error: 'Não foi possível persistir o resultado.' }, { status: 503 });
  }
  return NextResponse.json({ accepted: true }, { status: 202, headers: { 'Cache-Control': 'no-store' } });
}
