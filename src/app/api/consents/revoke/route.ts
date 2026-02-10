import { ConsentType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/server/db";
import {
  ALL_CONSENT_TYPES,
  CURRENT_CONSENT_VERSIONS,
  summarizeConsentState,
} from "@/server/legal/consent";

export const runtime = "nodejs";

const requestSchema = z.object({
  subjectKey: z.string().uuid(),
  consentType: z.literal(ConsentType.AI_TRANSFER_ACKNOWLEDGEMENT),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsedBody = requestSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { subjectKey, consentType } = parsedBody.data;

  const revoked = await prisma.consentRecord.updateMany({
    where: {
      subjectKey,
      consentType,
      documentVersion: CURRENT_CONSENT_VERSIONS[consentType],
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });

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

  return NextResponse.json({
    subjectKey,
    revokedCount: revoked.count,
    ...summarizeConsentState(records),
  });
}
