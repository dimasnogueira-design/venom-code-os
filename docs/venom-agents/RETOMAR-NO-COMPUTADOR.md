# VENOM OS — RETOMADA SEM RETRABALHO
Data: 2026-10-17

## Fonte única de verdade
- `docs/venom-agents/PLANO-MESTRE.md`
- `docs/venom-agents/EXECUCAO.md`
- README original `venom-code-os`
- README do repositório independente `snakeos`

## Ordem de trabalho para um agente de codificação no computador
> Trabalhe na branch `feat/venom-agents-orchestrator-20261017`. Leia integralmente os arquivos de plano mestre e execução antes de escrever código. Inspecione a implementação atual do VENOM CODE OS e do SNAKE, não invente arquitetura paralela. Implemente o P0 ainda aberto e então P1, sempre com testes unitários e funcionais, evidências e commits pequenos. Prossiga de uma tarefa independente para a próxima sem aguardar "continua". Quando houver necessidade real de credencial, consentimento, decisão humana, dinheiro ou deploy de produção, registre uma aprovação pendente e continue outras etapas permitidas. Não invente login, chaves, resultados, emails enviados, mensagens entregues ou sites testados. Não mexa em produção nem desative controles de segurança. Não exponha dados pessoais no repositório. Apresente resumo do que está realmente executado, arquivos alterados, testes realizados e pendências externas.

## Condições reais para operação sem computador ligado
- API/modelo configurado no worker; gasto limitado.
- Banco privado e esquema de dados com RLS e retenção.
- Gmail OAuth, WhatsApp oficial e outros provedores autenticados conforme disponibilidade.
- Worker/cron num ambiente persistente; GitHub+Vercel para frontend e preview.
- Habilitação gradual, aprovação por categoria e teste ponta a ponta.

**Importante:** Este arquivo orienta futuros agentes, mas não inicia por si só o processo: os comandos precisam ser executados num runner real após configuração. O ChatGPT não tem acesso autônomo ao notebook quando a conversa está fechada.
