# VENOM AI ENGINEER — implementação inicial

**Status:** agente Python com teste local em modo sem custo, ferramenta de modelo opcional e capacidades limitadas. Não há deploy 24/7, integrações financeiras, WhatsApp ou acesso ao servidor do usuário nesta etapa.

## Uso local (Python 3.11+)
A partir da raiz do repositório:
```bash
python -m unittest discover -s ai_engineer/tests -v
python -m ai_engineer --workspace . --mission "Revisar arquitetura dos agentes VENOM"
```
Modo offline entrega exclusivamente `PLAN_ONLY_NOT_EXECUTED` e não chama API.

## Modo real (pode consumir API)
1. Com base na documentação oficial, instale `pip install -r ai_engineer/requirements.txt` num ambiente virtual isolado. A versão do SDK está fixada, mas as transitivas precisam de lockfile antes de produção.
2. Configure `OPENAI_API_KEY` no gerenciador de segredos ou variável de ambiente; nunca no GitHub ou no chat.
3. Use `python -m ai_engineer --live --workspace /caminho/para/worktree-isolada --mission "Examinar roteador de tarefas"`.
4. Sem flags, o agente só lê código não confidencial. `--allow-write` habilita alterações locais e `--allow-tests` executa apenas `python-unit`, `python-compile`, `node-lint` e `node-build` — use essas permissões APENAS em sandbox de checkout confiável.
5. Saídas não são prova automática de sucesso: a ferramenta de teste retorna status de processo e o QA independente ainda precisa validar.

## Segurança
- Travessia de diretório, links simbólicos externos e nomes comuns de arquivos de credenciais são bloqueados.
- Não oferece deploy, git push, email, WhatsApp, web scraping, pagamentos ou comandos shell arbitrários.
- Testes ainda executam código do repositório: execute em contêiner sem acesso a segredos e sem privilégios elevados.
- Tracing externo desabilitado neste piloto por privacidade.
- 12 turnos por execução não equivalem a controle financeiro por orçamento: configurar quotas e interrupção no provedor antes de automação persistente.
- O adaptador de staging da rota `/api/commander` e o assinante Python da fila estão descritos abaixo; o fluxo online continua desligado sem configuração de preview.

## Hospedagem
Vercel continua como painel/frontend; um worker Python persistente poderá ser executado em uma VPS Hostinger com Docker **somente após** confirmar existência, acesso, custo, domínio e política de segurança. Hostinger Mail não administra VPS.

## COMMANDER → Vercel Queue → AI_ENGINEER (piloto de staging)
- `app/api/commander/route.ts` só publica quando `COMMANDER_MODE=queue`, `VENOM_QUEUE_ENABLED=true` e `VERCEL_ENV=preview`.
- A assinatura Python é descoberta pelo `pyproject.toml` da raiz. `ai_engineer.queue_worker` consome `venom-engineering-staging` com até três tentativas.
- O worker executa somente `plan_offline`; não chama OpenAI, não altera arquivos e não executa testes do repositório.
- Missões com marcas de dados pessoais/financeiros, Gmail, WhatsApp ou identificadores como CPF/CNPJ são recusadas antes de publicar e novamente no worker.
- Mensagens e resultados têm retenção de uma hora. O resultado vai para `venom-engineer-results-staging` sem o texto original da missão; logs registram somente ID e status.
- Requisições podem enviar `Idempotency-Key` UUID para retries do cliente serem deduplicados. Sem esse cabeçalho, o Commander cria um UUID por envio.
- O modo queue é exclusivo de preview; produção e desenvolvimento continuam no comportamento já configurado. A autenticação existente de `/api/commander` continua obrigatória.
- O resultado é um plano offline (`PLAN_ONLY_NOT_EXECUTED`), não prova execução de mudanças. O painel/consulta de resultados, OpenAI com chave de staging e worker persistente em 24/7 permanecem fora deste piloto.

### Retorno persistente em staging
- O worker pode publicar o plano redigido em `POST /api/internal/engineer-result`; o painel consulta `GET /api/commander/jobs/{jobId}` e atualiza o cartão da missão.
- O armazenamento usa apenas `commander-migrations/001_engineer_results.sql`, em um projeto Supabase privado dedicado ao Commander. Não aplique essa migration no banco comercial.
- Configuração necessária no ambiente Preview e no worker local: `VENOM_OS_PRIVATE_SUPABASE_URL`, `VENOM_OS_PRIVATE_SUPABASE_SERVICE_ROLE_KEY` e o mesmo segredo aleatório em `VENOM_ENGINEER_RESULT_TOKEN`. No worker, `VENOM_ENGINEER_RESULT_WEBHOOK_URL` deve apontar para o endpoint do Preview.
- A rota rejeita produção, valida token, payload e UUID, impede apontar o armazenamento para a URL comercial configurada, guarda apenas plano sem missão original e expira consultas após uma hora. O segredo do service role fica somente no servidor.
- A implementação local não configura esses segredos nem aplica migrations. Sem eles o painel informa o bloqueio e o fluxo da fila continua sem fingir que o retorno foi persistido.

Verificação local:
```bash
npm run test:commander-queue
python -m unittest discover -s ai_engineer/tests -v
```

## Decisão de modelo
Padrão: OpenAI Agents SDK 0.24.0 (lançado 15/10/2026). Claude Code é candidato para A/B em tarefas de programação, mas não é dependência do projeto.

## Fonte de verdade
- `docs/venom-agents/PLANO-MESTRE.md`
- `docs/venom-agents/EXECUCAO.md`
- `docs/venom-agents/AI-ENGINEER.md`
- `ai_engineer/SKILL.md`
