import Image from "next/image";
import Link from "next/link";
import { workCases } from "@/lib/content/work";

const supportingWork = workCases.filter(item => item.slug !== "fibrav");

export function PortfolioProof() {
  return <section className="portfolio-proof section-pad" id="portfolio" aria-labelledby="portfolio-title">
    <div className="shell">
      <div className="portfolio-heading">
        <div><p className="section-kicker">03B / TRABALHOS SELECIONADOS</p><h2 id="portfolio-title">Ideias que viram<br/><em>presença real.</em></h2></div>
        <p>Identidade, editorial e aplicações digitais apresentadas com o nível de acabamento que a marca precisa para vender.</p>
      </div>

      <article className="portfolio-lead">
        <div className="portfolio-lead-copy"><span>CASE VISUAL / FIBRAV</span><h3>Da comunicação técnica<br/>para uma presença digital clara.</h3><p>O material original orienta a linguagem. A aplicação web organiza produto, segmento e conversão em uma experiência responsiva.</p><div className="portfolio-tags"><i>IDENTIDADE PRESERVADA</i><i>CONCEITO DIGITAL</i><i>DESKTOP + MOBILE</i></div></div>
        <Link href="/work/fibrav" className="portfolio-web" aria-label="Abrir case completo da Fibrav"><Image src="/images/work/fibrav/desktop.webp" alt="Projeto completo da Fibrav com identidade, aplicações e experiência digital" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 68vw"/><span>VER CASE COMPLETO ↗</span></Link>
        <div className="portfolio-evolution" aria-label="Evolução visual do projeto Fibrav">
          <figure><Image src="/images/portfolio/fibrav-catalogo.jpg" alt="Material editorial original da Fibrav" width={1000} height={600}/><figcaption><b>01</b> MATERIAL ORIGINAL</figcaption></figure>
          <figure><Image src="/images/portfolio/fibrav-alimentos.jpg" alt="Catálogo técnico de equipamentos alimentícios Fibrav" width={1000} height={600}/><figcaption><b>02</b> SISTEMA DE PRODUTOS</figcaption></figure>
          <figure><Image src="/images/portfolio/fibrav-web-concept.png" alt="Aplicação digital conceitual da Fibrav" width={1680} height={945}/><figcaption><b>03</b> EXPERIÊNCIA DIGITAL</figcaption></figure>
        </div>
      </article>

      <div className="portfolio-supporting">
        {supportingWork.map(item => <Link href={`/work/${item.slug}`} key={item.slug}><article><figure><Image src={`/images/work/${item.slug}/thumb.webp`} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 33vw"/></figure><div><span>{item.category}</span><h3>{item.title}</h3><p>Explorar projeto ↗</p></div></article></Link>)}
        <a className="portfolio-callout" href="#contato"><article><div><span>SEU PROJETO / PRÓXIMO CASE</span><h3>Vamos criar algo que ocupe espaço.</h3><p>Iniciar projeto ↗</p></div></article></a>
      </div>
      <div className="portfolio-all"><p>24 projetos entre identidade, editorial, produto e presença digital.</p><Link href="/work">Explorar em tela cheia <span aria-hidden="true">↗</span></Link></div>
    </div>
  </section>;
}
