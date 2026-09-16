import { ArrowRight, Bot, Braces, Check, Gauge, Globe2, Layers3, Palette, ShoppingCart, Sparkles, TrendingUp, Zap } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { HeroVideo } from "@/components/hero-video";
import { MobileMenu } from "@/components/mobile-menu";

const services = [
  { icon: Globe2, number: "01", title: "Sites que posicionam", text: "Landing pages e sites institucionais com narrativa, velocidade e presença para converter atenção em oportunidade." },
  { icon: ShoppingCart, number: "02", title: "E-commerce que vende", text: "Lojas pensadas para reduzir atrito, fortalecer percepção de valor e transformar navegação em compra." },
  { icon: Braces, number: "03", title: "Sistemas sob medida", text: "Produtos digitais, portais e ferramentas internas desenhados em torno da sua operação — não o contrário." },
  { icon: Bot, number: "04", title: "Automação e IA", text: "Fluxos inteligentes que eliminam tarefas repetitivas, conectam dados e devolvem tempo para o seu time." },
  { icon: Palette, number: "05", title: "Branding e identidade", text: "Marcas com estratégia, linguagem e direção visual para ocupar um espaço próprio — e ser lembradas por isso." },
  { icon: TrendingUp, number: "06", title: "Performance e crescimento", text: "Experimentos, dados e evolução contínua para transformar presença digital em resultado mensurável." },
];

const capabilities = [
  { icon: Globe2, title: "Websites", text: "Presença que converte" },
  { icon: ShoppingCart, title: "E-commerce", text: "Vendas sem limites" },
  { icon: Braces, title: "Sistemas", text: "Operação sob controle" },
  { icon: Bot, title: "IA & Automação", text: "Eficiência que escala" },
  { icon: Palette, title: "Branding", text: "Identidade que conecta" },
  { icon: Gauge, title: "Performance", text: "Resultado mensurável" },
];

const routes = [
  { icon: Globe2, tag: "PRESENÇA", title: "Site institucional", text: "Sua marca no próximo nível, com narrativa, impacto e velocidade.", cta: "Construir site" },
  { icon: ShoppingCart, tag: "VENDAS", title: "E-commerce", text: "Uma experiência de compra direta, confiável e pronta para crescer.", cta: "Criar minha loja" },
  { icon: Braces, tag: "OPERAÇÃO", title: "Sistema web", text: "Processos sob controle em uma ferramenta desenhada para o seu negócio.", cta: "Desenhar sistema" },
  { icon: Bot, tag: "ESCALA", title: "IA & automações", text: "Menos repetição, mais inteligência e tempo devolvido para o seu time.", cta: "Automatizar operação" },
  { icon: Palette, tag: "IDENTIDADE", title: "Branding digital", text: "Estratégia e expressão visual para uma marca impossível de confundir.", cta: "Fortalecer marca" },
  { icon: TrendingUp, tag: "CRESCIMENTO", title: "Performance", text: "Dados, evolução e decisões melhores para gerar resultado real.", cta: "Acelerar resultado" },
];

const process = [
  ["01", "Diagnóstico", "Entendemos o negócio, o problema e a oportunidade antes de falar em tela ou código."],
  ["02", "Estratégia", "Definimos direção, escopo e prioridades para construir o que realmente precisa existir."],
  ["03", "Execução", "Design e tecnologia avançam juntos, com entregas visíveis e decisões objetivas."],
  ["04", "Evolução", "Colocamos no ar, medimos e criamos a base para o produto continuar crescendo."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="VENOM CODE — início"><span>VENOM</span><b>CODE</b></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a><a href="#cases">Cases</a><a href="#processo">Processo</a>
        </nav>
        <a className="header-cta" href="#contato">Iniciar projeto <ArrowRight size={15} /></a>
        <MobileMenu />
      </header>

      <section className="hero" id="top">
        <HeroVideo />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <p className="eyebrow"><span /> Estratégia · Design · Tecnologia</p>
          <h1>Mais que código.<br /><em>Resultado.</em></h1>
          <p className="hero-copy">Construímos experiências digitais com presença, inteligência e precisão — para marcas que não vieram passar despercebidas.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contato">Quero construir algo grande <ArrowRight size={18} /></a>
            <a className="button ghost" href="#cases">Ver projetos</a>
          </div>
        </div>
        <div className="hero-index"><span>SCROLL</span><i /></div>
      </section>

      <section className="capability-rail" aria-label="Capacidades da VENOM CODE">
        <div className="shell capability-grid">
          {capabilities.map(({ icon: Icon, title, text }) => <div className="capability-item" key={title}><Icon size={22} /><div><strong>{title}</strong><span>{text}</span></div></div>)}
        </div>
      </section>

      <section className="manifesto shell section-pad">
        <p className="section-kicker">VENOM CODE / 001</p>
        <div className="manifesto-grid">
          <h2>Sua marca não precisa só existir.<br /><span>Precisa avançar.</span></h2>
          <div><p>Somos um estúdio de tecnologia para negócios que precisam transformar visão em produto, operação e crescimento.</p><p>Sem pacote genérico. Sem tecnologia pela tecnologia. Cada escolha precisa cumprir uma função.</p></div>
        </div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="shell">
          <div className="section-head"><div><p className="section-kicker">CAPACIDADES</p><h2>O que construímos</h2></div><p>Da primeira impressão à operação inteira: tecnologia que trabalha a favor do negócio.</p></div>
          <div className="service-grid">
            {services.map(({ icon: Icon, ...service }) => <article className="service-card" key={service.number}><div className="service-top"><span>{service.number}</span><Icon size={26} /></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contato" aria-label={`Falar sobre ${service.title}`}>Explorar <ArrowRight size={16} /></a></article>)}
          </div>
        </div>
      </section>

      <section className="routing shell section-pad">
        <p className="section-kicker">SOLUÇÕES PARA GRANDES IDEIAS</p><h2>O que você precisa<br />construir?</h2>
        <div className="route-grid">{routes.map(({ icon: Icon, ...route }) => <a href="#contato" className="route-card" key={route.title}><div className="route-icon"><Icon size={30} /></div><span>{route.tag}</span><h3>{route.title}</h3><p>{route.text}</p><b>{route.cta} <ArrowRight size={17} /></b></a>)}</div>
      </section>

      <section className="case-feature section-pad" id="cases">
        <div className="shell case-grid">
          <div className="case-art"><div className="case-mark"><span>VENOM</span><b>CODE</b></div><div className="case-orbit orbit-one" /><div className="case-orbit orbit-two" /><div className="case-glow" /></div>
          <div className="case-copy"><p className="section-kicker">CASE 001 / PRÓPRIA PELE</p><h2>Construir a marca que prova o método.</h2><p>A VENOM CODE nasce como nosso primeiro case: posicionamento, identidade, experiência e stack integrados em uma única presença digital.</p><ul><li><Check size={15} /> Estratégia e narrativa de marca</li><li><Check size={15} /> Direção visual cinematográfica</li><li><Check size={15} /> Engenharia orientada a performance</li></ul><span className="case-status"><i /> EM EVOLUÇÃO CONTÍNUA</span></div>
        </div>
      </section>

      <section className="labs shell section-pad">
        <div className="section-head"><div><p className="section-kicker">VENOM LABS</p><h2>Em desenvolvimento</h2></div><p>Produtos próprios onde testamos novas ideias antes de levá-las para o mercado.</p></div>
        <div className="lab-grid"><article><div className="lab-icon sol"><Sparkles /></div><span>PRODUTO / MÚSICA</span><h3>SolMusic</h3><p>Uma nova experiência para descoberta, conexão e criação no universo da música.</p><b>EM DESENVOLVIMENTO</b></article><article><div className="lab-icon stay"><Layers3 /></div><span>PRODUTO / HOSPITALIDADE</span><h3>STAY12</h3><p>Tecnologia para tornar a jornada de hospedagem mais direta, inteligente e memorável.</p><b>EM DESENVOLVIMENTO</b></article></div>
      </section>

      <section className="process section-pad" id="processo"><div className="shell"><p className="section-kicker">COMO OPERAMOS</p><h2>Clareza antes da velocidade.<br />Velocidade depois da clareza.</h2><div className="process-list">{process.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

      <section className="contact section-pad" id="contato"><div className="shell contact-grid"><div><p className="section-kicker">PRÓXIMO MOVIMENTO</p><h2>Tem um problema real?<br /><em>Vamos atacar.</em></h2><p>Conte o momento do seu negócio. A gente responde com clareza sobre o melhor caminho — mesmo que ele não comece por código.</p><div className="contact-note"><Zap size={18} /><span>Resposta humana. Conversa direta. Sem apresentação genérica.</span></div></div><ContactForm /></div></section>

      <footer><div className="shell footer-main"><a className="wordmark" href="#top"><span>VENOM</span><b>CODE</b></a><p>Ideias. Código. Resultado.</p><div><a href="#servicos">Serviços</a><a href="#cases">Cases</a><a href="#contato">Contato</a></div></div><div className="shell footer-bottom"><span>© 2026 VENOM CODE</span><span>BUILD · EXECUTE · EVOLVE</span></div></footer>
    </main>
  );
}
