import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { workCases } from "@/lib/content/work";
import "./work.css";

export const metadata: Metadata = { title: "Trabalhos | VENOM CODE", description: "Projetos de marca, presença digital e produtos criados pela VENOM CODE.", alternates: { canonical: "/work" } };

export default function WorkPage() {
  return <main className="work-page"><header className="work-header"><div className="work-header-inner"><Link href="/" className="work-wordmark" aria-label="VENOM CODE — início">VENOM<b>CODE</b></Link><Link href="/#contato" className="work-header-link">Iniciar projeto ↗</Link></div></header><div className="work-shell"><section className="work-intro"><div><p className="work-kicker">WORK / SELEÇÃO DE PROJETOS</p><h1>Imagem que<br/><em>move.</em></h1></div><p>Identidade, produto e presença digital reunidos em trabalhos selecionados. Explore cada projeto em detalhe.</p></section><section className="work-grid" aria-label="Projetos selecionados">{workCases.map((project) => <Link href={`/work/${project.slug}`} key={project.slug} className="work-card"><Image src={`/images/work/${project.slug}/thumb.webp`} alt={project.alt} width={760} height={507} sizes="(max-width: 700px) calc(100vw - 2rem), 50vw" loading="lazy"/><div className="work-card-copy"><small>{project.category}</small><h2>{project.title}</h2><p>{project.description}</p></div><span className="work-card-arrow" aria-hidden="true">↗</span></Link>)}</section></div><footer className="work-footer"><div className="work-shell">© 2026 VENOM CODE · BUILD · EXECUTE · EVOLVE</div></footer></main>;
}
