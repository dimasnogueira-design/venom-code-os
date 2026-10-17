import assert from 'node:assert/strict';
import test from 'node:test';
import { isValidEngineerResult, safeEqualToken } from '../lib/commander-result-contract.mjs';

const validResult = {
  jobId: '550e8400-e29b-41d4-a716-446655440000',
  sourceMessageId: 'queue-message-123',
  missionDigest: 'a'.repeat(64),
  agent: 'VENOM_AI_ENGINEER',
  mode: 'OFFLINE_PLAN',
  status: 'PLAN_ONLY_NOT_EXECUTED',
  workstreams: ['Inspect current architecture'],
  acceptance: ['Evidence required'],
  restrictions: ['No external actions'],
};

test('accepts the minimal synthetic offline AI Engineer result', () => {
  assert.equal(isValidEngineerResult(validResult), true);
});

test('rejects result data that could carry raw missions or personal information', () => {
  assert.equal(isValidEngineerResult({ ...validResult, mission: 'private text' }), false);
  assert.equal(isValidEngineerResult({ ...validResult, status: 'LIVE_SENT' }), false);
  assert.equal(isValidEngineerResult({ ...validResult, missionDigest: 'bad' }), false);
});

test('compares webhook tokens without accepting missing or mismatched tokens', () => {
  assert.equal(safeEqualToken('stage-token', 'stage-token'), true);
  assert.equal(safeEqualToken('stage-token', 'wrong'), false);
  assert.equal(safeEqualToken('', 'stage-token'), false);
  assert.equal(safeEqualToken('stage-token', ''), false);
});
