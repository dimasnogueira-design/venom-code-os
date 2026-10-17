import { timingSafeEqual } from 'node:crypto';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RESULT_KEYS = new Set([
  'jobId', 'sourceMessageId', 'missionDigest', 'agent', 'mode', 'status',
  'workstreams', 'acceptance', 'restrictions',
]);

function boundedStrings(value, maxItems = 12) {
  return Array.isArray(value)
    && value.length <= maxItems
    && value.every((item) => typeof item === 'string' && item.trim().length > 0 && item.length <= 500);
}

export function isValidEngineerResult(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  if (Object.keys(value).some((key) => !RESULT_KEYS.has(key))) return false;
  return UUID.test(value.jobId || '')
    && typeof value.sourceMessageId === 'string'
    && value.sourceMessageId.length > 0 && value.sourceMessageId.length <= 200
    && /^[a-f0-9]{64}$/i.test(value.missionDigest || '')
    && value.agent === 'VENOM_AI_ENGINEER'
    && value.mode === 'OFFLINE_PLAN'
    && value.status === 'PLAN_ONLY_NOT_EXECUTED'
    && boundedStrings(value.workstreams)
    && boundedStrings(value.acceptance)
    && boundedStrings(value.restrictions);
}

export function safeEqualToken(supplied, expected) {
  if (typeof supplied !== 'string' || typeof expected !== 'string' || !supplied || !expected) return false;
  const left = Buffer.from(supplied, 'utf8');
  const right = Buffer.from(expected, 'utf8');
  return left.length === right.length && timingSafeEqual(left, right);
}
