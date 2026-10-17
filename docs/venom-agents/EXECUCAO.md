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
- [ ] Criar interface autenticada COMMANDER → fila → worker AI_ENGINEER.
- [ ] Configurar OpenAI API pelo secret manager e orçamento antes de chamadas pagas.
- [ ] Garantir que APIs pessoais/financeiras jamais se misturem à agência.
- [ ] Hospedar worker persistente em serviço separado, após benchmark de custos e QA (Hostinger VPS é opção, não obrigação).
- [ ] Rodar benchmark Claude Code vs OpenAI no mesmo conjunto de tarefas e orçamento para decidir se vale assinar.
- [ ] Criar relatório de produtividade e evolução tecnológica com resultados verificáveis.
Nenhuma dessas pendências deve bloquear pesquisas, planos e testes locais sem custo.

- [x] Propor Dependabot semanal para SDK Python e GitHub Actions, sem auto-merge (arquivo ainda em branch/PR, só estará ativo após aprovação/merge).
