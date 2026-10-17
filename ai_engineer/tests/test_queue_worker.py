import asyncio
import unittest
from unittest.mock import patch
from uuid import uuid4

from vercel.queue.embedded import embedded_queue_service

from ai_engineer.queue_worker import (
    ENGINEERING_TOPIC,
    RESULTS_TOPIC,
    build_worker_result,
    process_staging_job,
    validate_staging_job,
)
from ai_engineer import queue_worker


class QueueWorkerTests(unittest.TestCase):
    def test_result_is_offline_and_does_not_persist_raw_mission(self):
        mission = "AI_ENGINEER: validate the staging queue pipeline"
        payload = {
            "jobId": str(uuid4()),
            "environment": "staging",
            "mode": "offline",
            "mission": mission,
        }

        job = validate_staging_job(payload)
        result = build_worker_result(job, "queue-message-123")

        self.assertEqual(result["agent"], "VENOM_AI_ENGINEER")
        self.assertEqual(result["status"], "PLAN_ONLY_NOT_EXECUTED")
        self.assertEqual(result["sourceMessageId"], "queue-message-123")
        self.assertNotIn(mission, str(result))
        self.assertEqual(len(result["missionDigest"]), 64)

    def test_staging_job_rejects_non_staging_environment(self):
        payload = {
            "jobId": str(uuid4()),
            "environment": "production",
            "mode": "offline",
            "mission": "AI_ENGINEER: inspect worker code",
        }

        with self.assertRaisesRegex(ValueError, "staging"):
            validate_staging_job(payload)

    def test_staging_job_rejects_private_or_financial_data(self):
        payload = {
            "jobId": str(uuid4()),
            "environment": "staging",
            "mode": "offline",
            "mission": "AI_ENGINEER: review CPF 123.456.789-00 for cobrança",
        }

        with self.assertRaisesRegex(ValueError, "private or financial"):
            validate_staging_job(payload)

    def test_processing_publishes_deduplicated_result(self):
        payload = {
            "jobId": str(uuid4()),
            "environment": "staging",
            "mode": "offline",
            "mission": "AI_ENGINEER: verify delivery and QA",
        }
        published = []

        async def publish(topic, result, **options):
            published.append((topic, result, options))

        asyncio.run(process_staging_job(payload, "queue-message-456", publish))

        self.assertEqual(len(published), 1)
        topic, result, options = published[0]
        self.assertEqual(topic, "venom-engineer-results-staging")
        self.assertEqual(options["idempotency_key"], f"result:{payload['jobId']}")
        self.assertEqual(options["retention"], 3600)
        self.assertEqual(result["status"], "PLAN_ONLY_NOT_EXECUTED")

    def test_processing_delivers_redacted_result_to_staging_callback(self):
        payload = {
            "jobId": str(uuid4()),
            "environment": "staging",
            "mode": "offline",
            "mission": "AI_ENGINEER: deliver a synthetic offline result",
        }
        published = []
        callbacks = []

        async def publish(topic, result, **options):
            published.append((topic, result, options))

        async def callback(result):
            callbacks.append(result)

        asyncio.run(process_staging_job(payload, "queue-message-789", publish, callback))

        self.assertEqual(len(callbacks), 1)
        self.assertEqual(callbacks[0]["jobId"], payload["jobId"])
        self.assertNotIn(payload["mission"], str(callbacks[0]))

    def test_embedded_queue_delivers_job_to_ai_engineer_and_persists_result(self):
        payload = {
            "jobId": str(uuid4()),
            "environment": "staging",
            "mode": "offline",
            "mission": "AI_ENGINEER: run offline queue integration QA",
        }

        async def send_and_receive_result():
            async with embedded_queue_service() as service:
                client = service.get_async_client()
                with patch.object(queue_worker, "send", client.send):
                    message_id = await client.send(
                        ENGINEERING_TOPIC,
                        payload,
                        retention=3600,
                        idempotency_key=f"test:{payload['jobId']}",
                    )
                    for _ in range(40):
                        async for delivery in client.poll(RESULTS_TOPIC, "test-results", limit=1):
                            async with delivery as message:
                                return message_id, message.payload
                        await asyncio.sleep(0.05)
                    self.fail("AI Engineer did not publish a result within 2 seconds")

        message_id, result = asyncio.run(send_and_receive_result())

        self.assertTrue(message_id)
        self.assertEqual(result["jobId"], payload["jobId"])
        self.assertEqual(result["status"], "PLAN_ONLY_NOT_EXECUTED")
        self.assertNotIn(payload["mission"], str(result))


if __name__ == "__main__":
    unittest.main()
