import { mkdir, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import sharp from "sharp";

const source = "C:/Users/imove/OneDrive/Área de Trabalho/Venom Code OS/imagens site portfolio";
const mobileSource = join(source, "MOBILE");
const output = resolve(process.cwd(), "../../outputs/portfolio-audit");
const sortByName = (files) => files.filter((name) => /\.(png|jpe?g|webp)$/i.test(name)).sort((a, b) => a.localeCompare(b));
const desktop = sortByName(await readdir(source));
const mobile = sortByName(await readdir(mobileSource));

await mkdir(output, { recursive: true });

async function panel(path, index, isMobile) {
  const width = isMobile ? 144 : 300;
  const image = await sharp(path).resize({ width, height: 200, fit: "contain", background: "#101411" }).png().toBuffer();
  const label = Buffer.from(`<svg width="${width}" height="26"><rect width="100%" height="100%" fill="#101411"/><text x="10" y="17" fill="#b8ff19" font-family="Arial" font-size="12" font-weight="700">${String(index).padStart(2, "0")} / ${isMobile ? "MOBILE" : "DESKTOP"}</text></svg>`);
  return sharp({ create: { width, height: 226, channels: 4, background: "#101411" } }).composite([{ input: image, top: 0, left: 0 }, { input: label, top: 200, left: 0 }]).png().toBuffer();
}

const pairs = await Promise.all(Array.from({ length: Math.max(desktop.length, mobile.length) }, async (_, i) => ({
  desktop: desktop[i] ? await panel(join(source, desktop[i]), i + 1, false) : null,
  mobile: mobile[i] ? await panel(join(mobileSource, mobile[i]), i + 1, true) : null,
})));

const cellWidth = 464;
const cellHeight = 226;
const columns = 2;
const rows = Math.ceil(pairs.length / columns);
const composites = [];
for (let i = 0; i < pairs.length; i += 1) {
  const x = (i % columns) * cellWidth;
  const y = Math.floor(i / columns) * cellHeight;
  if (pairs[i].desktop) composites.push({ input: pairs[i].desktop, left: x, top: y });
  if (pairs[i].mobile) composites.push({ input: pairs[i].mobile, left: x + 310, top: y });
}
await sharp({ create: { width: cellWidth * columns, height: cellHeight * rows, channels: 4, background: "#101411" } })
  .composite(composites)
  .png()
  .toFile(join(output, "desktop-mobile-pairs.png"));

console.log(JSON.stringify({ desktop: desktop.length, mobile: mobile.length, output: join(output, "desktop-mobile-pairs.png") }));
