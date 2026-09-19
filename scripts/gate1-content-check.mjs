import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../lib/content/records.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
const { services, venomCodeCase } = await import(moduleUrl);

const failures = [];
const serviceSlugs = new Set(services.map(service => service.slug));
const ids = [...services, venomCodeCase].map(record => record.id);
const slugs = [...services, venomCodeCase].map(record => record.slug);

if (services.length !== 6) failures.push(`expected 6 services, received ${services.length}`);
if (new Set(ids).size !== ids.length) failures.push("content IDs must be unique");
if (new Set(slugs).size !== slugs.length) failures.push("content slugs must be unique");

for (const record of [...services, venomCodeCase]) {
  if (!record.id || !record.slug || !record.title || !record.description) failures.push(`${record.id || "unknown"}: missing identity or copy`);
  if (!record.status || !record.provenance) failures.push(`${record.id}: missing status or provenance`);
  if (!record.media.length || record.media.some(media => !media.src || !media.alt)) failures.push(`${record.id}: media requires src and alt`);
  if (!record.cta?.destination) failures.push(`${record.id}: CTA destination is required`);
  for (const related of record.relatedServices) {
    if (!serviceSlugs.has(related)) failures.push(`${record.id}: unknown related service ${related}`);
  }
}

if (failures.length) {
  failures.forEach(failure => console.error("FAIL", failure));
  process.exitCode = 1;
} else {
  console.log("PASS 6 typed services and VENOM CODE case content integrity");
}
