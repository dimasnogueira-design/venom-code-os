"""Vercel Queue subscriber for the isolated, offline AI Engineer staging pilot."""
from __future__ import annotations

from dataclasses import asdict
from hashlib import sha256
import asyncio
import json
import os
import re
from typing import Any, Awaitable, Callable
from urllib.error import URLError
from urllib.request import Request, urlopen
from uuid import UUID

from vercel.queue import Message, send, subscribe

from .engineer import plan_offline

ENGINEERING_TOPIC = "venom-engineering-staging"
RESULTS_TOPIC = "venom-engineer-results-staging"
RESULT_RETENTION_SECONDS = 3600
MAX_MISSION_CHARACTERS = 4000

_PRIVATE_DATA_PATTERNS = (
    re.compile(r"\b(cpf|cnpj|credor|cobran[cç]a|d[ií]vida|negocia[cç][aã]o financeira|pagamento|banco|cart[aã]o de cr[eé]dito)\b", re.I),
    re.compile(r"\b(gmail|whatsapp|e-?mail|telefone|celular|endereço|endere[cç]o)\b", re.I),
    re.compile(r"\b\d{3}\.\d{3}\.\d{3}-\d{2}\b"),
    re.compile(r"\b\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}\b"),
    re.compile(r"\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b"),
)


def validate_staging_job(payload: Any) -> dict[str, str]:
    if not isinstance(payload, dict):
        raise ValueError("payload must be an object")
    if payload.get("environment") != "staging":
        raise ValueError("AI Engineer queue accepts staging jobs only")
    if payload.get("mode") != "offline":
        raise ValueError("staging worker accepts offline jobs only")

    job_id = payload.get("jobId")
    try:
        job_id = str(UUID(job_id)) if isinstance(job_id, str) else ""
    except (ValueError, AttributeError):
        job_id = ""
    if not job_id:
        raise ValueError("jobId must be a UUID")

    mission = payload.get("mission")
    if not isinstance(mission, str) or not mission.strip():
        raise ValueError("mission is required")
    mission = mission.strip()
    if len(mission) > MAX_MISSION_CHARACTERS:
        raise ValueError("mission exceeds the staging limit")
    if any(pattern.search(mission) for pattern in _PRIVATE_DATA_PATTERNS):
        raise ValueError("staging queue does not accept private or financial data")

    return {"jobId": job_id, "mission": mission}


def build_worker_result(job: dict[str, str], message_id: str) -> dict[str, Any]:
    plan = asdict(plan_offline(job["mission"]))
    return {
        "jobId": job["jobId"],
        "sourceMessageId": message_id,
        "missionDigest": sha256(job["mission"].encode("utf-8")).hexdigest(),
        "agent": plan["agent"],
        "mode": plan["mode"],
        "status": plan["status"],
        "workstreams": plan["workstreams"],
        "acceptance": plan["acceptance"],
        "restrictions": plan["restrictions"],
    }


async def process_staging_job(
    payload: Any,
    message_id: str,
    publisher: Callable[..., Awaitable[Any]] | None = None,
    result_callback: Callable[[dict[str, Any]], Awaitable[Any]] | None = None,
) -> dict[str, Any]:
    job = validate_staging_job(payload)
    result = build_worker_result(job, message_id)
    await (publisher or send)(
        RESULTS_TOPIC,
        result,
        retention=RESULT_RETENTION_SECONDS,
        idempotency_key=f"result:{job['jobId']}",
    )
    callback_url = os.environ.get("VENOM_ENGINEER_RESULT_WEBHOOK_URL", "").strip()
    callback_token = os.environ.get("VENOM_ENGINEER_RESULT_TOKEN", "").strip()
    if callback_url or callback_token or result_callback:
        if not result_callback and (not callback_url.startswith("https://") or not callback_token):
            raise RuntimeError("staging result callback requires HTTPS URL and configured token")
        await (result_callback or post_staging_result)(result)
    return result


async def post_staging_result(result: dict[str, Any]) -> None:
    """Deliver only the redacted plan metadata to the private staging API."""
    url = os.environ["VENOM_ENGINEER_RESULT_WEBHOOK_URL"].strip()
    token = os.environ["VENOM_ENGINEER_RESULT_TOKEN"].strip()

    def post() -> None:
        request = Request(
            url,
            data=json.dumps(result, separators=(",", ":")).encode("utf-8"),
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urlopen(request, timeout=8) as response:
                if response.status not in (200, 202):
                    raise RuntimeError(f"staging result callback returned HTTP {response.status}")
        except URLError as exc:
            raise RuntimeError("staging result callback unavailable") from exc

    await asyncio.to_thread(post)


@subscribe(topic=ENGINEERING_TOPIC, retry_after=60, max_attempts=3)
async def consume_ai_engineer_job(message: Message[dict[str, Any]]) -> None:
    result = await process_staging_job(message.payload, message.message_id)
    # Keep operational logs useful without storing the mission text.
    print(
        "AI_ENGINEER_STAGING_COMPLETED "
        f"job_id={result['jobId']} queue_message_id={message.message_id} "
        f"status={result['status']}"
    )
