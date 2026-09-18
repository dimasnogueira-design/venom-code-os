import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Bot, Braces, Check, Gauge, Globe2, Palette, ShoppingCart, Zap } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { HeroVideo } from "@/components/hero-video";
import { MobileMenu } from "@/components/mobile-menu";
import { SnakeAI } from "@/components/snake-ai";
import { ServiceExplorer } from "@/components/service-explorer";
import { ProcessExperience } from "@/components/process-experience";
import "./hero.css";
import "./experience.css";

export const metadata: Metadata = { alternates: { canonical: "/" }, robots: { index: true, follow: true } };

const capabilities = [
  {icon:Globe2,title:"Websites",text:"Presença que converte"},
  {icon:ShoppingCart,title:"E-commerce",text:"Jornadas de compra"},
  {icon:Braces,title:"Sistemas",text:"Operação sob controle"},
  {icon:Bot,title:"IA & Automação",text:"Inteligência aplicada"},
  {icon:Palette,title:"Branding",text:"Identidade que conecta"},
  {icon:Gauge,title:"Performance",text:"Evolução mensurável"},
];

export default function Home() {
  return <main className="venom-home">
    <HeroVideo header={<header className="site-header">
      <a className="wordmark" href="#top" aria-label="VENOM CODE — início"><span>VENOM</span><b>CODE</b></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#servicos">Serviços</a><a href="#cases">Cases</a><a href="#processo">Processo</a><a href="#snake">SNAKE</a></nav>
      <a className="header-cta" href="#contato">Iniciar projeto <ArrowRight size={15}/></a><MobileMenu/>
    </header>}>
      <p className="eyebrow"><span/> Estratégia · Design · Tecnologia</p>
      <h1>Mais que código.<br/><em>Resultado.</em></h1>
      <p className="hero-copy">Estratégia, identidade, tecnologia e inteligência artificial para transformar ideias em produtos digitais reais.</p>
      <div className="hero-actions"><a className="button primary" href="#contato">Iniciar projeto <ArrowRight size={18}/></a><SnakeAI label="Falar com SNAKE AI"/></div>
      <div className="hero-system" aria-label="Status do sistema"><span>SNAKE AI // ONLINE</span><span>SYSTEM STATUS // ACTIVE</span><span>STRATEGY · DESIGN · CODE · AI</span></div>
    </HeroVideo>

    <section className="capability-rail" aria-label="Capacidades da VENOM CODE"><div className="shell capability-grid">{capabilities.map(({icon:Icon,title,text})=><a href="#servicos" className="capability-item" key={title}><Icon size={22}/><div><strong>{title}</strong><span>{text}</span></div></a>)}</div></section>
    <section className="manifesto shell section-pad"><p className="section-kicker">ESTRATÉGIA. IDENTIDADE. TECNOLOGIA. EXECUÇÃO.</p><div className="manifesto-grid"><h2>Sua marca não precisa só existir.<br/><span>Precisa avançar.</span></h2><div><p>Somos um estúdio de tecnologia para negócios que precisam transformar visão em produto, operação e crescimento.</p><p>Você não precisa saber qual tecnologia precisa. Conte o problema. A gente desenha a solução.</p></div></div></section>

    <ServiceExplorer/>
    <section className="editorial-break"><div className="shell"><p className="section-kicker">IDEIAS. CÓDIGO. RESULTADO.</p><h2>Não fazemos só sites.<br/><span>Construímos o que o negócio precisa para funcionar.</span></h2><p>Estratégia · Design · Código · IA · Automação · Deploy.</p></div></section>

    <section className="venom-case section-pad" id="cases"><div className="shell"><div className="case-heading"><p className="section-kicker">03 / CASE 001 — VENOM CODE</p><span>PRIMEIRO CLIENTE: NÓS MESMOS</span></div><div className="venom-case-grid"><div><h2>Antes de construir para clientes,<br/><em>construímos para nós.</em></h2><p>A identidade, a experiência e a tecnologia se encontram neste site. Um projeto real, publicado e em evolução.</p><p className="case-proof">Não é promessa. É o que está rodando agora.</p><ul><li><Check size={16}/> Identidade e direção de arte próprias</li><li><Check size={16}/> Abertura audiovisual e interface responsiva</li><li><Check size={16}/> Serviços interativos e briefing integrado</li><li><Check size={16}/> Código versionado e publicação na Vercel</li></ul><div className="case-tech"><span>Next.js</span><span>React</span><span>GitHub</span><span>Vercel</span></div></div><figure><Image src="/images/venom-brand-study.webp" alt="Estudo de identidade VENOM CODE aplicado a notebook e materiais de marca" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 60vw"/><figcaption>DIREÇÃO DE ARTE / ESTUDO DE APLICAÇÃO DA MARCA</figcaption></figure></div><div className="case-evidence"><div><span>NO AR</span><p>O site que você está explorando.</p></div><div><span>EM EVOLUÇÃO</span><p>Novos fluxos, conteúdo e experiência.</p></div><div><span>PRÓXIMA CAMADA</span><p>SNAKE com conversa por IA e limites de uso.</p></div></div></div></section>

    <section className="product-labs section-pad"><div className="shell"><div className="section-head"><div><p className="section-kicker">04 / VENOM LABS</p><h2>Ideias em construção.</h2></div><p>Produtos próprios para explorar novas experiências. Ainda em desenvolvimento, sem métricas ou resultados de lançamento.</p></div><div className="product-labs-grid"><article className="lab-music"><div className="lab-topline"><span>MÚSICA / PRODUTO DIGITAL</span><b>EM DESENVOLVIMENTO</b></div><div className="music-wave" aria-hidden="true">{[18,42,65,38,85,100,56,80,40,68,30,48,20].map((height,i)=><i key={i} style={{height:`${height}%`}}/>)}</div><h3>SolMusic<span>Som. Descoberta. Conexão.</span></h3><p>Uma experiência em construção para descoberta, conexão e criação no universo da música.</p><small>VISÃO DO PRODUTO · TELAS EM PREPARAÇÃO</small></article><article className="lab-stay"><div className="lab-topline"><span>HOSPITALIDADE / PRODUTO DIGITAL</span><b>EM DESENVOLVIMENTO</b></div><div className="stay-art" aria-hidden="true"><span>12</span><i/></div><h3>STAY12<span>Chegar. Ficar. Voltar.</span></h3><p>Tecnologia para tornar a jornada de hospedagem mais direta, inteligente e memorável.</p><small>VISÃO DO PRODUTO · TELAS EM PREPARAÇÃO</small></article></div></div></section>

    <ProcessExperience/>
    <section className="snake-feature section-pad" id="snake"><div className="shell snake-feature-grid"><div><p className="section-kicker">06 / SNAKE // VENOM AI</p><div className="snake-online"><i/> VENOM AI // ONLINE</div><h2>Me conta o que<br/>você quer <em>construir.</em></h2><p>SNAKE não é um chatbot genérico. Ele foi desenvolvido para transformar problemas de negócio em soluções digitais.</p><SnakeAI label="Começar meu briefing"/></div><div className="snake-console"><div className="snake-console-head"><Bot size={22}/><span>SNAKE / DEMONSTRAÇÃO LOCAL</span></div><div className="snake-chat" aria-label="Demonstração de conversa com a SNAKE"><p className="snake-message user">Quero vender online, mas ainda não sei qual plataforma usar.</p><p className="snake-message ai"><b>SNAKE</b> Primeiro vamos entender catálogo, operação e entrega. Depois escolhemos a tecnologia.</p></div><ol><li><span>01</span>Conte o objetivo do seu negócio.</li><li><span>02</span>Escolha o caminho que quer explorar.</li><li><span>03</span>Revise o contexto e envie ao time.</li></ol><p className="snake-state">MODO DEMONSTRATIVO LOCAL · SEM CONSUMO DE API</p></div></div></section>

    <section className="contact section-pad" id="contato"><div className="shell contact-grid"><div><p className="section-kicker">07 / PRÓXIMO MOVIMENTO</p><h2>Tem um problema real?<br/><em>Vamos atacar.</em></h2><p>Conte o momento do seu negócio. A gente responde com clareza sobre o melhor caminho — mesmo que ele não comece por código.</p><div className="contact-note"><Zap size={18}/><span>Resposta humana. Conversa direta. Sem apresentação genérica.</span></div></div><ContactForm/></div></section>
    <footer><div className="shell footer-main"><a className="wordmark" href="#top"><span>VENOM</span><b>CODE</b></a><p>Ideias. Código. Resultado.</p><div><a href="#servicos">Serviços</a><a href="#cases">Cases</a><a href="#contato">Contato</a></div></div><div className="shell footer-bottom"><span>© 2026 VENOM CODE</span><span>BUILD · EXECUTE · EVOLVE</span></div></footer>
    <SnakeAI label="Falar com SNAKE" floating />
  </main>;
}
