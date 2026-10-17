import { NextResponse } from 'next/server';
import { createCommanderPrivateStore } from '@/lib/commander-private-store';

export const runtime = 'nodejs';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(_request: Request, context: { params: Promise<{ jobId: string }> }) {
  if (process.env.VERCEL_ENV !== 'preview') return NextResponse.json({ error: 'Disponível somente em staging.' }, { status: 404 });
  const { jobId } = await context.params;
  if (!UUID.test(jobId)) return NextResponse.json({ error: 'Protocolo inválido.' }, { status: 400 });
  const store = createCommanderPrivateStore();
  if (!store) return NextResponse.json({ error: 'Banco privado de staging não configurado.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  const { data, error } = await store.from('commander_engineer_results')
    .select('result, created_at, expires_at')
    .eq('job_id', jobId)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle();
  if (error) return NextResponse.json({ error: 'Não foi possível consultar o resultado.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  if (!data) return NextResponse.json({ jobId, status: 'PENDING' }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  return NextResponse.json({ jobId, status: 'COMPLETED', result: data.result, completedAt: data.created_at }, { headers: { 'Cache-Control': 'no-store' } });
}
