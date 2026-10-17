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
- Sem integração à rota `/api/commander` neste módulo inicial: o adaptador autenticado e a fila persistente ainda serão implementados.

## Hospedagem
Vercel continua como painel/frontend; um worker Python persistente poderá ser executado em uma VPS Hostinger com Docker **somente após** confirmar existência, acesso, custo, domínio e política de segurança. Hostinger Mail não administra VPS.

## Decisão de modelo
Padrão: OpenAI Agents SDK 0.24.0 (lançado 15/10/2026). Claude Code é candidato para A/B em tarefas de programação, mas não é dependência do projeto.

## Fonte de verdade
- `docs/venom-agents/PLANO-MESTRE.md`
- `docs/venom-agents/EXECUCAO.md`
- `docs/venom-agents/AI-ENGINEER.md`
- `ai_engineer/SKILL.md`
