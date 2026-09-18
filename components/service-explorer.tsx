"use client";

import { ArrowRight, Bot, Braces, Globe2, Palette, ShoppingCart, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const services = [
  { id:"web", icon:Globe2, image:"/images/service-websites.webp", number:"01", title:"Websites", line:"A primeira impressão.\nUma presença inteira.", intro:"Da página de campanha a um site com conteúdo, atendimento e integrações. O formato acompanha o objetivo do negócio.", interest:"Site ou landing page", intent:"Preciso de presença profissional", visual:["Sua marca.","Seu próximo nível."], integrations:["Microsites","Login","Formulários inteligentes","Banco de dados","CRM","Pagamentos","E-mail","Calendário","Supabase","APIs","IA integrada"], offers:[
    ["Landing pages", "Campanhas, lançamentos e captação de contatos com uma mensagem e um próximo passo claros."],
    ["Sites institucionais e portfólios", "Serviços, diferenciais, conteúdo e trabalhos organizados para empresas, profissionais e criadores."],
    ["Catálogos e conteúdo dinâmico", "Produtos, projetos ou publicações com estrutura de conteúdo atualizável."],
    ["Áreas restritas e integrações", "Login, formulários, agenda, CRM ou IA quando fizerem sentido. Acesso, dados e APIs são avaliados no escopo."]], example:"Uma clínica pode começar com serviços, equipe e agendamento. Uma marca em lançamento pode precisar apenas de uma landing page bem resolvida.", scope:"Começamos pelo objetivo, conteúdo disponível e ação esperada do visitante. Recursos com login ou dados pessoais exigem definição de permissões e segurança." },
  { id:"ai", icon:Bot, image:"/images/service-ai.webp", number:"04", title:"IA & Automação", line:"Menos repetição.\nMais inteligência.", intro:"Conecte as etapas que hoje dependem de copiar, colar e responder tudo manualmente. IA onde ela ajuda, regras claras onde elas bastam.", interest:"Automação e IA", intent:"Quero automatizar minha operação", visual:["Entrada","Entendimento","Ação"], integrations:["Atendimento inteligente","Qualificação de leads","Briefing","Recomendação","FAQ inteligente","Resumo e classificação","Integração entre sistemas","Propostas iniciais"], offers:[
    ["Atendimento e FAQ inteligente", "Assistentes baseados no conteúdo do negócio, com limites claros e encaminhamento para uma pessoa."],
    ["Qualificação e briefing", "Organização das informações de um pedido, perguntas relevantes e resumo para o time comercial."],
    ["Fluxos entre ferramentas", "Formulário → CRM → e-mail → responsável. Integrações dependem das APIs e permissões disponíveis."],
    ["Classificação e resumos", "Triagem de solicitações e síntese de dados ou documentos, com revisão humana quando necessária."]], example:"Um pedido chega pelo site, é organizado por assunto e segue para a pessoa certa com o contexto que ela precisa para responder.", scope:"Validamos dados, volume, custo por uso e tratamento de erros. Decisões sensíveis e compromissos comerciais permanecem com a equipe." },
  { id:"commerce", icon:ShoppingCart, image:"/images/service-commerce.webp", number:"02", title:"E-commerce", line:"Da descoberta\nao pedido.", intro:"Uma jornada de compra que combina apresentação, confiança e operação. A plataforma é escolhida depois de entender o catálogo e o modelo de venda.", interest:"E-commerce", intent:"Quero vender online", visual:["Catálogo","Carrinho","Checkout"], integrations:["Shopify","Pix e cartão","B2B","Sob encomenda","Retirada","Assinaturas","Marketplaces","Área do cliente","Estoque e entrega"], offers:[
    ["Loja e catálogo digital", "Produtos, variações, categorias, busca e uma experiência adaptada ao celular."],
    ["Shopify e plataformas de loja", "Configuração e personalização de uma base existente quando isso reduz complexidade."],
    ["B2B e pedidos sob consulta", "Catálogos comerciais, solicitação de orçamento e fluxos para representantes ou revendedores."],
    ["Pagamentos, estoque e entrega", "Integrações com provedores compatíveis. Marketplace, assinatura e repasses pedem análise específica."]], example:"Uma loja pode vender itens de pronta entrega no checkout e receber pedidos sob medida por orçamento, sem misturar as duas jornadas.", scope:"Precisamos conhecer catálogo, estoque, logística e meios de pagamento. Não prometemos integração antes de verificar a plataforma." },
  { id:"systems", icon:Braces, image:"/images/service-systems.webp", number:"03", title:"Sistemas", line:"Sua operação.\nDo seu jeito.", intro:"Ferramentas construídas em torno do trabalho real: quem usa, o que precisa fazer e quais informações precisa acessar.", interest:"Sistema sob medida", intent:"Tenho uma ideia de sistema", visual:["Pessoas","Processos","Visibilidade"], integrations:["Sistemas internos","Dashboards","Portais","Painéis","Plataformas","Autenticação","Banco de dados","APIs","Workflows"], offers:[
    ["Painéis e ferramentas internas", "Cadastros, tarefas, acompanhamento e visualização das informações relevantes para a equipe."],
    ["Portais e áreas de clientes", "Acesso a conteúdos, solicitações e histórico com perfis e permissões definidos."],
    ["MVP de produto digital", "Uma primeira versão com o fluxo principal para testar uso real antes de ampliar o produto."],
    ["APIs e integrações", "Conexão com serviços existentes após avaliar documentação, limites e manutenção."]], example:"Uma empresa de serviços pode centralizar solicitações, responsáveis e andamento em um painel, em vez de procurar tudo em conversas soltas.", scope:"SaaS, múltiplas empresas, alta escala e setores regulados precisam de validação técnica. Definimos a menor primeira entrega útil." },
  { id:"brand", icon:Palette, image:"/images/service-branding.webp", number:"05", title:"Branding", line:"Uma marca\nque ocupa espaço.", intro:"Estratégia e expressão visual trabalhando juntas. A identidade precisa fazer sentido na apresentação, no produto e no contato com o cliente.", interest:"Branding e identidade", intent:"Minha marca precisa evoluir", visual:["Identidade","Expressão","Presença"], integrations:["Estratégia","Identidade visual","Posicionamento","Linguagem","Digital brand system","Direção de arte"], offers:[
    ["Posicionamento e mensagem", "Público, proposta de valor e linguagem para explicar com clareza por que a marca existe."],
    ["Identidade visual", "Símbolo, tipografia, cores e princípios de composição para aplicações consistentes."],
    ["Direção de arte digital", "Imagem, interface e peças de lançamento com uma linguagem reconhecível."],
    ["Aplicação e orientações", "Organização dos ativos e orientações de uso para manter consistência nas próximas entregas."]], example:"A mesma identidade conecta o site, uma apresentação comercial e o material de lançamento sem parecer três marcas diferentes.", scope:"O escopo depende do estágio da marca e dos materiais existentes. Pesquisa jurídica e registro de marca são serviços especializados externos." },
  { id:"growth", icon:TrendingUp, image:"/images/service-performance.webp", number:"06", title:"Performance", line:"Medir. Aprender.\nEvoluir.", intro:"Uma presença digital precisa continuar melhorando depois da publicação. Primeiro, enxergar os gargalos; depois, priorizar o que mudar.", interest:"Performance e crescimento", intent:"Quero melhorar um site que já existe", visual:["Observar","Priorizar","Testar"], integrations:["Analytics","Conversão","Experimentos","SEO técnico","Core Web Vitals","Acessibilidade","Evolução contínua"], offers:[
    ["Diagnóstico de experiência", "Leitura das jornadas, formulários e pontos de abandono para encontrar atritos concretos."],
    ["Velocidade e acessibilidade", "Revisão de carregamento, experiência mobile e barreiras de uso."],
    ["Medição de conversão", "Definição de eventos e indicadores ligados ao objetivo, respeitando consentimento e privacidade."],
    ["Evolução contínua", "Hipóteses, melhorias priorizadas e comparação com os resultados observados."]], example:"Antes de comprar mais tráfego, podemos investigar se o formulário funciona no celular e se o visitante entende o próximo passo.", scope:"Métricas dependem de acesso e dados disponíveis. Não prometemos faturamento ou posição em busca; trabalhamos com hipóteses verificáveis." },
];

const serviceOrder = ["web","commerce","systems","ai","brand","growth"];
const routes = [
  ["Quero vender online","commerce"],
  ["Preciso de presença profissional","web"],
  ["Minha marca precisa evoluir","brand"],
  ["Quero automatizar minha operação","ai"],
  ["Tenho uma ideia de sistema","systems"],
] as const;

export function ServiceExplorer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const service = services[selected];
  function open(index:number) { setSelected(index); dialog.current?.showModal(); dialog.current?.scrollTo(0,0); }
  function brief() {
    dialog.current?.close();
    window.dispatchEvent(new CustomEvent("venom-brief", {detail:{interest:service.interest}}));
    document.getElementById("contato")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
    document.querySelector<HTMLInputElement>('[name="name"]')?.focus({preventScroll:true});
  }
  return <>
    <section className="experience-services section-pad" id="servicos">
      <div className="shell">
        <div className="section-head"><div><p className="section-kicker">01 / CAPACIDADES</p><h2>Escolha um caminho.<br /><span>Explore o que é possível.</span></h2></div><p>Cada negócio pede uma combinação diferente. Abra uma área para conhecer aplicações, possibilidades e o que precisamos avaliar.</p></div>
        <div className="experience-grid">{serviceOrder.map(id=>services.findIndex(service=>service.id===id)).map(i=>{const {icon:Icon,...item}=services[i]; return <button key={item.id} className={`experience-card experience-${item.id}`} onClick={()=>open(i)} aria-haspopup="dialog" aria-label={`Explorar ${item.title}`}>
          <span className="experience-card-art" aria-hidden="true"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 58vw" /></span>
          <span className="experience-card-top"><span>{item.number} / {item.title}</span><Icon size={22} aria-hidden="true" /></span>
          <span className="service-visual" aria-hidden="true">{item.visual.map((word,n)=><span key={word}><i>{String(n+1).padStart(2,"0")}</i>{word}</span>)}</span>
          <h3>{item.line.split("\n").map((line,n)=><span key={line}>{n>0&&<br/>}{line}</span>)}</h3>
          <span className="experience-card-bottom">Explorar {item.title}<ArrowRight size={18} aria-hidden="true"/></span>
        </button>})}</div>
      </div>
    </section>
    <section className="solution-routing shell section-pad" aria-labelledby="solution-title"><div><p className="section-kicker">02 / O QUE VOCÊ PRECISA CONSTRUIR?</p><h2 id="solution-title">Comece pelo problema.<br /><em>A solução vem depois.</em></h2><p>Você não precisa saber qual tecnologia precisa. Conte o problema. A gente desenha a solução.</p></div><div className="solution-list">{routes.map(([label,id])=><button key={id} onClick={()=>open(services.findIndex(service=>service.id===id))} aria-haspopup="dialog"><span>{label}</span><ArrowRight size={18}/></button>)}</div></section>
    <dialog ref={dialog} className="service-dialog" aria-labelledby="service-dialog-title" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}>
      <div className="service-dialog-body">
        <button className="service-dialog-close" onClick={()=>dialog.current?.close()} aria-label="Fechar detalhes do serviço"><X size={22}/></button>
        <div className="service-dialog-hero">
          <div><p className="section-kicker">VENOM CODE / {service.number}</p><h2 id="service-dialog-title">{service.title}</h2><p className="service-dialog-intro">{service.intro}</p></div>
          <figure><Image src={service.image} alt="" fill sizes="(max-width: 700px) 100vw, 48vw" priority /><figcaption>VISUAL CONCEITUAL / {service.title.toUpperCase()}</figcaption></figure>
        </div>
        <div className="service-offers">{service.offers.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="service-integrations"><span>POSSIBILIDADES E INTEGRAÇÕES</span><div>{service.integrations.map(item=><b key={item}>{item}</b>)}</div></div>
        <div className="service-example"><span>NA PRÁTICA</span><p>{service.example}</p></div>
        <div className="service-scope"><h3>Antes de definir o projeto</h3><p>{service.scope}</p></div>
        <button className="button primary" onClick={brief}>Quero conversar sobre {service.title}<ArrowRight size={18}/></button>
      </div>
    </dialog>
  </>;
}
