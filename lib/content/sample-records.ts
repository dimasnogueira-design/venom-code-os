import type { CaseRecord, ServiceRecord } from "./models";

export const websiteService = {
  type: "service",
  id: "service-websites",
  slug: "websites",
  title: "Websites",
  description: "Presença que converte",
  status: "live",
  provenance: "current",
  relatedServices: ["branding", "performance"],
  media: [{ src: "/images/service-websites.webp", alt: "Interface de website em notebook e telefone", kind: "image", width: 1536, height: 1024 }],
  cta: { label: "Explorar Websites", destination: "#servicos" },
} satisfies ServiceRecord;

export const venomCodeCase = {
  type: "case",
  id: "case-venom-code",
  slug: "venom-code",
  title: "VENOM CODE",
  client: "VENOM CODE",
  year: "2026",
  description: "A identidade, a experiência e a tecnologia se encontram neste site. Um projeto real, publicado e em evolução.",
  status: "live",
  provenance: "current",
  relatedServices: ["websites", "branding", "ai-automation"],
  media: [{
    src: "/images/we-do-for-us-first.webp",
    alt: "Estúdio VENOM CODE em operação com ambiente de desenvolvimento e direção visual da marca",
    kind: "image",
    width: 1600,
    height: 901,
  }],
  cta: { label: "Ver projeto", destination: "#cases" },
} satisfies CaseRecord;
