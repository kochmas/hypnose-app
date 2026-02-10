import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/server/db";

export const runtime = "nodejs";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

type RouteContext = {
  params: Promise<Record<string, string | string[] | undefined>>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const parsedParams = paramsSchema.safeParse(await params);
  if (!parsedParams.success) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }

  const { id } = parsedParams.data;

  const job = await prisma.job.findUnique({
    where: { id },
    select: {
      id: true,
      type: true,
      status: true,
      createdAt: true,
      startedAt: true,
      finishedAt: true,
      lastError: true,
    },
  });

  if (!job) return NextResponse.json({ error: "not_found" }, { status: 404 });

  return NextResponse.json(job);
}
