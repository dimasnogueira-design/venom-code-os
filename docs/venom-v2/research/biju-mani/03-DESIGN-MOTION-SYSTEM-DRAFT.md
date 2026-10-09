# BIJU MANI — DESIGN SYSTEM + MOTION SYSTEM — DRAFT 0.2

**Data:** 2026-10-09  
**Status:** proposta técnica / direção criativa; **NÃO É DESIGN SYSTEM FINAL APROVADO**.  
**Projeto:** Biju Mani, site institucional e comercial responsivo.  
**Proveniência:** continuidade de `00-EXTRACT.md`, `01-REDESIGN-DIRECTION.md` e `02-BRAND-IDENTITY-AUDIT.md`, neste mesmo diretório.  
**Princípio:** **CINEMA INTERNACIONAL COM ALMA VISUAL BRASILEIRA**.

## 0. Objetivo e proteção do escopo

Criar experiência digital de alto nível, orientada por produto real, assinatura brasileira, autoridade gastronômica e conversão para lojas/delivery. O site deve parecer uma marca autoral de reconhecimento internacional — não uma loja genérica de sorvetes, não uma cópia italiana, nem uma demonstração gratuita de WebGL.

Este documento **não autoriza** alteração da produção da Venom, STAY12, SNAKE, leads, ou do site atual da Biju Mani. Desenvolver a Biju Mani em repositório/ambiente isolado e preview privado até aprovação do proprietário. O acervo da pesquisa fica nesta branch; **não implementar componentes da Biju no código da Venom**.

## 1. Verdade editorial e reivindicações

- **Marca:** Biju Mani, também posicionada no site como Sorveteria Brasileira; confirmar grafia comercial final com proprietário.
- **Autor:** chef sorveteiro **Guilherme Geraldini** (nome expandido Guilherme Geraldini Pereira na lista oficial do festival).
- **Produto-assinatura:** **Appia**; composição reportada inclui cerveja artesanal de trigo e mel, mel, raspas de limão, macadâmia e caramelo salgado; validar ingredientes e alergênicos por ficha técnica antes da publicação.
- **Conquista:** campeã da etapa nacional em 2025; **10º lugar na final mundial do Gelato Festival World Masters 2026 entre 34 finalistas**, segundo imprensa.
- **Precisão obrigatória:** *10º lugar na final mundial de 2026* é diferente do **World Ranking** acumulado da organização. **NÃO** escrever "10ª do ranking mundial" ou "10ª melhor sorveteria do mundo" sem fundamentação e aprovação.
- **Lojas:** Cidade São Francisco e Pinheiros; endereços, horários e canais de delivery precisam de confirmação atualizada por unidade.
- **Identidade:** preservar brasilidade, narrativa Biju/Mani, ingredientes brasileiros e compromisso com fornecedores/sustentabilidade — somente afirmações conferidas.
- **Copyright:** fotografia, ilustrações, logotipos, selos e material de imprensa exigem titularidade/licença/autorização adequada.

Referências documentais:
- Site existente: https://bijumani.com.br/
- Participação oficial 2026: https://worldmasters.gelatofestival.com/pages/world-final-2026
- **Ranking acumulado separado:** https://worldmasters.gelatofestival.com/pages/world-ranking-2026
- Resultado da final: https://revistamenu.com.br/brasil-gelato-festival-world-masters-2026
- Loja em Pinheiros: https://www.seudinheiro.com/2026/lifestyle/esqueca-o-gelato-italiano-biju-mani-chega-a-pinheiros-provando-que-o-brasil-e-soberano-tambem-na-arte-de-fazer-sorvete-lefp/

## 2. Benchmark — estudar princípios, não copiar interfaces

1. **Lucciano's / estudio nk:** https://www.nk.studio/work/luccianos/ — sofisticação, microinterações, consistência e site como ecossistema de marca.
2. **Gelateria Dondoli / Dinamo:** https://dinamodigitale.it/en/works/gelateria-dondoli-integrated-digital-project — conteúdo de ingredientes, mestres sorveteiros, catálogo acessível e continuidade digital/loja.
3. **Dondoli live:** https://www.gelateriadondoli.com/it — legibilidade, narrativa de produto, acesso aos sabores e pessoas.
4. **Biju Mani existente:** https://bijumani.com.br/ — conteúdo, história, fotografia, linguagem e canais atuais; não presumir atualização.

Critério de análise: tipografia, escala, hierarquia, mídia, CTA, transições, hover/touch, custo de carregamento, acessibilidade, localização, narrativa. Não clonar componentes, assets ou textos.

## 3. Visão da experiência e arquitetura

**Jornada:** fascínio visual → prova da conquista → o Appia e sua composição → brasilidade/ingredientes → sabores → autor → lojas/delivery.

Capítulos propostos:
1. **HERO / Appia + conquista** — título editorial curto; foto/vídeo autorizado; duas ações: "Conheça o Appia" e "Visite uma loja".
2. **APPIA / composição** — ingrediente por ingrediente em camadas, rótulos úteis e evolução visual pelo scroll.
3. **BRASILIDADE / origem dos sabores** — seleção de ingredientes e histórias verificadas, com fotografia tátil.
4. **SABORES / vitrine atual** — filtros simples, destaques e sazonais; sem inventar disponibilidade.
5. **O AUTOR / Guilherme** — retrato e depoimento real aprovado, craft, processo e reconhecimento.
6. **LOJAS / duas unidades** — endereço, horário, rota, canais de pedido específicos e confirmação de unidade.
7. **PROVA / prêmios e imprensa** — cronologia verificável; não usar selo sem autorização.
8. **FINAL / contato + redes** — navegação e conversão.

**Copy-draft, sujeito a aprovação:** "O Brasil tem sabor de conquista." / "Appia. Do Brasil para a final mundial." / "10º lugar na final mundial de 2026." Evitar transformar resultado em afirmação enganosa de ranking.

## 4. Design System: tokens e componentes

### 4.1 Princípio de tokens: SEM cores oficiais inventadas
- `color.brand.primary`, `color.brand.secondary`, `color.brand.accent`: a preencher **após recebimento do manual e arquivos originais**.
- `color.product.cream`, `color.product.honey`, `color.product.caramel`, `color.product.citrus`, `color.product.fruit`: **famílias cromáticas de referência, não valores hex aprovados**.
- `color.semantic.surface`, `color.semantic.ink`, `color.semantic.muted`, `color.semantic.action`, `color.semantic.focus`: criar pares verificáveis AA por tema.
- Uso de fundos escuros quentes apenas quando a fotografia justificar; alternar áreas claras/cor real da marca. Evitar "bege de luxo" genérico, preto permanente, bandeira literal e tropicalismo decorativo.

### 4.2 Tipografia
- `font.display`: serif editorial expressiva OU grotesca autoral a escolher depois de auditar a marca/licença.
- `font.body`: sans com ótima leitura em pt-BR (acentos completos).
- Tipografia fluida com `clamp()`; título hero grande sem invadir CTAs; corpo mobile idealmente 16–18px; legendas legíveis, **não abaixo de 14px para conteúdo importante**.
- Usar duas famílias no máximo, se aprovadas; pesos estritamente necessários; fontes self-hosted/licenciadas quando possível.

### 4.3 Layout / grid
- **Mobile-first**: 320–767 px; **tablet**: 768–1199 px; **desktop**: >=1200 px. Breakpoints são guias, ajustar quando conteúdo pedir.
- Mobile: 1 coluna, gutters 20–24px; tablet: 6–8 colunas; desktop: 12 colunas e container com máximo contextual (~1440 px).
- Respeitar safe areas/notch, barras do navegador e teclado do iOS. Considerar `100svh` / `100dvh` com cautela em cenas de tela cheia.
- Hierarquia: fotografia principal > headline > prova > CTA. Sem texto branco em fotografia sem scrim/área sólida testada.
- Componentes: `SiteHeader`, `HeroAppia`, `AwardProof`, `IngredientChapter`, `FlavorGallery`, `StoryChapter`, `FounderStory`, `StoreSelector`, `DeliveryActions`, `PressTimeline`, `SiteFooter`, `AccessibleMediaControls`.

### 4.4 Elementos vetoriais e mascote/tucano — GATE
O usuário identificou elementos vetoriais e um pássaro/tucano cujo bico remete a um cone. A auditoria da marca **ainda não confirma o papel oficial desse desenho**.
- Obter vetores oficiais e licença do proprietário antes de redesenho, rig 3D, mascote recorrente ou assinatura visual.
- Classificar: logotipo principal / personagem secundário / ilustração de embalagem / arte de campanha.
- Se confirmado: experimentar microcenas editoriais, `SVG` vetorial suave e **rotação controlada do cone**. Evitar mascote de jogo/cartum que roube destaque da fotografia.
- Se não confirmado: usar apenas fotografia de produto, ingredientes e grafismos comprovadamente oficiais.

## 5. Motion System — direção e limites

**Sensação:** artesanal, fluido, desejável, preciso, nunca excesso digital.

| Padrão | Proposta | Implementação preferida |
|---|---|---|
| Entrada editorial | Títulos aparecem em máscara, sem atraso para descobrir conteúdo | CSS / GSAP mínimo |
| Macro Appia | Leve profundidade entre produto, luz e texto | CSS transform / GSAP |
| Composição de ingredientes | Camadas convergem pela rolagem; após o clímax, revelar composição estática e legível | GSAP ScrollTrigger + DOM |
| Galeria de sabores | Troca direta, gestos naturais e foco preservado | CSS + estado React |
| Micromovimentos | Hover apenas em dispositivos `hover:hover`; feedback de toque no mobile | CSS |
| Cena de cone/ilustração | Somente com asset oficial e protótipo aprovado | SVG/CSS/GSAP; WebGL se necessário |
| Reduced motion | Estado estático equivalente, nenhuma informação escondida | CSS media query + fallback |

Tokens provisórios de animação (não são valores finais de marca):
- `motion.fast` 160–220 ms; `motion.standard` 300–500 ms; `motion.reveal` 600–900 ms.
- Deslocamento curto, opacidade progressiva e `transform`; evitar motion de `top/left` e grandes filtros em scroll.
- Sem scroll-jacking, sem tela de loading forçada, sem flash, sem autoplay com áudio.
- Rotação/parallax por inclinação do celular: **opcional** e apenas mediante gesto/permissão explícita no iOS quando aplicável, com alternativa por scroll/touch. Não vincular informação essencial ao giroscópio.
- Three.js/WebGL apenas após protótipo demonstrar benefício real, performance e fallback adequados. Para a primeira versão, **não são pré-requisitos**.

## 6. Experiências diferentes — mesmo sistema

### Mobile, prioridade absoluta
- Imagem do hero recortada especificamente para vertical; escolha de ponto focal manual.
- Hero enxuto, sem vídeo pesado bloqueando LCP; conteúdo, CTAs e prova legíveis imediatamente.
- Barra inferior discreta para **LOJAS / DELIVERY** quando útil, respeitando safe-area.
- Ingredientes em sequência de cartões/frames associados ao scroll natural; sem pinagem longa que aprisiona o dedo.
- Navegação touch: alvos >=44×44 px; carrosséis com botões, labels e swipe opcionais.
- Não depender de hover; `prefers-reduced-motion` plenamente funcional.
- Testar iPhone real (Safari) e Android real (Chrome).

### Desktop
- Composição editorial larga, parallax suave, camadas e maiores respiros.
- Hero com vídeo macro somente se houver material autorizado e arquivo otimizado; imagem responsiva como fallback.
- Ingredientes podem montar uma cena mais complexa, mas texto/CTA permanecem acessíveis.
- Mouse parallax com amplitude pequena; jamais perturbar leitura.

### Tablets e transições
- Validar orientações vertical/horizontal, landscape mobile, zoom 200%, mudanças de viewport e navegação por teclado.

## 7. Stack de produção sugerida (não instalada neste projeto ainda)

- Next.js + TypeScript + componentes React.
- CSS custom properties/tokens; Tailwind opcional conforme projeto; evitar dependências duplicadas.
- GSAP/ScrollTrigger apenas nos capítulos realmente animados; lazy load quando possível.
- Assets otimizados (AVIF/WebP; vídeo MP4/WebM quando viável) e `next/image` com tamanhos corretos.
- Conteúdo em estrutura simples versionada ou CMS **se houver demanda real de atualização dos sabores**.
- GitHub + Vercel preview, ambiente de desenvolvimento separado da produção Venom/STAY12.
- MCP pode melhorar **fluxo de ferramentas do desenvolvedor**; RAG e Fine-Tuning **não são necessários** para este site institucional.
- Integração com iFood/99Food: usar links oficiais validados por unidade; APIs somente se houver autorização e necessidade.

## 8. Qualidade: requisitos de aceite

**Visual / marca**
- Logo, ilustrações, fontes, fotografias, cores e tom aprovados; conteúdo validado pelo dono.
- As premiações indicam claramente o **10º lugar na final 2026**; links de imprensa permitidos e sem logomarcas indevidas.
- Nenhum layout genérico de cards repetidos, nenhuma experiência gamer ou estética da Venom transplantada.

**Funcional / conversão**
- Lojas, rotas, horários e delivery correto por unidade; formulário/contato, caso haja, cumpre LGPD.
- Links testados no smartphone e desktop; nenhuma chamada a pedir em unidade errada.

**Performance (alvos de laboratório/campo, não resultados já medidos)**
- LCP <=2,5s; INP <=200ms; CLS <=0,1 no percentil 75 de dados reais quando disponíveis.
- Orçamento de JS, vídeo e fontes definido no protótipo; animações suspensas quando fora da tela.
- Não iniciar download de vídeo grande só para exibir primeiro frame no 4G móvel.

**Acessibilidade**
- WCAG 2.2 AA como alvo: contraste, teclado, semântica, foco visível, textos alternativos, labels e reduced motion.
- Imagens meramente decorativas com `alt=""`; slides acessíveis sem exigir gesto.
- Sem conteúdo invisível até JavaScript carregar; crawlers recebem informação essencial.

**Matriz QA obrigatória**
- Larguras 320, 375/390, 430, 768, 1024, 1280, 1440 e 1920 px.
- Safari iOS real, Chrome Android real, Chrome/Firefox/Safari desktop.
- Sem sobreposição de títulos, contraste ruim, cortes de objeto, fontes ilegíveis, animações travadas ou elementos fora da tela.
- Capturas antes/depois, checklist P0/P1/P2, QA regressivo após cada integração.

## 9. Entrega incremental com publicação progressiva

**Gate A — Verdade + materiais:** assets oficiais, aprovação dos fatos, direitos de uso, endereços, horários, menus e links atuais. A direção visual só fica FINAL após isso.

**Gate B — Protótipo isolado:** construir uma única **cena Hero Appia** em mobile e desktop (sem projeto inteiro). Revisar contraste, produto e tipografia.

**Gate C — Signature interaction:** prototipar composição Appia por camadas (sem WebGL de início), comparar celular real x desktop, obter aprovação.

**Gate D — MVP navegável em preview:** hero, prêmio, Appia, história essencial, 2 lojas e delivery; sem funcionalidades falsas ou campos inacabados publicados.

**Gate E — Publicação no domínio oficial:** só com aprovação formal da marca, SEO básico, performance e QA P0 fechado, consentimento para mudança de DNS e plano de rollback.

**Gate F — Evolução:** galeria de sabores, cenas vetoriais aprovadas, idiomas futuros, temporada, CMS ou e-commerce caso façam sentido.

## 10. Pendências ao proprietário / material a solicitar

- Logo e manual de marca (SVG, AI ou PDF), paleta e fontes/licenças;
- vetor/arte do suposto tucano ou ilustração em questão, com indicação de uso;
- embalagens e grafismos originais;
- fotos originais dos sorvetes, Appia, Guilherme e lojas;
- direitos de uso do prêmio e das fotos de imprensa;
- ficha técnica e sabor disponível por loja (não inventar disponibilidade);
- endereços, horários, telefone, mapa, Instagram e URLs específicas de cada delivery;
- pessoa responsável por aprovar texto, identidade e versão de lançamento.

## 11. Handoff para outro agente/chat

1. Ler `00-EXTRACT.md`, `01-REDESIGN-DIRECTION.md`, `02-BRAND-IDENTITY-AUDIT.md` e **este documento**.
2. Não propor paleta final, novo logotipo ou mascote sem ativos oficiais.
3. Não editar produção da Venom nem da STAY12; Biju em projeto/repo e preview separados.
4. Produzir **moodboard comparativo e storyboard responsivo** antes de implementar todas as cenas.
5. Entregar protótipo do hero **mobile + desktop**, com imagens do produto autorizadas, e informar tarefas bloqueadas pelos assets.
6. Testar interação Appia como protótipo independente; integrar somente depois de QA/aprovação.
7. Reportar mudanças por Markdown versionado e checklist de aceite.

**Conclusão:** a experiência deve justificar sua sofisticação com produto, cultura, autoria e informação útil; não com efeitos gratuitamente pesados.
