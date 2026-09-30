import assert from "node:assert/strict";
import { selectSnakeProfile } from "../lib/venom-ai/protocol.ts";

assert.equal(selectSnakeProfile({ message: "Quero um site", userMessageCount: 1, hasBriefing: false }), "snake");
assert.equal(selectSnakeProfile({ message: "Quero um marketplace com pagamentos", userMessageCount: 2, hasBriefing: false }), "snake");
assert.equal(selectSnakeProfile({ message: "Quero um marketplace com pagamentos", userMessageCount: 3, hasBriefing: false }), "architect");
assert.equal(selectSnakeProfile({ message: "Monte o briefing do projeto", userMessageCount: 2, hasBriefing: false }), "snake");
assert.equal(selectSnakeProfile({ message: "Monte o briefing do projeto", userMessageCount: 3, hasBriefing: false }), "briefing");
assert.equal(selectSnakeProfile({ message: "Gere o briefing novamente", userMessageCount: 6, hasBriefing: true }), "snake");

console.log("PASS Snake profile activation and cost limits");
