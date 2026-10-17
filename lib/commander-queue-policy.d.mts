export type StagingMissionAssessment =
  | { ok: true; mission: string }
  | { ok: false; reason: string };

export function assessStagingMission(input: unknown): StagingMissionAssessment;
