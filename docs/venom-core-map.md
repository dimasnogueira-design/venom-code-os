# Venom Core — mapa de adoção

## Fonte central criada

app/venom-core.css concentra a fundação mínima:

- colors e aliases legados;
- surfaces e borders;
- spacing;
- typography;
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

- Button: variants primary, secondary, ghost e action; disabled/loading.
- IconButton: accessible name e alvo mínimo de 44px.
- VenomClose: especialização global de IconButton.
- Field: label, mensagem, invalid e associação por htmlFor.

## Amostra migrada

- botão de início da intro;
- botão de envio do formulário;
- todos os campos do formulário de contato;
- close do detalhe de serviço;
- close da SNAKE;
- registro Websites na capability rail;
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

lib/content/sample-records.ts contém somente uma amostra de service e uma de
case. /work não foi criado.

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
3. Levar todos os services/cases para a fonte estruturada após revisão
   editorial.
4. Remover aliases legados apenas ao final da migração.
