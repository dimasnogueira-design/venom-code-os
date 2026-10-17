export type EngineerResult = {
  jobId: string;
  sourceMessageId: string;
  missionDigest: string;
  agent: 'VENOM_AI_ENGINEER';
  mode: 'OFFLINE_PLAN';
  status: 'PLAN_ONLY_NOT_EXECUTED';
  workstreams: string[];
  acceptance: string[];
  restrictions: string[];
};

export function isValidEngineerResult(value: unknown): value is EngineerResult;
export function safeEqualToken(supplied: string, expected: string): boolean;
