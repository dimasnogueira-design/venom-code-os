# VENOM OS — ORDEM ÚNICA DE EXECUÇÃO
Atualizado em 2026-10-17. Documento operacional público sem credenciais ou dados pessoais.

## P0 — Consolidação e prova local
- [x] Inventariar repositórios existentes `venom-code-os` e `snakeos`.
- [x] Verificar Vercel e projetos Supabase acessíveis.
- [x] Criar versão inicial do runtime em Python com fila SQLite, deduplicação, oito papéis e aprovação para ações de risco (arquivo ZIP separado).
- [x] Executar 6 testes locais do starter.
- [x] Registrar plano mestre nesta branch dedicada.
- [ ] Inserir runtime Python no repositório do projeto e executar CI no GitHub.
- [ ] Criar painel de status de missão no Commander existente, sem mudar a landing.
- [ ] Validar política de dados: separar credores/WhatsApp pessoal dos clientes.

## P1 — Primeiro fluxo real: e-mail e financeiro
- [ ] Conectar Gmail pessoal com OAuth de escopo mínimo, leitura e rascunho (não envio automático).
- [ ] Persistir ID de mensagem e thread; provar deduplicação, classificação de risco e resumo.
- [ ] Criar proposta de rascunho sem promessas ou reconhecimento; enviar somente com revisão.
- [ ] Acionar alertas de prazo crítico; validar com documentos oficiais, quando cabível.
- [ ] Testar fluxo de 10 e-mails com casos reais redigidos e respostas esperadas.

## P2 — Máquina de vendas
- [ ] Buscar 15 empresas reais e validar URLs/contatos públicos sem scraping proibido.
- [ ] Aplicar score de 0–100 com justificativa verificável e QA.
- [ ] Selecionar 5 e produzir briefing e diagnóstico.
- [ ] Criar 1 preview privado, testado em desktop/mobile e revisado.
- [ ] Produzir 5 abordagens individuais e submetê-las ao painel de aprovação.
- [ ] Criar CRM: contatado, respondeu, reunião, proposta, ganho/perdido, descadastro.

## P3 — WhatsApp
- [ ] Auditar `snakeos` existente, conectores, custos, backup, contas protegidas.
- [ ] Aprovar canal (API oficial quando disponível), webhook e templates comerciais.
- [ ] Respostas automáticas seguras para FAQ; handoff humano.
- [ ] Separar SNAKE pessoal e comercial, registrar testes e habilitar kill switch.
- [ ] Só depois de QA: piloto restrito de mensagens externas.

## P4 — Conteúdo e fornecedor
- [ ] Criar monitor de conteúdo público via acesso permitido; roteiro original e calendário.
- [ ] Implementar pipeline de arquivos audiovisuais próprios/autorizados, sem burlar bloqueios.
- [ ] Comparar fornecedores para capinhas AURYK; preparar RFQ, MOQ, amostras, custos.
- [ ] Montar catálogo e ambiente de loja de teste sem compras e sem publicar ofertas irreais.
- [ ] Aprovar operação de contato e pagamento antes de executar qualquer compromisso.

## P5 — Confiabilidade 24/7
- [ ] Runtime de longa duração em serviço persistente; retries, heartbeat e DLQ.
- [ ] Banco de dados privado com segregação, retenção e auditoria.
- [ ] Dashboard de execução, fila, taxa de erro, aprovação, custos, kill switch.
- [ ] QA de todos os fluxos com validação ponta a ponta.
- [ ] Rodar piloto de 7 dias: medir taxa de conclusão, problemas, valor e gasto.
- [ ] Só escalar cadências aprovadas com limites anti-spam, custos e revisão.

## Regras para quem implementar
- Não perguntar novamente decisões já definidas nos docs.
- Não sobrescrever `snakeos`, nem migrar dados da STAY12.
- Trabalhar em branch; sem deploy em produção sem revisão e QA.
- Bloqueio que depende de credencial ou consentimento vira item explícito no painel; continuar atividades independentes.
- Não confundir um protótipo agendador com execução automatizada real.
- Registrar teste e evidência a cada commit.


## P0.5 — AI ENGINEER (17/10/2026)
- [x] Registrar papel, hierarquia, escopo, métricas e skill do novo especialista.
- [x] Criar código Python, políticas de acesso e sete testes locais demonstrativos.
- [x] Criar reconhecimento de missões de engenharia pelo Commander (roteamento conceitual; não é execução live).
- [x] Executar testes do módulo sincronizado com a branch via CI do GitHub (7 testes Python e compilação aprovados no workflow #39048165520 em 17/10/2026).
- [x] Implementar interface protegida do COMMANDER → fila durável → worker AI_ENGINEER em modo staging/offline; validar entrega local com fila embutida e idempotência.
- [x] Revalidar a política de fila (3/3), suíte Python (13/13), lint, build e fluxos Core/SNAKE/lead; workflow GitHub #39057671361 passou, e o Preview do commit 56ebd9b ficou READY.
- [ ] CampVet e outras ações comerciais estão fora da prioridade atual; a rota conceitual foi removida e não deve ser retomada antes do centro pessoal.
- [ ] Validar publicação e consumo pela fila hospedada no Preview Vercel (depende de OIDC habilitado para a aplicação e credenciais de autenticação do Preview).
- [ ] Configurar OpenAI API pelo secret manager e orçamento antes de chamadas pagas.
- [x] Aplicar bloqueios de marcadores de PII/financeiro e impedir dados Gmail/WhatsApp no payload da fila de staging; filtros são uma barreira de escopo, não substituem revisão/controle de acesso.
- [ ] Hospedar worker persistente em serviço separado, após benchmark de custos e QA (Hostinger VPS é opção, não obrigação).
- [ ] Rodar benchmark Claude Code vs OpenAI no mesmo conjunto de tarefas e orçamento para decidir se vale assinar.
- [ ] Criar relatório de produtividade e evolução tecnológica com resultados verificáveis.
Nenhuma dessas pendências deve bloquear pesquisas, planos e testes locais sem custo.

## P0.7 — Pesquisa de IA e gestão privada de crises (17/10/2026)
- [x] Criar `AI_RESEARCHER` no roteamento do Commander, com QA obrigatório para fontes e sem acesso a dados pessoais.
- [x] Ampliar `CONFLICT_MANAGER` para Negociação e Gestão de Crises, mantendo ID compatível; exigir handoff humano para ambiguidades e revisão antes de qualquer mensagem.
- [x] Registrar skills de pesquisa de fonte e gestão de conflitos no SNAKE OS.
- [x] Preservar a segregação pessoal/comercial e marcar os dois agentes como não conectados no painel.
- [x] Criar caixa privada para perguntas/respostas do Diretor, cifrada e auditada; filtrar migrações Commander para que não sejam aplicadas pelo migrador CRM.
- [x] Implementar worker local `AI_RESEARCHER` para buscar metadados e resumos públicos no Crossref/arXiv, validar links e registrar resultado cifrado/auditoria; sem chamadas a modelo pago.
- [ ] Validar acesso de rede real do worker às fontes e executar a fila no staging; teste de fetch nesta sessão foi bloqueado pela rede local, enquanto os testes unitários usam respostas simuladas.
- [ ] Configurar OAuth Gmail de leitura e rascunho e conector WhatsApp de leitura/observação em ambiente privado, com escopos mínimos.
- [x] Implementar caixa de perguntas/respostas no painel privado e rotas de API autenticadas; a resposta é cifrada e auditada.
- [ ] Configurar canal autenticado de notificação ao Diretor; até lá, perguntas aparecem apenas no painel.
- [ ] Ligar agentes especialistas à API privada de perguntas; o endpoint autenticado e a caixa no painel estão prontos, mas nenhum agente conectado abre perguntas ainda.
- [ ] Configurar a migração `009_commander_questions.sql` somente no banco privado do Commander.
- [ ] Provar fluxos de ponta a ponta com dados sintéticos e depois amostra real autorizada/redigida; testar deduplicação, sigilo, prompt injection e aprovação.
- [ ] Revisar credencial profissional/questões jurídicas: o agente deve usar rigor de pesquisa avançada sem alegar PhD ou substituir advogado/consultor financeiro.

## P0.8 — Playbook de negociação e contexto integral do SNAKE (17/10/2026)
- [x] Incluir base inicial com fontes Harvard PON, FBI LEB e ISO 10002, traduzida em princípios de negociação por interesses, escuta ativa, desescalada e tratamento de reclamações.
- [x] Atualizar política do runtime para exigir evidência/contexto, escalar ambiguidades e manter aprovação humana para conflito, finanças, assuntos jurídicos e qualquer compromisso.
- [x] Paginar todo o histórico armazenado da conversa/caso relevante, em ordem cronológica; separar a conversa geral do histórico do caso para não misturar fatos entre escopos.
- [x] Enviar o histórico integral ao modelo se couber no limite de contexto; excedeu o limite, falhar fechado sem rascunho ou envio e gerar revisão.
- [x] Testar 260 mensagens em duas páginas, isolamento entre conversa geral e caso, bloqueio sem cobertura integral e ausência de truncamento silencioso.
- [ ] Testar com a conta WhatsApp real em observação; validar upload de histórico, anexos/transcrições e alertas ao Diretor.
- [x] Para históricos que excedam o orçamento, revisar blocos alinhados às mensagens, validar cobertura exata de todos os índices e falhar fechado em caso de omissão, duplicação, mensagem grande ou mais de oito blocos; qualquer rascunho baseado em resumo exige aprovação humana. Implementado localmente em `snakeos` e validado em 74 testes, typecheck e build.
- [ ] Exercitar o revisor com API configurada e teto de gastos ativo em staging; ausência de chave/provedor mantém o fluxo pausado.
- [ ] Validar com uma conta WhatsApp conectada, em observação, incluindo mensagens reais autorizadas e revisão de anexos/transcrições.

## P0.6 — COMMANDER pessoal e isolamento (17/10/2026)
- [x] Separar fila/dados privados do Commander em banco local dedicado; não reutilizar schema nem tabelas do CRM SNAKE.
- [x] Adicionar migração privada versionada e comando `npm run migrate:commander` para PostgreSQL dedicado, sem aplicar migrations Commander ao banco comercial.
- [x] Ligar o worker local do Commander a um plano offline cifrado, sem chamar modelo, Gmail, WhatsApp ou finanças; registrar auditoria de claim/conclusão/falha.
- [x] Painel distingue planejamento offline do worker especialista e mantém ações externas desligadas.
- [x] Evidência local: SNAKE 50/50 testes, TypeScript e builds do serviço/painel aprovados; produção rejeita conexão do Commander sem TLS; AI Engineer offline 8/8 testes de segurança e `compileall` aprovados; política de fila VENOM 3/3 aprovada.
- [ ] Teste HTTP real painel → API → fila → worker após atualizar runtime: processo local escuta em loopback, mas esta sessão não conseguiu alcançar as portas; o navegador do Codex também não alcança `127.0.0.1`.
- [ ] Conectar fila SNAKE privada ao AI ENGINEER da VENOM em staging. Requer credenciais Vercel Queue/OIDC de staging e implementação/QA do adaptador; a fila Python atual está isolada e não recebe missões pessoais.
- [ ] Adicionar conexões Gmail OAuth de leitura/rascunhos, canal WhatsApp para observação, fluxo privado de finanças/cobranças, notificações móveis e painel de auditoria de QA.
- [x] Recriar Preview isolado `dpl_J52T6tHRfT923RfRLTJTeL7WvLYd` após cadastrar variáveis de staging; o build ficou READY sem promover produção. Esse deploy contém o commit remoto `8016c25`, ainda sem o painel `/os` desta revisão.
- [ ] Publicar esta revisão na branch de staging e validar acesso autenticado ao painel; a proteção de autenticação da rota impediu a ferramenta de teste de ler `/api/os/status` remotamente.
- [ ] Não tratar o centro de comando como concluído até validar cada integração ponta a ponta com dados sintéticos, gates de aprovação e QA independente.

- [x] Propor Dependabot semanal para SDK Python e GitHub Actions, sem auto-merge (arquivo ainda em branch/PR, só estará ativo após aprovação/merge).

## P0.9 — Runner local gratuito (17/10/2026)
- [x] Tornar o runner do SNAKE resiliente a portas locais ocupadas: núcleo e painel procuram a próxima porta livre, continuam limitados a `127.0.0.1` e exibem a URL escolhida; pontos iniciais podem ser configurados por ambiente.
- [x] Testar a escolha de portas com uma porta loopback ocupada e rejeitar configuração inválida (2 testes novos).
- [x] Iniciar o painel local em simulação, com fila pessoal e banco separado no disco; startup exibiu `http://127.0.0.1:13002` e Next.js `Ready`. Não houve conexão OpenAI, Gmail ou WhatsApp nem envio externo.
- [x] Revalidar SNAKE: 76/76 testes em 17 arquivos, `npm run typecheck`, `npm run build` e build do painel Next.js aprovados.
- [ ] HTTP real entre navegador isolado e `127.0.0.1` segue bloqueado pela política de rede do ambiente; a tentativa PowerShell recebeu “acesso ao soquete proibido” e o navegador Codex não concedeu acesso a loopback. A fila/worker foi validada por teste de integração em PGlite, mas a interface ainda precisa ser aberta e conferida no navegador normal do notebook.
- [ ] Não publicar túnel público nem mover dados privados para serviço gratuito sem uma configuração de acesso explicitamente protegida; esta execução permanece apenas local/staging.

## P0.10 — Painel do Centro de Comando e despacho seguro (17/10/2026)
- [x] Criar `/os` protegido com estado dos agentes vindo de `/api/os/status`, formulário de missão, estado do COMMANDER, fila, AI_ENGINEER, QA e aprovação do Diretor.
- [x] Exibir e manter explícito que Gmail, WhatsApp e finanças pessoais seguem desconectados/bloqueados; a interface só aceita missões técnicas sintéticas no modo atual.
- [x] Corrigir o estado do AI_ENGINEER para `CONFIGURED_UNVERIFIED` quando Preview está com COMMANDER em fila; não apresentar worker como homologado sem entrega real.
- [x] Smoke local autenticado: `/os` e `/api/os/status` responderam 200 e exibiram os estados esperados; o teste foi observado em RED (404 sem a página) e GREEN após implementação.
- [x] Verificação de código: `npm run build`; política de staging 3/3; testes Python 13/13 incluindo entrega local pela fila embutida e publicação do resultado do worker.
- [ ] Homologar entrega/consumo no Vercel Queue remoto com uma missão sintética. O build Preview está READY, mas a ferramenta remota não aceita `Authorization` Basic para chamar as rotas protegidas; o teste local não substitui o teste remoto.
- [x] Implementar localmente callback autenticado do AI_ENGINEER para armazenamento privado exclusivo e consulta/poll do painel; a homologação da persistência depende de configurar staging sem misturar bancos.
- [ ] Aplicar `commander-migrations/001_engineer_results.sql` somente no Supabase privado do Commander, cadastrar os segredos de staging documentados em `ai_engineer/README.md` e validar retorno persistido ponta a ponta.
- [ ] Conectar Gmail e WhatsApp oficiais, revisar dados financeiros em banco pessoal separado, implementar canal de notificação/handoff e auditar QA/security antes de qualquer operação com dados reais.
