"use client";

import { ArrowRight, Bot, Braces, Globe2, Palette, ShoppingCart, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { VenomClose } from "@/components/ui/venom-close";
import { services } from "@/lib/content/records";

const serviceIcons: Record<string, typeof Globe2> = { websites: Globe2, "ai-automation": Bot, ecommerce: ShoppingCart, systems: Braces, branding: Palette, performance: TrendingUp };
const serviceClassNames: Record<string, string> = { websites: "web", "ai-automation": "ai", ecommerce: "commerce", systems: "systems", branding: "brand", performance: "growth" };

const serviceOrder = ["websites","ecommerce","systems","ai-automation","branding","performance"];
const routes = [
  ["Quero vender online","ecommerce"],
  ["Preciso de presença profissional","websites"],
  ["Minha marca precisa evoluir","branding"],
  ["Quero automatizar minha operação","ai-automation"],
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
        <div className="experience-grid">{serviceOrder.map(id=>services.findIndex(service=>service.slug===id)).map(i=>{const item=services[i]; const Icon=serviceIcons[item.slug]; return <button id={`service-${item.slug}`} key={item.id} className={`experience-card experience-${serviceClassNames[item.slug]}`} onClick={()=>open(i)} aria-haspopup="dialog" aria-label={`Explorar ${item.title}`}>
          <span className="experience-card-art" aria-hidden="true"><Image src={item.media[0].src} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 58vw" /></span>
          <span className="experience-card-top"><span>{item.number} / {item.title}</span><Icon size={22} aria-hidden="true" /></span>
          <span className="service-visual" aria-hidden="true">{item.visual.map((word,n)=><span key={word}><i>{String(n+1).padStart(2,"0")}</i>{word}</span>)}</span>
          <h3>{item.line.split("\n").map((line,n)=><span key={line}>{n>0&&<br/>}{line}</span>)}</h3>
          <span className="experience-card-bottom">Explorar {item.title}<ArrowRight size={18} aria-hidden="true"/></span>
        </button>})}</div>
      </div>
    </section>
    <section className="solution-routing shell section-pad" aria-labelledby="solution-title"><div><p className="section-kicker">02 / O QUE VOCÊ PRECISA CONSTRUIR?</p><h2 id="solution-title">Comece pelo problema.<br /><em>A solução vem depois.</em></h2><p>Você não precisa saber qual tecnologia precisa. Conte o problema. A gente desenha a solução.</p></div><div className="solution-list">{routes.map(([label,id])=><button key={id} onClick={()=>open(services.findIndex(service=>service.slug===id))} aria-haspopup="dialog"><span>{label}</span><ArrowRight size={18}/></button>)}</div></section>
    <dialog ref={dialog} className="service-dialog" aria-labelledby="service-dialog-title" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}>
      <div className="service-dialog-body">
        <VenomClose className="service-dialog-close" onClick={()=>dialog.current?.close()} label="Fechar detalhes do serviço" />
        <div className="service-dialog-hero">
          <div><p className="section-kicker">VENOM CODE / {service.number}</p><h2 id="service-dialog-title">{service.title}</h2><p className="service-dialog-intro">{service.description}</p></div>
          <figure><Image src={service.media[0].src} alt="" fill sizes="(max-width: 700px) 100vw, 48vw" priority /><figcaption>VISUAL CONCEITUAL / {service.title.toUpperCase()}</figcaption></figure>
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
