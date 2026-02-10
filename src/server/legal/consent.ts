import { ConsentType } from "@prisma/client";

import { LEGAL_DOCUMENT_VERSIONS } from "./versions";

export type ConsentRecordSnapshot = {
  consentType: ConsentType;
  documentVersion: string;
  revokedAt: Date | null;
};

export const REQUIRED_CONSENT_TYPES = Object.freeze([
  ConsentType.TERMS_ACCEPTANCE,
  ConsentType.PRIVACY_ACKNOWLEDGEMENT,
]);

export const OPTIONAL_CONSENT_TYPES = Object.freeze([
  ConsentType.AI_TRANSFER_ACKNOWLEDGEMENT,
]);

export const ALL_CONSENT_TYPES = Object.freeze([
  ...REQUIRED_CONSENT_TYPES,
  ...OPTIONAL_CONSENT_TYPES,
]);

export const CURRENT_CONSENT_VERSIONS: Record<ConsentType, string> =
  Object.freeze({
    [ConsentType.TERMS_ACCEPTANCE]: LEGAL_DOCUMENT_VERSIONS.termsOfService,
    [ConsentType.PRIVACY_ACKNOWLEDGEMENT]:
      LEGAL_DOCUMENT_VERSIONS.privacyPolicy,
    [ConsentType.AI_TRANSFER_ACKNOWLEDGEMENT]:
      LEGAL_DOCUMENT_VERSIONS.aiTransferNotice,
  });

function hasActiveCurrentConsent(
  records: ConsentRecordSnapshot[],
  consentType: ConsentType,
): boolean {
  const expectedVersion = CURRENT_CONSENT_VERSIONS[consentType];
  return records.some(
    (record) =>
      record.consentType === consentType &&
      record.documentVersion === expectedVersion &&
      record.revokedAt === null,
  );
}

export function summarizeConsentState(records: ConsentRecordSnapshot[]) {
  const termsAccepted = hasActiveCurrentConsent(
    records,
    ConsentType.TERMS_ACCEPTANCE,
  );
  const privacyAcknowledged = hasActiveCurrentConsent(
    records,
    ConsentType.PRIVACY_ACKNOWLEDGEMENT,
  );
  const aiTransferAcknowledged = hasActiveCurrentConsent(
    records,
    ConsentType.AI_TRANSFER_ACKNOWLEDGEMENT,
  );

  const missingRequired = REQUIRED_CONSENT_TYPES.filter(
    (consentType) => !hasActiveCurrentConsent(records, consentType),
  );

  return {
    versions: {
      terms: CURRENT_CONSENT_VERSIONS[ConsentType.TERMS_ACCEPTANCE],
      privacy: CURRENT_CONSENT_VERSIONS[ConsentType.PRIVACY_ACKNOWLEDGEMENT],
      aiTransfer:
        CURRENT_CONSENT_VERSIONS[ConsentType.AI_TRANSFER_ACKNOWLEDGEMENT],
    },
    consents: {
      termsAccepted,
      privacyAcknowledged,
      aiTransferAcknowledged,
      missingRequired,
      canStartGeneration: missingRequired.length === 0,
    },
  };
}

export type ConsentAcceptInput = {
  acceptTerms: boolean;
  acknowledgePrivacy: boolean;
  acknowledgeAiTransfer: boolean;
};

export function getConsentTypesToAccept(input: ConsentAcceptInput): ConsentType[] {
  const types: ConsentType[] = [];
  if (input.acceptTerms) types.push(ConsentType.TERMS_ACCEPTANCE);
  if (input.acknowledgePrivacy) types.push(ConsentType.PRIVACY_ACKNOWLEDGEMENT);
  if (input.acknowledgeAiTransfer)
    types.push(ConsentType.AI_TRANSFER_ACKNOWLEDGEMENT);
  return types;
}
