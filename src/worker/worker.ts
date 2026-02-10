import { run, runMigrations } from "graphile-worker";
import { z } from "zod";

import { prisma } from "../server/db";
import { getEnv } from "../server/env";

const sleepJobDataSchema = z.object({
  jobId: z.string().uuid(),
  seconds: z.number().int().min(0).max(60),
});

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const env = getEnv();
  await runMigrations({
    connectionString: env.DATABASE_URL,
  });

  const runner = await run({
    connectionString: env.DATABASE_URL,
    taskList: {
      sleep: async (payload) => {
        const { jobId, seconds } = sleepJobDataSchema.parse(payload);

        const claimed = await prisma.job.updateMany({
          where: { id: jobId, status: "queued" },
          data: { status: "running", startedAt: new Date() },
        });

        if (claimed.count === 0) return;

        try {
          await sleep(Math.max(0, seconds) * 1000);
          await prisma.job.update({
            where: { id: jobId },
            data: {
              status: "succeeded",
              finishedAt: new Date(),
              lastError: null,
            },
          });
        } catch (error) {
          await prisma.job.update({
            where: { id: jobId },
            data: {
              status: "failed",
              finishedAt: new Date(),
              lastError: error instanceof Error ? error.message : String(error),
            },
          });

          throw error;
        }
      },
    },
  });

  async function shutdown(signal: string) {
    console.log(`[worker] received ${signal}, shutting down...`);
    await runner.stop();
    await prisma.$disconnect();
    process.exit(0);
  }

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));

  console.log("[worker] started");
}

main().catch((error) => {
  console.error("[worker] fatal", error);
  process.exit(1);
});
