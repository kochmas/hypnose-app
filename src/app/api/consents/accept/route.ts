import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/server/db";
import {
  ALL_CONSENT_TYPES,
  CURRENT_CONSENT_VERSIONS,
  getConsentTypesToAccept,
  summarizeConsentState,
} from "@/server/legal/consent";

export const runtime = "nodejs";

const requestSchema = z.object({
  subjectKey: z.string().uuid(),
  acceptTerms: z.boolean().default(false),
  acknowledgePrivacy: z.boolean().default(false),
  acknowledgeAiTransfer: z.boolean().default(false),
  source: z.string().min(1).max(64).default("unknown"),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsedBody = requestSchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const {
    subjectKey,
    acceptTerms,
    acknowledgePrivacy,
    acknowledgeAiTransfer,
    source,
  } = parsedBody.data;

  const consentTypes = getConsentTypesToAccept({
    acceptTerms,
    acknowledgePrivacy,
    acknowledgeAiTransfer,
  });

  if (consentTypes.length === 0) {
    return NextResponse.json(
      { error: "no_acceptance_selected" },
      { status: 400 },
    );
  }

  await prisma.$transaction(
    consentTypes.map((consentType) =>
      prisma.consentRecord.upsert({
        where: {
          subjectKey_consentType_documentVersion: {
            subjectKey,
            consentType,
            documentVersion: CURRENT_CONSENT_VERSIONS[consentType],
          },
        },
        create: {
          subjectKey,
          consentType,
          documentVersion: CURRENT_CONSENT_VERSIONS[consentType],
          metadata: { source },
        },
        update: {
          revokedAt: null,
          metadata: { source },
        },
      }),
    ),
  );

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
    ...summarizeConsentState(records),
  });
}
