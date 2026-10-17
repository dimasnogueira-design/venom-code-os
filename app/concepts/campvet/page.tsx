import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Clock3, MapPin, Phone, ShieldPlus, Stethoscope } from "lucide-react";
import styles from "./campvet.module.css";

const clinicUrl = "https://campvet.com.br/";
const phone = "+5519992958871";

export const metadata: Metadata = {
  title: "CampVet — estudo conceitual privado",
  description: "Proposta conceitual privada de experiência digital para a CampVet, Campinas.",
  robots: { index: false, follow: false },
};

function PetIllustration() {
  return (
    <svg className={styles.petArt} viewBox="0 0 440 390" role="img" aria-label="Ilustração conceitual de um cão em um ambiente de cuidado veterinário">
      <ellipse cx="227" cy="340" rx="150" ry="20" fill="#b9c9b2" opacity=".45" />
      <path d="M139 179c-37 21-52 65-39 107 13 41 50 61 105 62h80c47-2 77-30 78-72 1-47-32-79-80-93l-50-14-94 10Z" fill="#fffaf0" />
      <path d="M132 186c-27 8-47 30-52 61-3 19 2 37 15 48 20-4 42-18 56-38l-19-71Z" fill="#d18a5d" />
      <path d="M281 183c22 4 43 22 50 49 5 18 2 35-9 47-21-1-45-13-61-33l20-63Z" fill="#d18a5d" />
      <path d="M151 173c1-55 37-95 88-95 52 0 88 39 89 95 1 54-39 84-89 84s-89-31-88-84Z" fill="#f0c8a5" />
      <path d="M169 115c-15-39-4-64 13-64 21 0 34 29 30 62l-43 2Z" fill="#b96f4d" />
      <path d="M296 113c12-38 2-63-15-62-21 1-33 30-27 62l42 0Z" fill="#b96f4d" />
      <ellipse cx="202" cy="166" rx="7" ry="9" fill="#263a32" />
      <ellipse cx="278" cy="166" rx="7" ry="9" fill="#263a32" />
      <path d="M225 185c8-11 21-11 29 0-1 12-6 19-14 19s-14-7-15-19Z" fill="#263a32" />
      <path d="M239 204c-3 14-16 20-28 12m28-12c3 14 16 20 28 12" fill="none" stroke="#263a32" strokeWidth="4" strokeLinecap="round" />
      <path d="M212 264c14 12 39 12 54 0" fill="none" stroke="#d18a5d" strokeWidth="7" strokeLinecap="round" />
      <path d="M236 260v54" stroke="#6c8d77" strokeWidth="7" />
      <path d="M237 277c-22 0-32-10-32-20 17-1 30 4 32 20Zm0 19c20-1 31-11 31-21-18 0-29 7-31 21Z" fill="#86a58a" />
      <path d="M163 310c-20 8-31 19-34 32m155-33c20 7 31 17 36 30" fill="none" stroke="#d18a5d" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

const services = [
  { number: "01", icon: ShieldPlus, title: "Urgência e internação", text: "Informação clara para chegar rápido e entender como funciona o plantão." },
  { number: "02", icon: Stethoscope, title: "Consultas e exames", text: "Um caminho simples para cuidados de rotina, diagnóstico e acompanhamento." },
  { number: "03", icon: Clock3, title: "Cirurgia e ortopedia", text: "Serviços especializados apresentados com contexto e orientação de contato." },
];

export default function CampVetConceptPage() {
  return (
    <main className={styles.page}>
      <div className={styles.conceptBar}><span>ESTUDO CONCEITUAL PRIVADO</span><span>VENOM CODE · 2026</span></div>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="CampVet, início"><span className={styles.brandMark}>✳</span>camp<span>vet</span></a>
        <nav className={styles.nav} aria-label="Navegação principal"><a href="#cuidado">Cuidado</a><a href="#servicos">Serviços</a><a href="#localizacao">Localização</a></nav>
        <a className={styles.headerPhone} href={`tel:${phone}`}><Phone size={16} aria-hidden="true"/><span>Plantão 24h</span></a>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.liveDot}/>ATENDIMENTO VETERINÁRIO · CAMPINAS</p>
          <h1>Quando eles<br/>precisam, <em>a gente<br/>está aqui.</em></h1>
          <p className={styles.lede}>Cuidado veterinário 24 horas, com orientação clara para você saber o que fazer e como chegar.</p>
          <div className={styles.actions}><a className={styles.primary} href={`tel:${phone}`}><Phone size={17} aria-hidden="true"/>Ligar para o plantão <ArrowUpRight size={16} aria-hidden="true"/></a><a className={styles.secondary} href="#servicos">Conheça os serviços <ArrowDownRight size={16} aria-hidden="true"/></a></div>
          <p className={styles.addressLine}><MapPin size={15} aria-hidden="true"/> R. José Paulino, 412 · Centro, Campinas</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.visualOrb}/><PetIllustration/>
          <div className={styles.visualCard}><span className={styles.cardIcon}><Clock3 size={18}/></span><span><b>Estamos por perto</b><small>Plantão veterinário 24 horas</small></span></div>
          <span className={styles.visualNote}>CUIDADO COM PRESENÇA</span>
        </div>
        <a href="#cuidado" className={styles.scrollHint}>DESCUBRA <ArrowDownRight size={15}/></a>
      </section>

      <section className={styles.care} id="cuidado">
        <div><p className={styles.sectionLabel}>CUIDADO, SEM COMPLICAÇÃO</p><h2>Informação acolhedora.<br/><em>Próximo passo claro.</em></h2></div>
        <p className={styles.careCopy}>Uma experiência pensada para o momento de quem procura ajuda: encontrar o atendimento, entender os serviços e falar com a equipe sem perder tempo.</p>
      </section>

      <section className={styles.services} id="servicos">
        <div className={styles.sectionHead}><div><p className={styles.sectionLabel}>COMO PODEMOS CUIDAR</p><h2>Uma equipe para cada<br/>fase da vida.</h2></div><p>Veja as principais frentes de atendimento da CampVet. Em caso de urgência, entre em contato com a clínica.</p></div>
        <div className={styles.serviceGrid}>{services.map(({ number, icon: Icon, title, text }) => <article key={number} className={styles.serviceCard}><div className={styles.serviceTop}><span>{number}</span><Icon size={21} strokeWidth={1.7} aria-hidden="true"/></div><h3>{title}</h3><p>{text}</p><a href={clinicUrl} target="_blank" rel="noreferrer">Ver informações oficiais <ArrowUpRight size={14}/></a></article>)}</div>
      </section>

      <section className={styles.location} id="localizacao">
        <div className={styles.locationIntro}><p className={styles.sectionLabel}>NO CENTRO DE CAMPINAS</p><h2>Chegar até nós<br/>é simples.</h2><p>Uma referência clara para encontrar a clínica quando você mais precisa.</p><a href="https://www.google.com/maps/search/?api=1&query=Rua+Jos%C3%A9+Paulino+412+Centro+Campinas+SP" target="_blank" rel="noreferrer" className={styles.mapLink}><MapPin size={17}/>Abrir rota no mapa <ArrowUpRight size={15}/></a></div>
        <div className={styles.mapCard}><div className={styles.mapGrid}/><div className={styles.mapPin}><span>✳</span></div><div className={styles.mapAddress}><MapPin size={16}/><span><b>CampVet</b><small>R. José Paulino, 412 · Centro</small><small>Campinas · SP · 13013-000</small></span></div></div>
      </section>

      <section className={styles.finalCta}><div className={styles.ctaIcon}>✳</div><p className={styles.sectionLabel}>CAMPVET · CAMPINAS</p><h2>Cuidado presente,<br/><em>dia e noite.</em></h2><p>Para confirmar atendimento ou tirar dúvidas, fale diretamente com a clínica.</p><a className={styles.primary} href={`tel:${phone}`}><Phone size={17}/>Ligar (19) 99295-8871 <ArrowUpRight size={16}/></a></section>
      <footer className={styles.footer}><a className={styles.brand} href="#top"><span className={styles.brandMark}>✳</span>camp<span>vet</span></a><span>Estudo conceitual privado · Não representa um site oficial da CampVet.</span><a href={clinicUrl} target="_blank" rel="noreferrer">Visitar site atual ↗</a></footer>
    </main>
  );
}
