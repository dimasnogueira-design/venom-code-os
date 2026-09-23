import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkCase, workCases } from "@/lib/content/work";
import "../work.css";

export function generateStaticParams() { return workCases.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const project = getWorkCase(params.slug); return project ? { title: `${project.title} | Work | VENOM CODE`, description: project.description, alternates: { canonical: `/work/${project.slug}` } } : {}; }

export default function WorkCasePage({ params }: { params: { slug: string } }) {
  const project = getWorkCase(params.slug); if (!project) notFound();
  const index = workCases.findIndex(({ slug }) => slug === project.slug);
  const next = workCases[(index + 1) % workCases.length];
  return <main className="work-page"><header className="work-header"><div className="work-header-inner"><Link href="/" className="work-wordmark" aria-label="VENOM CODE — início">VENOM<b>CODE</b></Link><Link href="/work" className="work-header-link">Todos os trabalhos</Link></div></header><article className="work-case work-shell"><header className="work-case-hero"><div><p className="work-kicker">WORK / {String(index + 1).padStart(2, "0")}</p><h1>{project.title}</h1><p>{project.description}</p></div><span className="work-case-index">{project.category.toUpperCase()}</span></header><picture className="work-case-visual">{project.mobile ? <source media="(max-width: 767px)" srcSet={project.mobile.src} width={project.mobile.width} height={project.mobile.height}/> : null}<img src={project.desktop.src} width={project.desktop.width} height={project.desktop.height} alt={project.alt} fetchPriority="high"/></picture><footer className="work-case-footer"><Link href="/work" className="work-back">← Voltar para trabalhos</Link><Link href={`/work/${next.slug}`} className="work-case-next">Próximo projeto <span aria-hidden="true">↗</span></Link></footer></article><footer className="work-footer"><div className="work-shell">© 2026 VENOM CODE · BUILD · EXECUTE · EVOLVE</div></footer></main>;
}
