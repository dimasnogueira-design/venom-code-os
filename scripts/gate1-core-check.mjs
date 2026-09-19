import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const [core, models, samples] = await Promise.all([
  readFile(new URL("app/venom-core.css", root), "utf8"),
  readFile(new URL("lib/content/models.ts", root), "utf8"),
  readFile(new URL("lib/content/sample-records.ts", root), "utf8"),
]);

const requiredTokens = [
  "--color-venom", "--color-ink", "--color-surface-1", "--space-1",
  "--font-sans", "--grid-max", "--radius-small", "--border-subtle",
  "--shadow-focus", "--z-dialog", "--motion-standard", "--ease-enter",
];
const requiredModelFields = [
  "id:", "slug:", "title:", "description:", "status:", "provenance:",
  "relatedServices:", "media:", "cta?:",
];

const failures = [
  ...requiredTokens.filter((token) => !core.includes(token)).map((token) => "missing token " + token),
  ...requiredModelFields.filter((field) => !models.includes(field)).map((field) => "missing model field " + field),
  ...["satisfies ServiceRecord", "satisfies CaseRecord"].filter((entry) => !samples.includes(entry)).map((entry) => "missing typed sample " + entry),
];

if (failures.length) {
  failures.forEach((failure) => console.error("FAIL", failure));
  process.exitCode = 1;
} else {
  console.log("PASS Venom Core tokens and typed content samples");
}
