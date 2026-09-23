import { mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const source = "C:/Users/imove/OneDrive/Área de Trabalho/Venom Code OS/imagens site portfolio";
const mobileSource = join(source, "MOBILE");
const output = join(process.cwd(), "public", "images", "work");
const slugs = ["fibrav", "ideccosolo", "bravvos", "bikeid", "regina-noivas", "ecoforce", "madeira-getuba", "contabilidade-ouro", "inovamix", "gtec-bikes", "gallo", "xp55", "bras-sulamericana", "liquid-vodka", "bua", "semana-institucional", "saramel", "bistro-salsa-grill", "costa-prime", "cosmos", "disciplina-os", "stay12", "auryk", "rebel-armor"];
const isImage = (name) => /\.(png|jpe?g|webp)$/i.test(name);
const byName = (a, b) => a.localeCompare(b, "pt-BR");
const desktop = (await readdir(source)).filter(isImage).sort(byName);
const mobile = (await readdir(mobileSource)).filter(isImage).sort(byName);

if (desktop.length !== slugs.length || mobile.length !== 22) throw new Error(`Unexpected source inventory: ${desktop.length} desktop / ${mobile.length} mobile`);

for (const [index, slug] of slugs.entries()) {
  const folder = join(output, slug);
  await mkdir(folder, { recursive: true });
  const full = join(source, desktop[index]);
  await sharp(full).webp({ quality: 86, effort: 5 }).toFile(join(folder, "desktop.webp"));
  await sharp(full).resize({ width: 760, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(join(folder, "thumb.webp"));
  if (index < mobile.length) await sharp(join(mobileSource, mobile[index])).webp({ quality: 84, effort: 5 }).toFile(join(folder, "mobile.webp"));
}

console.log(JSON.stringify({ imported: slugs.length, mobilePairs: mobile.length, unmatchedDesktop: slugs.slice(mobile.length) }));
