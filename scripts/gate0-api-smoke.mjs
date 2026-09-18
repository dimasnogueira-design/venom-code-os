const baseUrl = process.env.GATE0_BASE_URL || "http://localhost:3000";

const cases = [
  ["leads rejects GET", "/api/leads", {}, 405],
  ["leads rejects external origin", "/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://external.invalid" },
    body: JSON.stringify({ name: "Test" }),
  }, 403],
  ["leads requires JSON", "/api/leads", {
    method: "POST",
    headers: { "content-type": "text/plain", origin: baseUrl },
    body: "invalid",
  }, 415],
  ["leads rejects invalid JSON", "/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: "{",
  }, 400],
  ["SNAKE rejects GET", "/api/venom-ai", {}, 405],
  ["SNAKE rejects external origin", "/api/venom-ai", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://external.invalid" },
    body: JSON.stringify({ message: "Test" }),
  }, 403],
  ["SNAKE requires JSON", "/api/venom-ai", {
    method: "POST",
    headers: { "content-type": "text/plain", origin: baseUrl },
    body: "invalid",
  }, 415],
  ["SNAKE rejects invalid JSON", "/api/venom-ai", {
    method: "POST",
    headers: { "content-type": "application/json", origin: baseUrl },
    body: "{",
  }, 400],
];

let failures = 0;
for (const [name, path, options, expected] of cases) {
  const response = await fetch(baseUrl + path, options);
  const passed = response.status === expected;
  console.log(passed ? "PASS" : "FAIL", name, "expected=" + expected, "actual=" + response.status);
  if (!passed) failures += 1;
}

if (failures) process.exitCode = 1;
