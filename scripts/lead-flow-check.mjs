import assert from "node:assert/strict";
import { leadEntryStage, resolveLeadMessage } from "../lib/leads/flow.ts";
import { formatLeadNotification } from "../lib/leads/notification.ts";

assert.equal(leadEntryStage(""), "challenge");
assert.equal(leadEntryStage(undefined), "challenge");
assert.equal(leadEntryStage("Quero vender mais pelo site"), "brief");
assert.equal(resolveLeadMessage("", "Site ou landing page"), "Site ou landing page");
assert.equal(resolveLeadMessage("Preciso captar orçamentos", "Site ou landing page"), "Preciso captar orçamentos");
const notification = formatLeadNotification({
  name: "Dimas",
  company: null,
  email: "",
  whatsapp: "12997752669",
  interest: "Site ou landing page",
  message: "Site ou landing page",
  session_id: null,
});
assert.match(notification, /Dimas/);
assert.match(notification, /12997752669/);
assert.match(notification, /Site ou landing page/);

console.log("PASS lead flow keeps interest-only submissions valid");
