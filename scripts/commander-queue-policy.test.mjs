import assert from 'node:assert/strict';
import test from 'node:test';
import { assessStagingMission } from '../lib/commander-queue-policy.mjs';

test('allows a short technical staging mission', () => {
  assert.deepEqual(
    assessStagingMission('  AI_ENGINEER: validate the queue worker  '),
    { ok: true, mission: 'AI_ENGINEER: validate the queue worker' },
  );
});

test('rejects financial and personal data from the engineering staging queue', () => {
  for (const mission of [
    'AI_ENGINEER: inspect CPF 123.456.789-00',
    'AI_ENGINEER: triage cobrança de credor',
    'AI_ENGINEER: check joao@example.com',
    'AI_ENGINEER: inspect a WhatsApp message',
  ]) {
    assert.equal(assessStagingMission(mission).ok, false, mission);
  }
});

test('rejects empty and oversized staging missions', () => {
  assert.equal(assessStagingMission('  ').ok, false);
  assert.equal(assessStagingMission('x'.repeat(4001)).ok, false);
});
