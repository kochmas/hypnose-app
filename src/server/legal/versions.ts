export const LEGAL_DOCUMENT_VERSIONS = Object.freeze({
  imprint: "2026-02-10.v1",
  privacyPolicy: "2026-02-10.v1",
  termsOfService: "2026-02-10.v1",
  aiTransferNotice: "2026-02-10.v1",
});

export type LegalDocumentKey = keyof typeof LEGAL_DOCUMENT_VERSIONS;

export function getLegalDocumentVersion(key: LegalDocumentKey): string {
  return LEGAL_DOCUMENT_VERSIONS[key];
}
