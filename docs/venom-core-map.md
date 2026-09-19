# Venom Core — mapa de adoção

## Fonte central criada

app/venom-core.css concentra a fundação mínima:

- colors e aliases legados;
- surfaces e borders;
- spacing;
- typography: Display, H1, H2, H3, Body Large, Body, Caption, Technical Label
  e Microcopy;
- grid e catálogo de breakpoints;
- radii e shadows;
- z-index;
- focus-visible;
- motion durations/easings;
- reduced motion dos componentes Core.

Os aliases --lime, --ink, --panel, --white, --muted e --line foram preservados
para manter o visual atual. Breakpoints são catálogo/documentação; CSS custom
properties não podem ser usados diretamente em media queries.

## Componentes base

- Button: variants primary, secondary, ghost e action; disabled/loading; default
  seguro type="button".
- IconButton: accessible name, alvo mínimo de 44px e default seguro
  type="button".
- VenomClose: especialização global de IconButton.
- Field: label, mensagem, invalid, associação por htmlFor, aria-describedby e
  aria-invalid.

## Amostra migrada

- botão de início da intro;
- botão de envio do formulário;
- todos os campos do formulário de contato;
- close do detalhe de serviço;
- close da SNAKE;
- seis serviços na capability rail e no explorador detalhado;
- mídia e descrição do case VENOM CODE.

A migração usa as classes antigas junto das classes Core. Isso preserva a
aparência enquanto prova a API dos componentes.

## Modelos de conteúdo

lib/content/models.ts define ServiceRecord e CaseRecord com:

- id e slug;
- title e description;
- status e provenance;
- relatedServices;
- media com alt;
- CTA com destination opcional;
- client/year para cases.

lib/content/records.ts é a fonte tipada única para os seis serviços atuais e o
case VENOM CODE. A ordem visual continua explícita nos consumidores para
preservar a experiência existente. /work não foi criado.

## Validação nesta fase

- lint e build validam sintaxe, tipos e integração;
- scripts/gate1-core-check.mjs é somente um smoke estrutural por presença de
  contratos essenciais no código-fonte; ele não simula comportamento no
  navegador e não substitui testes de interação ou acessibilidade;
- scripts/gate1-content-check.mjs executa a fonte tipada e valida quantidade,
  IDs, slugs, relações, status, provenance, mídia/alt e destino de CTA;
- as interações mínimas tocadas são verificadas manualmente no navegador sem
  criar uma suíte pesada nesta fase.

## Legado preservado

- globals.css, hero.css e experience.css continuam ativos;
- cores e medidas literais permanecem nesses arquivos;
- .button e estilos específicos de close/form continuam determinando a
  aparência;
- mobile menu, hero final, capability grid e SNAKE visual não foram alterados;
- nenhuma limpeza de CSS foi feita.

## Próxima adoção, sem autorização nesta fase

1. Migrar componentes por área e remover literal somente após comparação.
2. Consolidar ButtonLink quando os links de CTA forem tocados.
3. Levar novos services/cases para a mesma fonte após revisão editorial.
4. Remover aliases legados apenas ao final da migração.
