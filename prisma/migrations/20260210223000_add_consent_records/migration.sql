-- CreateEnum
CREATE TYPE "ConsentType" AS ENUM (
    'TERMS_ACCEPTANCE',
    'PRIVACY_ACKNOWLEDGEMENT',
    'AI_TRANSFER_ACKNOWLEDGEMENT'
);

-- CreateTable
CREATE TABLE "ConsentRecord" (
    "id" TEXT NOT NULL,
    "subjectKey" TEXT NOT NULL,
    "consentType" "ConsentType" NOT NULL,
    "documentVersion" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsentRecord_subjectKey_consentType_documentVersion_key"
ON "ConsentRecord"("subjectKey", "consentType", "documentVersion");

-- CreateIndex
CREATE INDEX "ConsentRecord_subjectKey_consentType_acceptedAt_idx"
ON "ConsentRecord"("subjectKey", "consentType", "acceptedAt");
