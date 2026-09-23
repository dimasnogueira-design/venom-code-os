import Image from "next/image";

const supportingWork = [
  { src: "/images/portfolio/bikeid-catalogo.jpg", alt: "Publicação editorial Bike ID aplicada em catálogo", label: "BIKE ID", type: "Editorial · Catálogo" },
  { src: "/images/portfolio/bravvos-revista.jpg", alt: "Projeto editorial Bravvos aplicado em revista de produtos", label: "BRAVVOS", type: "Direção de arte · Produto" },
  { src: "/images/portfolio/getuba-identidade.jpg", alt: "Sistema completo de identidade visual Madeireira Getuba", label: "GETUBA", type: "Identidade · Aplicações" },
];

export function PortfolioProof() {
  return <section className="portfolio-proof section-pad" aria-labelledby="portfolio-title">
    <div className="shell">
      <div className="portfolio-heading">
        <div><p className="section-kicker">03B / TRABALHOS SELECIONADOS</p><h2 id="portfolio-title">Ideias que viram<br/><em>presença real.</em></h2></div>
        <p>Identidade, editorial e aplicações digitais apresentadas com o nível de acabamento que a marca precisa para vender.</p>
      </div>

      <article className="portfolio-lead">
        <div className="portfolio-lead-copy"><span>CASE VISUAL / FIBRAV</span><h3>Da comunicação técnica<br/>para uma presença digital clara.</h3><p>O material original orienta a linguagem. A aplicação web organiza produto, segmento e conversão em uma experiência responsiva.</p><div className="portfolio-tags"><i>IDENTIDADE PRESERVADA</i><i>CONCEITO DIGITAL</i><i>DESKTOP + MOBILE</i></div></div>
        <figure className="portfolio-web"><Image src="/images/portfolio/fibrav-web-concept.png" alt="Conceito de website responsivo para a Fibrav em notebook e smartphone" width={1680} height={945} sizes="(max-width: 900px) 100vw, 68vw" priority={false}/><figcaption>APLICAÇÃO WEB CONCEITUAL</figcaption></figure>
        <div className="portfolio-evolution" aria-label="Evolução visual do projeto Fibrav">
          <figure><Image src="/images/portfolio/fibrav-catalogo.jpg" alt="Material editorial original da Fibrav" width={1000} height={600}/><figcaption><b>01</b> MATERIAL ORIGINAL</figcaption></figure>
          <figure><Image src="/images/portfolio/fibrav-alimentos.jpg" alt="Catálogo técnico de equipamentos alimentícios Fibrav" width={1000} height={600}/><figcaption><b>02</b> SISTEMA DE PRODUTOS</figcaption></figure>
          <figure><Image src="/images/portfolio/fibrav-web-concept.png" alt="Aplicação digital conceitual da Fibrav" width={1680} height={945}/><figcaption><b>03</b> EXPERIÊNCIA DIGITAL</figcaption></figure>
        </div>
      </article>

      <div className="portfolio-supporting">
        {supportingWork.map(item => <article key={item.label}><figure><Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 33vw"/></figure><div><span>{item.type}</span><h3>{item.label}</h3><p>Projeto real · aplicação selecionada</p></div></article>)}
      </div>
    </div>
  </section>;
}
