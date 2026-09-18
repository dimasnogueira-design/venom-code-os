# Gate 0 — isolamento, segurança e governança

## Superfícies protegidas

- /os
- /api/commander

Ambas exigem Basic Auth validada no servidor com VENOM_OS_USERNAME e
VENOM_OS_PASSWORD. Se qualquer variável estiver ausente, o sistema falha
fechado: /os responde 404 e a API responde 503. Nenhuma credencial padrão
existe no código.

COMMANDER_MODE permanece simulation por padrão. Ativar live requer decisão
separada, credenciais configuradas e revisão de custo.

## Controles deste gate

- autenticação compartilhada entre a interface interna e sua API;
- validação de origem para chamadas de navegador à API;
- somente POST é implementado pelo route handler;
- corpo máximo de 16 KiB e missão máxima de 4.000 caracteres;
- exigência de JSON válido;
- respostas privadas com Cache-Control: no-store;
- headers mínimos: nosniff, SAMEORIGIN, referrer policy e permissions policy.

## Dados e logs

O Commander recebe a missão digitada pelo operador. Em modo live, esse texto é
enviado ao provedor configurado. O código não deve registrar missão,
credenciais, Authorization ou resposta do modelo. Erros recebem mensagem
genérica; detalhes técnicos permanecem nos logs da plataforma.

Decisões pendentes antes de produção:

- prazo de retenção de logs;
- pessoas autorizadas a receber credenciais;
- rotação e revogação;
- retenção de missões quando houver persistência;
- ativação do modo live e seu budget.

## Checklist

- [x] Branch separada gate-0-security-foundation.
- [x] Fail-closed sem credenciais.
- [x] /os e /api/commander usam a mesma autorização.
- [x] Commander live desligado por padrão.
- [x] Payload, JSON e origem validados.
- [x] Headers mínimos definidos sem CSP prematura.
- [ ] Credenciais reais configuradas — fora do escopo.
- [ ] Deploy/Preview — não autorizado.
- [ ] Retenção e budget live — decisão pendente.

## Evidências locais

- lint: aprovado;
- build de produção: aprovado, incluindo middleware;
- sem variáveis: /os 404 e /api/commander 503;
- sem autenticação ou com senha incorreta: 401;
- credencial local descartável correta: /os 200;
- API autenticada em simulation: 200;
- origem externa: 403;
- content type inválido: 415;
- JSON inválido e missão vazia: 400;
- missão acima de 4.000 caracteres: 413;
- headers observados: nosniff, SAMEORIGIN, strict-origin-when-cross-origin e
  permissions policy.

As credenciais usadas nesses testes existiram apenas no processo local e não
foram gravadas em arquivo, Git, Vercel ou produção.

## Fase B — limites distribuídos

A migration 202609180001_create_distributed_rate_limits.sql prepara uma tabela
Supabase contendo somente:

- escopo da API;
- HMAC SHA-256 do endereço do cliente;
- contagem e timestamps da janela.

O limitador não armazena IP puro, mensagem da SNAKE, conteúdo do lead, email ou
telefone. A função SQL faz incremento atômico por escopo e hash. Janelas
expiradas deixam de bloquear imediatamente e registros expirados há mais de
cinco minutos são removidos na próxima chamada ao limitador.

Comportamento seguro:

- SNAKE live falha com 503 se Supabase ou o RPC estiver indisponível;
- o formulário de leads falha com 503 antes de inserir dados se o limitador
  estiver indisponível;
- somente o modo mock local pode usar o limitador em memória já existente;
- chamadas com Origin externo recebem 403;
- ambas as APIs exigem JSON e rejeitam payload acima de 12 KiB;
- métodos não implementados permanecem 405 pelo App Router.

A migration está apenas versionada. Não foi aplicada em Supabase ou produção.
Sua integração real permanece PENDING EVIDENCE até existir um ambiente
autorizado com a migration aplicada.

Evidências locais da Fase B:

- lint e build aprovados;
- GET nas duas APIs: 405;
- Origin externo: 403;
- content type inválido: 415;
- JSON inválido: 400;
- payload/campo acima do limite: 413;
- SNAKE mock válida: 200;
- leads sem armazenamento configurado: fail-closed 503;
- RPC distribuído: PENDING EVIDENCE, pois a migration não foi aplicada.

O smoke test repetível está em scripts/gate0-api-smoke.mjs e não envia lead
válido nem chama modelo pago.
