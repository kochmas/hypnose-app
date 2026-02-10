import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/server/db";
import { ALL_CONSENT_TYPES, summarizeConsentState } from "@/server/legal/consent";

export const runtime = "nodejs";

const querySchema = z.object({
  subjectKey: z.string().uuid(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedQuery = querySchema.safeParse({
    subjectKey: searchParams.get("subjectKey"),
  });

  if (!parsedQuery.success) {
    return NextResponse.json({ error: "invalid_query" }, { status: 400 });
  }

  const { subjectKey } = parsedQuery.data;

  const records = await prisma.consentRecord.findMany({
    where: {
      subjectKey,
      consentType: { in: [...ALL_CONSENT_TYPES] },
    },
    select: {
      consentType: true,
      documentVersion: true,
      revokedAt: true,
    },
  });

  const summary = summarizeConsentState(records);

  return NextResponse.json({
    subjectKey,
    ...summary,
  });
}
