import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve(process.cwd(), "../../outputs/gate-2b");
await mkdir(outputDir, { recursive: true });
const sleep = ms => new Promise(resolveSleep => setTimeout(resolveSleep, ms));
const targets = await fetch("http://localhost:9222/json").then(response => response.json());
const target = targets.find(item => item.type === "page");
if (!target) throw new Error("Chrome target not found");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolveOpen, reject) => { socket.onopen = resolveOpen; socket.onerror = reject; });
let nextId = 0;
const pending = new Map();
socket.onmessage = event => {
  const message = JSON.parse(event.data);
  const job = pending.get(message.id);
  if (!job) return;
  pending.delete(message.id);
  if (message.error) job.reject(new Error(message.error.message)); else job.resolve(message.result);
};
function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolveSend, reject) => pending.set(id, { resolve: resolveSend, reject }));
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return result.result.value;
}
async function load(width, height) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await send("Page.navigate", { url: "http://localhost:3000/#servicos" });
  await sleep(1100);
  await evaluate("document.querySelector('.intro-enter')?.click(); document.querySelector('#servicos')?.scrollIntoView()");
  await sleep(300);
}
async function capture(name, selector, maxHeight) {
  const clip = await evaluate(`(() => { const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return {x:0,y:Math.max(0,scrollY+r.top),width:innerWidth,height:Math.min(${maxHeight},r.height)} })()`);
  const shot = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: true, clip: { ...clip, scale: 1 } });
  await writeFile(resolve(outputDir, name), Buffer.from(shot.data, "base64"));
}
async function inspect(width, height) {
  await load(width, height);
  return evaluate(`(() => {
    const cards=[...document.querySelectorAll('.experience-card')];
    const capabilities=[...document.querySelectorAll('.capability-item')];
    const rows=Object.values(cards.reduce((acc,card)=>{const r=card.getBoundingClientRect();const y=Math.round(r.top);(acc[y]??=[]).push(Math.round(r.width));return acc},{}));
    const sections=['.manifesto','.experience-services','.solution-routing','.editorial-break','.venom-case','.product-labs','.process-experience','.contact','.footer'];
    return {
      width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth,
      serviceRows:rows,serviceCount:cards.length,
      capabilityCount:capabilities.length,
      capabilityTargets:capabilities.map(a=>a.getAttribute('href')),
      touchTargets:[...document.querySelectorAll('button,a')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.height<40}).slice(0,10).map(el=>({text:(el.textContent||'').trim().slice(0,30),height:Math.round(el.getBoundingClientRect().height)})),
      outOfBounds:sections.filter(selector=>{const el=document.querySelector(selector);if(!el)return false;const r=el.getBoundingClientRect();return r.left<-.5||r.right>innerWidth+.5})
    };
  })()`);
}

const results = {};
results.desktop = await inspect(1440, 1000);
await capture("services-grid-1440.png", ".experience-services", 1000);
results.tablet = await inspect(768, 1024);
await capture("services-grid-768.png", ".experience-services", 1024);
results.mobile = await inspect(390, 844);
await evaluate("document.querySelector('.contact')?.scrollIntoView()");
await sleep(200);
await capture("one-page-mobile-390.png", ".contact", 844);
await evaluate("document.querySelector('.capability-item')?.focus()");
results.keyboard = await evaluate(`({tag:document.activeElement?.tagName,href:document.activeElement?.getAttribute('href'),outline:getComputedStyle(document.activeElement).outlineStyle})`);
console.log(JSON.stringify(results, null, 2));
socket.close();
