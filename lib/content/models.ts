export type ContentStatus = "live" | "in-development" | "archive" | "planned";
export type ContentProvenance = "current" | "archive" | "restored" | "reinterpretation" | "concept";

export type ContentMedia = {
  src: string;
  alt: string;
  kind: "image" | "video";
  width?: number;
  height?: number;
};

export type ContentCTA = {
  label: string;
  destination?: string;
};

type ContentRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: ContentStatus;
  provenance: ContentProvenance;
  relatedServices: string[];
  media: ContentMedia[];
  cta?: ContentCTA;
};

export type ServiceRecord = ContentRecord & {
  type: "service";
  number: string;
  capabilityDescription: string;
  line: string;
  interest: string;
  intent: string;
  visual: string[];
  integrations: string[];
  offers: Array<readonly [title: string, description: string]>;
  example: string;
  scope: string;
};

export type CaseRecord = ContentRecord & {
  type: "case";
  client: string;
  year?: string;
};
