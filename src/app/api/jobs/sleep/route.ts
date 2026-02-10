import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/server/db";
import { getWorkerUtils } from "@/server/queue";

export const runtime = "nodejs";

const requestSchema = z.object({
  seconds: z.number().int().min(1).max(60).default(10),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsedBody = requestSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { seconds } = parsedBody.data;

  const job = await prisma.job.create({
    data: {
      type: "sleep",
      status: "queued",
      payload: { seconds },
    },
    select: { id: true },
  });

  const workerUtils = await getWorkerUtils();
  await workerUtils.addJob("sleep", { jobId: job.id, seconds });

  return NextResponse.json({ id: job.id });
}
