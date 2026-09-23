const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const targets = await fetch("http://localhost:9222/json").then(response => response.json());
const target = targets.find(item => item.type === "page");
if (!target) throw new Error("Chrome target not found");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
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
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return result.result.value;
}
async function load(width, height, path = "/") {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
  await send("Page.navigate", { url: `http://localhost:3000${path}` });
  await sleep(900);
}

const result = {};
await load(390, 844, "/#top");
result.initial = await evaluate(`({phase:document.querySelector('.hero-experience')?.dataset.phase,overflow:document.documentElement.scrollWidth>innerWidth})`);
await evaluate(`document.querySelector('.intro-enter')?.click();document.querySelector('.mobile-menu-trigger')?.click()`);
await sleep(150);
result.menu = await evaluate(`({open:document.querySelector('.mobile-menu-surface')?.open,bodyLocked:getComputedStyle(document.body).overflow==='hidden',focusInside:!!document.activeElement?.closest('.mobile-menu-surface')})`);
await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape" });
await sleep(100);
result.menuClosed = await evaluate(`({open:document.querySelector('.mobile-menu-surface')?.open,triggerFocused:document.activeElement?.classList.contains('mobile-menu-trigger')})`);
await evaluate(`document.querySelector('.experience-card')?.click()`);
await sleep(120);
result.serviceDialog = await evaluate(`(()=>{const d=document.querySelector('.service-dialog');const r=d?.getBoundingClientRect();return {open:d?.open,width:Math.round(r?.width||0),fits:(r?.right||0)<=innerWidth&&((r?.left||0)>=0),scrollbar:getComputedStyle(d).scrollbarColor}})()`);
await evaluate(`document.querySelector('.service-dialog-close')?.click();document.querySelector('.snake-float')?.click()`);
await sleep(120);
result.snake = await evaluate(`(()=>{const d=document.querySelector('.snake-chat-dialog[open]');const r=d?.getBoundingClientRect();return {open:!!d?.open,fits:(r?.right||0)<=innerWidth&&((r?.left||0)>=0),audio:!!d?.querySelector('[aria-label="Gravar áudio"]'),composer:!!d?.querySelector('textarea')}})()`);
await evaluate(`document.querySelector('.snake-close')?.click();document.querySelector('#contato')?.scrollIntoView()`);
await sleep(100);
result.form = await evaluate(`(()=>{const f=document.querySelector('.contact-form');return {fields:f?.querySelectorAll('input,select,textarea').length,submit:!!f?.querySelector('button[type="submit"]'),invalid:!f?.checkValidity(),overflow:document.documentElement.scrollWidth>innerWidth}})()`);
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await load(1440, 1000, "/");
result.reducedMotion = await evaluate(`({phase:document.querySelector('.hero-experience')?.dataset.phase,animation:getComputedStyle(document.querySelector('.experience-card')).animationName})`);
console.log(JSON.stringify(result, null, 2));
socket.close();
