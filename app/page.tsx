import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Bot, Braces, Check, Gauge, Globe2, Palette, ShoppingCart, Zap } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { HeroVideo } from "@/components/hero-video";
import { MobileMenu } from "@/components/mobile-menu";
import { SnakeAI } from "@/components/snake-ai";
import { ServiceExplorer } from "@/components/service-explorer";
import { ProcessExperience } from "@/components/process-experience";
import { PortfolioProof } from "@/components/portfolio-proof";
import { services, venomCodeCase } from "@/lib/content/records";
import "./hero.css";
import "./experience.css";

export const metadata: Metadata = { alternates: { canonical: "/" }, robots: { index: true, follow: true } };

const capabilityIcons: Record<string, typeof Globe2> = { websites: Globe2, ecommerce: ShoppingCart, systems: Braces, "ai-automation": Bot, branding: Palette, performance: Gauge };
const capabilityOrder = ["websites", "ecommerce", "systems", "ai-automation", "branding", "performance"];
const capabilities = capabilityOrder.map(slug => {
  const service = services.find(item => item.slug === slug)!;
  return { icon: capabilityIcons[service.slug], slug: service.slug, number: service.number, title: service.title, text: service.capabilityDescription };
});

export default function Home() {
  return <main className="venom-home">
    <HeroVideo header={<header className="site-header">
      <a className="wordmark" href="#top" aria-label="VENOM CODE — início"><span>VENOM</span><b>CODE</b></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#servicos">Serviços</a><a href="#portfolio">Portfólio</a><a href="#processo">Processo</a><a href="#snake">SNAKE</a></nav>
      <a className="header-cta" href="#contato">Iniciar projeto <ArrowRight size={15}/></a><MobileMenu/>
    </header>}>
      <p className="eyebrow"><span/> Estratégia · Design · Tecnologia</p>
      <h1>Mais que código.<br/><em>Resultado.</em></h1>
      <p className="hero-copy">Estratégia, identidade, tecnologia e inteligência artificial para transformar ideias em produtos digitais reais.</p>
      <div className="hero-actions"><a className="button primary" href="#contato">Iniciar projeto <ArrowRight size={18}/></a><SnakeAI label="Planejar meu projeto com IA"/></div>
    </HeroVideo>

    <section className="capability-rail" aria-label="Capacidades da VENOM CODE"><div className="shell capability-grid">{capabilities.map(({icon:Icon,slug,number,title,text})=><a href={`#service-${slug}`} className="capability-item" key={title}><small>{number}</small><Icon size={22}/><div><strong>{title}</strong><span>{text}</span></div></a>)}</div></section>
    <section className="manifesto shell section-pad"><p className="section-kicker">ESTRATÉGIA. IDENTIDADE. TECNOLOGIA. EXECUÇÃO.</p><div className="manifesto-grid"><h2>Sua marca não precisa só existir.<br/><span>Precisa avançar.</span></h2><div><p>Somos um estúdio de tecnologia para negócios que precisam transformar visão em produto, operação e crescimento.</p><p>Você não precisa saber qual tecnologia precisa. Conte o problema. A gente desenha a solução.</p></div></div></section>

    <ServiceExplorer/>
    <section className="editorial-break"><div className="shell"><p className="section-kicker">IDEIAS. CÓDIGO. RESULTADO.</p><h2>Não fazemos só sites.<br/><span>Construímos o que o negócio precisa para funcionar.</span></h2><p>Estratégia · Design · Código · IA · Automação · Deploy.</p></div></section>

    <section className="venom-case section-pad" id="cases"><div className="shell"><div className="case-heading"><p className="section-kicker">03 / CASE 001 — {venomCodeCase.title}</p><span>PRIMEIRO CLIENTE: NÓS MESMOS</span></div><div className="venom-case-grid"><div><h2>Antes de construir para clientes,<br/><em>construímos para nós.</em></h2><p>{venomCodeCase.description}</p><p className="case-proof">Não é promessa. É o que está rodando agora.</p><ul><li><Check size={16}/> Identidade e direção de arte próprias</li><li><Check size={16}/> Abertura audiovisual e interface responsiva</li><li><Check size={16}/> Serviços interativos e briefing integrado</li><li><Check size={16}/> Código versionado e publicação na Vercel</li></ul><div className="case-tech"><span>Next.js</span><span>React</span><span>GitHub</span><span>Vercel</span></div></div><figure><Image src={venomCodeCase.media[0].src} alt={venomCodeCase.media[0].alt} width={venomCodeCase.media[0].width} height={venomCodeCase.media[0].height} sizes="(max-width: 900px) 100vw, 60vw"/><figcaption>VENOM CODE / CONSTRUÍMOS PRIMEIRO PARA NÓS</figcaption></figure></div><div className="case-evidence"><div><span>NO AR</span><p>O site que você está explorando.</p></div><div><span>EM EVOLUÇÃO</span><p>Novos fluxos, conteúdo e experiência.</p></div><div><span>PRÓXIMA CAMADA</span><p>SNAKE com inteligência aplicada e briefing protegido.</p></div></div></div></section>
    <PortfolioProof/>

    <section className="product-labs section-pad"><div className="shell"><div className="section-head"><div><p className="section-kicker">04 / VENOM LABS</p><h2>Ideias em construção.</h2></div><p>Produtos próprios para explorar novas experiências. Ainda em desenvolvimento, sem métricas ou resultados de lançamento.</p></div><div className="product-labs-grid"><article className="lab-music"><div className="lab-topline"><span>MÚSICA / PRODUTO DIGITAL</span><b>EM DESENVOLVIMENTO</b></div><div className="music-wave" aria-hidden="true">{[18,42,65,38,85,100,56,80,40,68,30,48,20].map((height,i)=><i key={i} style={{height:`${height}%`}}/>)}</div><h3>SolMusic<span>Som. Descoberta. Conexão.</span></h3><p>Uma experiência em construção para descoberta, conexão e criação no universo da música.</p><small>VISÃO DO PRODUTO · TELAS EM PREPARAÇÃO</small></article><article className="lab-stay"><div className="lab-topline"><span>HOSPITALIDADE / PRODUTO DIGITAL</span><b>EM DESENVOLVIMENTO</b></div><div className="stay-art" aria-hidden="true"><span>12</span><i/></div><h3>STAY12<span>Chegar. Ficar. Voltar.</span></h3><p>Tecnologia para tornar a jornada de hospedagem mais direta, inteligente e memorável.</p><small>VISÃO DO PRODUTO · TELAS EM PREPARAÇÃO</small></article></div></div></section>

    <ProcessExperience/>
    <section className="snake-feature section-pad" id="snake"><div className="shell snake-feature-grid"><div><p className="section-kicker">06 / SNAKE // VENOM AI</p><div className="snake-online"><i/> VENOM AI // ONLINE</div><h2>Planeje seu projeto<br/>com a <em>SNAKE.</em></h2><p>SNAKE é a consultora digital da VENOM. Ela entende o problema, recomenda caminhos e organiza um briefing para o nosso time.</p><SnakeAI label="Planejar meu projeto com IA"/></div><div className="snake-console"><div className="snake-console-head"><Bot size={22}/><span>SNAKE / CONSULTORA DIGITAL</span></div><div className="snake-chat" aria-label="Demonstração de conversa com a SNAKE"><p className="snake-message user">Quero vender online, mas ainda não sei qual plataforma usar.</p><p className="snake-message ai"><b>SNAKE</b> Primeiro vamos entender catálogo, operação e entrega. Depois escolhemos a tecnologia.</p></div><ol><li><span>01</span>Conte o objetivo do seu negócio.</li><li><span>02</span>Receba caminhos recomendados.</li><li><span>03</span>Leve um briefing claro ao time.</li></ol><p className="snake-state">CONVERSA PROTEGIDA · CONTEXTO LIMITADO · BRIEFING GUIADO</p></div></div></section>

    <section className="contact section-pad" id="contato"><div className="shell contact-grid"><div><p className="section-kicker">07 / PRÓXIMO MOVIMENTO</p><h2>Tem um problema real?<br/><em>Vamos atacar.</em></h2><p>Conte o momento do seu negócio. A gente responde com clareza sobre o melhor caminho — mesmo que ele não comece por código.</p><div className="contact-note"><Zap size={18}/><span>Resposta humana. Conversa direta. Sem apresentação genérica.</span></div></div><ContactForm/></div></section>
    <footer><div className="shell footer-main"><a className="wordmark" href="#top"><span>VENOM</span><b>CODE</b></a><p>Ideias. Código. Resultado.</p><div><a href="#servicos">Serviços</a><a href="#portfolio">Portfólio</a><a href="#contato">Contato</a></div></div><div className="shell footer-bottom"><span>© 2026 VENOM CODE</span><span>BUILD · EXECUTE · EVOLVE</span></div></footer>
    <SnakeAI label="Planejar projeto com IA" floating />
  </main>;
}
