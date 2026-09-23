export type WorkCase = {
  slug: string;
  title: string;
  category: string;
  description: string;
  alt: string;
  desktop: { src: string; width: number; height: number };
  mobile?: { src: string; width: number; height: number };
};

const base = "/images/work";
const desktop = (slug: string, width = 1536, height = 1024) => ({ src: `${base}/${slug}/desktop.webp`, width, height });
const mobile = (slug: string) => ({ src: `${base}/${slug}/mobile.webp`, width: 941, height: 1672 });

const records: Array<Omit<WorkCase, "desktop" | "mobile"> & { landscape?: boolean; hasMobile?: boolean }> = [
  { slug: "fibrav", title: "Fibrav", category: "Marca e presença digital", description: "Identidade, aplicações e presença digital para uma indústria de soluções em fibra de vidro.", alt: "Painel visual do projeto Fibrav com identidade, aplicações e telas digitais" },
  { slug: "ideccosolo", title: "ID Eccosolo Ambiental", category: "Identidade e presença digital", description: "Sistema visual e experiência digital para soluções ambientais.", alt: "Painel visual da ID Eccosolo Ambiental com identidade e website responsivo" },
  { slug: "bravvos", title: "Bravvos Bicycle Tires", category: "Marca e produto", description: "Direção visual para uma marca de pneus de bicicleta e sua presença de produto.", alt: "Painel visual da Bravvos Bicycle Tires com marca, produtos e website" },
  { slug: "bikeid", title: "bikeID", category: "Editorial e digital", description: "Uma presença editorial e digital para a comunidade de ciclismo.", alt: "Painel visual bikeID com publicações, marca e experiência digital" },
  { slug: "regina-noivas", title: "Regina Noivas", category: "Marca e varejo", description: "Identidade e comunicação para uma experiência de moda nupcial.", alt: "Painel visual Regina Noivas com marca, loja e aplicações" },
  { slug: "ecoforce", title: "Ecoforce", category: "Marca e produto", description: "Sistema de marca e aplicações para uma linha de soluções ecológicas.", alt: "Painel visual Ecoforce com identidade e aplicações de produto" },
  { slug: "madeira-getuba", title: "Madeira Getuba", category: "Identidade e presença", description: "Identidade de marca e comunicação para uma empresa do setor madeireiro.", alt: "Painel visual Madeira Getuba com identidade, sinalização e presença digital" },
  { slug: "contabilidade-ouro", title: "Contabilidade Ouro", category: "Marca corporativa", description: "Posicionamento e linguagem visual para serviços de contabilidade.", alt: "Painel visual Contabilidade Ouro com identidade e website" },
  { slug: "inovamix", title: "Inovamix", category: "Marca industrial", description: "Identidade e comunicação para soluções industriais.", alt: "Painel visual Inovamix com identidade e aplicações" },
  { slug: "gtec-bikes", title: "GTEC Bikes", category: "Marca e produto", description: "Universo visual para uma marca conectada ao ciclismo e à performance.", alt: "Painel visual GTEC Bikes com produtos, marca e presença digital" },
  { slug: "gallo", title: "Gallo", category: "Marca e editorial", description: "Identidade e aplicações editoriais para uma marca de produto.", alt: "Painel visual Gallo com identidade, embalagens e materiais" },
  { slug: "xp55", title: "XP55 Global Trade Solutions", category: "Marca e logística", description: "Sistema visual corporativo para soluções globais de comércio.", alt: "Painel visual XP55 com identidade e comunicação corporativa" },
  { slug: "bras-sulamericana", title: "Bras Sulamericana", category: "Marca B2B", description: "Identidade e presença digital para uma operação de negócios.", alt: "Painel visual Bras Sulamericana com identidade e website" , landscape: true},
  { slug: "liquid-vodka", title: "Liquid Vodka", category: "Marca e embalagem", description: "Direção de arte para uma marca de bebida e seus pontos de contato.", alt: "Painel visual Liquid Vodka com embalagem e aplicações" , landscape: true},
  { slug: "bua", title: "BUÁ Moda Infantil", category: "Marca e varejo", description: "Universo de marca e comunicação para moda infantil.", alt: "Painel visual BUÁ Moda Infantil com marca e aplicações" , landscape: true},
  { slug: "semana-institucional", title: "Semana Institucional", category: "Campanha institucional", description: "Campanha visual para uma semana institucional universitária.", alt: "Painel visual de campanha institucional com peças e presença digital" },
  { slug: "saramel", title: "Saramel Salgados & Assados", category: "Marca e gastronomia", description: "Identidade e comunicação para uma marca de alimentação.", alt: "Painel visual Saramel com identidade e aplicações de gastronomia" },
  { slug: "bistro-salsa-grill", title: "Bistrô Salsa Grill", category: "Marca e gastronomia", description: "Sistema de marca para uma experiência gastronômica.", alt: "Painel visual Bistrô Salsa Grill com identidade e aplicações" },
  { slug: "costa-prime", title: "Costa Prime", category: "Marca e serviços", description: "Identidade e presença para uma marca de serviços.", alt: "Painel visual Costa Prime com identidade e presença digital" },
  { slug: "cosmos", title: "Cosmos Mel do Brasil", category: "Marca e produto", description: "Identidade e comunicação para uma marca brasileira de mel.", alt: "Painel visual Cosmos Mel do Brasil com identidade e embalagens" },
  { slug: "disciplina-os", title: "Disciplina OS", category: "Produto digital", description: "Conceito de produto digital e sistema de interface.", alt: "Painel visual Disciplina OS com interface de produto digital" },
  { slug: "stay12", title: "STAY12", category: "Produto digital", description: "Conceito de experiência digital para hospitalidade.", alt: "Painel visual STAY12 com telas de produto digital" },
  { slug: "auryk", title: "Auryk", category: "E-commerce premium", description: "Direção visual para uma experiência de compra premium.", alt: "Painel visual Auryk com interface de e-commerce", hasMobile: false },
  { slug: "rebel-armor", title: "Rebel Armor", category: "E-commerce premium", description: "Identidade e experiência de produto para uma marca de alto impacto.", alt: "Painel visual Rebel Armor com interface de e-commerce", hasMobile: false },
];

export const workCases: WorkCase[] = records.map((record) => ({
  slug: record.slug, title: record.title, category: record.category, description: record.description, alt: record.alt,
  desktop: desktop(record.slug, record.landscape ? 1672 : 1536, record.landscape ? 941 : 1024),
  ...(record.hasMobile === false ? {} : { mobile: mobile(record.slug) }),
}));

export const getWorkCase = (slug: string) => workCases.find((item) => item.slug === slug);
