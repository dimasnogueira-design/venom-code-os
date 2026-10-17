import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const baseUrl = process.env.COMMANDER_BASE_URL || 'http://127.0.0.1:3107';
const username = process.env.COMMANDER_TEST_USERNAME || 'venom-test';
const password = process.env.COMMANDER_TEST_PASSWORD || 'local-only-test-password';
const authorization = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
const startLocalServer = process.env.COMMANDER_START_LOCAL_SERVER === 'true';
const cwd = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let server;

try {
  if (startLocalServer) {
    server = spawn(process.execPath, [
      path.join(cwd, 'node_modules', 'next', 'dist', 'bin', 'next'),
      'dev', '--hostname', '127.0.0.1', '--port', '3107',
    ], {
      cwd,
      stdio: 'ignore',
      env: {
        ...process.env,
        VENOM_OS_USERNAME: username,
        VENOM_OS_PASSWORD: password,
        VERCEL_ENV: 'preview',
        COMMANDER_MODE: 'queue',
        VENOM_QUEUE_ENABLED: 'true',
      },
    });

    let ready = false;
    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (server.exitCode !== null) throw new Error(`Next.js exited with code ${server.exitCode}`);
      try {
        const probe = await fetch(new URL('/os', baseUrl), {
          headers: { authorization },
          signal: AbortSignal.timeout(1500),
          redirect: 'manual',
        });
        if (probe.status !== 503) {
          ready = true;
          break;
        }
      } catch {}
      await delay(500);
    }
    assert.ok(ready, 'local Next.js did not become ready');
  }

  const response = await fetch(new URL('/os', baseUrl), {
    headers: { authorization },
    signal: AbortSignal.timeout(5000),
    redirect: 'manual',
  });
  const html = await response.text();

  assert.equal(response.status, 200, `expected /os to return 200, got ${response.status}`);
  assert.match(html, /Centro de Comando/i, 'dashboard heading must be rendered');
  assert.match(html, /COMMANDER/i, 'Commander status must be visible');
  assert.match(html, /AI_ENGINEER/i, 'AI Engineer status must be visible');
  assert.match(html, /miss[aã]o/i, 'mission composer must be visible');

  const statusResponse = await fetch(new URL('/api/os/status', baseUrl), {
    headers: { authorization },
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(statusResponse.status, 200, 'protected system status must be available');
  const status = await statusResponse.json();
  assert.equal(status.environment, 'PREVIEW_STAGING');
  assert.equal(status.commander, 'QUEUE_CONFIGURED_UNVERIFIED');
  assert.equal(status.agents.find((agent) => agent.id === 'AI_ENGINEER')?.status, 'CONFIGURED_UNVERIFIED');

  console.log('Commander dashboard route smoke passed (HTTP 200; command center and staging agent states rendered).');
} finally {
  server?.kill();
}
