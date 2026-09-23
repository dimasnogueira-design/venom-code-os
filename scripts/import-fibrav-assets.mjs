import { readdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const source = "C:/Users/imove/OneDrive/Área de Trabalho/Venom Code OS/01-capacidades/imagens";
const targets = [
  "fibrav-material-original.webp",
  "fibrav-product-system.webp",
  "fibrav-digital-experience.webp",
];
const files = (await readdir(source))
  .filter((file) => /\.png$/i.test(file))
  .sort((a, b) => a.localeCompare(b, "pt-BR"));

if (files.length !== targets.length) throw new Error(`Expected 3 Fibrav images, found ${files.length}`);

await Promise.all(files.map((file, index) => sharp(join(source, file))
  .webp({ quality: 88, effort: 6 })
  .toFile(join(process.cwd(), "public", "images", "portfolio", targets[index]))));

console.log(JSON.stringify(files.map((file, index) => ({ order: index + 1, source: file, target: targets[index] }))));
