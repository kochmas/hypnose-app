import { describe, expect, test } from "vitest";

import {
  LEGAL_DOCUMENT_VERSIONS,
  getLegalDocumentVersion,
} from "./versions";

describe("LEGAL_DOCUMENT_VERSIONS", () => {
  test("enthaelt alle erwarteten Dokumentversionen", () => {
    expect(LEGAL_DOCUMENT_VERSIONS).toEqual({
      imprint: "2026-02-10.v1",
      privacyPolicy: "2026-02-10.v1",
      termsOfService: "2026-02-10.v1",
      aiTransferNotice: "2026-02-10.v1",
    });
  });

  test("liefert Versionswerte per Key stabil aus", () => {
    expect(getLegalDocumentVersion("imprint")).toBe("2026-02-10.v1");
    expect(getLegalDocumentVersion("privacyPolicy")).toBe("2026-02-10.v1");
    expect(getLegalDocumentVersion("termsOfService")).toBe("2026-02-10.v1");
    expect(getLegalDocumentVersion("aiTransferNotice")).toBe("2026-02-10.v1");
  });
});
