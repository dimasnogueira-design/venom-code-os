# VENOM CODE OS

> AI-Native Digital Agency Operating System + landing page oficial da VENOM CODE.

VENOM CODE OS é o cérebro operacional da Venom Code. O sistema recebe missões digitais, diagnostica necessidades, orquestra especialistas de IA, audita e submete entregas à aprovação humana.

## Rotas

- `/` — landing page comercial da VENOM CODE.
- `/os` — Command Center interno, preservado como produto em desenvolvimento.
- `/api/leads` — captura de leads via Supabase.
- `/api/commander` — motor do Commander em modo simulação ou live.

## Desenvolvimento

```bash
npm install
npm run dev
```

Copie `.env.example` para `.env.local` e preencha apenas as variáveis necessárias. Nunca envie chaves secretas ao Git.

## Supabase

Execute `supabase/migrations/202609160001_create_leads.sql` no projeto Supabase. A tabela usa RLS e permite somente inserções anônimas; leitura, atualização e exclusão permanecem bloqueadas para clientes públicos.

## Missão do OS

Transformar estratégia, design, tecnologia e growth em uma operação digital repetível, auditável e escalável para e-commerce, landing pages, websites, branding, campanhas, conteúdo, SEO, automações e IA.

## Arquitetura inicial

```text
DIMAS — DIRECTOR
       |
COMMANDER AI
       |
+------+--------+------+------+
|      |        |      |      |
STRATEGY CREATIVE TECH GROWTH AUDIT
```

- **COMMANDER:** interpreta o briefing, identifica lacunas, escolhe especialistas e consolida a recomendação.
- **STRATEGY:** diagnóstico, mercado, posicionamento, oferta, escopo e proposta.
- **CREATIVE:** branding, direção criativa, UX/UI, copy, conteúdo e campanha.
- **TECH:** web, e-commerce, integrações, analytics, SEO técnico, código, testes e deploy.
- **GROWTH:** aquisição, funil, CRO, canais, métricas e experimentação.
- **AUDIT:** procura falhas estratégicas, comerciais, criativas, técnicas e operacionais.

## Fluxo universal

```text
LEAD → CLIENTE → BRIEFING → DIAGNÓSTICO → PROJETO → MISSÃO
→ COMMANDER → ESPECIALISTAS → AUDIT → APROVAÇÃO DO DIRETOR
→ ENTREGA → MÉTRICAS → EVOLUÇÃO
```

Cliente, projeto, missão e entrega são entidades diferentes. O contexto de um cliente nunca deve contaminar outro.

## Governança

- **Verde:** pesquisa, análise, rascunhos, organização, diagnóstico e auditoria.
- **Amarelo:** propostas, preços, design final, campanhas, publicação e deploy de produção exigem aprovação do Diretor.
- **Vermelho:** contratos, pagamentos, compromissos financeiros, exclusão de dados e ações irreversíveis exigem autorização explícita.

## Princípios

1. Cada cliente possui memória isolada.
2. Agentes podem e devem discordar.
3. Nenhum agente inventa fatos ausentes do contexto.
4. Decisões relevantes têm justificativa e histórico.
5. Nenhuma entrega crítica é publicada sem aprovação humana.
6. O sistema vende solução, não tecnologia.
7. Resultado é medido; promessa sem evidência é proibida.
8. O software permite troca de modelos de IA sem reconstruir a operação.

## Caso 001

SolMusic Digital é o primeiro caso real para validar a arquitetura sem criar dependência do OS em relação ao cliente.

## Stack

- Next.js / React / TypeScript
- Supabase / PostgreSQL / Auth / Storage
- OpenAI para orquestração e agentes
- GitHub para versionamento
- Vercel para deploy
