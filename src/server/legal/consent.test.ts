import { ConsentType } from "@prisma/client";
import { describe, expect, test } from "vitest";

import {
  CURRENT_CONSENT_VERSIONS,
  getConsentTypesToAccept,
  summarizeConsentState,
} from "./consent";

describe("summarizeConsentState", () => {
  test("meldet fehlende Pflicht-Consents ohne Records", () => {
    const summary = summarizeConsentState([]);

    expect(summary.consents.termsAccepted).toBe(false);
    expect(summary.consents.privacyAcknowledged).toBe(false);
    expect(summary.consents.canStartGeneration).toBe(false);
    expect(summary.consents.missingRequired).toEqual([
      ConsentType.TERMS_ACCEPTANCE,
      ConsentType.PRIVACY_ACKNOWLEDGEMENT,
    ]);
  });

  test("erlaubt Generierung bei aktiven aktuellen Pflicht-Consents", () => {
    const summary = summarizeConsentState([
      {
        consentType: ConsentType.TERMS_ACCEPTANCE,
        documentVersion: CURRENT_CONSENT_VERSIONS[ConsentType.TERMS_ACCEPTANCE],
        revokedAt: null,
      },
      {
        consentType: ConsentType.PRIVACY_ACKNOWLEDGEMENT,
        documentVersion:
          CURRENT_CONSENT_VERSIONS[ConsentType.PRIVACY_ACKNOWLEDGEMENT],
        revokedAt: null,
      },
    ]);

    expect(summary.consents.canStartGeneration).toBe(true);
    expect(summary.consents.missingRequired).toEqual([]);
  });

  test("akzeptiert widerrufene oder veraltete Records nicht", () => {
    const summary = summarizeConsentState([
      {
        consentType: ConsentType.TERMS_ACCEPTANCE,
        documentVersion: "2025-01-01.v1",
        revokedAt: null,
      },
      {
        consentType: ConsentType.PRIVACY_ACKNOWLEDGEMENT,
        documentVersion:
          CURRENT_CONSENT_VERSIONS[ConsentType.PRIVACY_ACKNOWLEDGEMENT],
        revokedAt: new Date(),
      },
    ]);

    expect(summary.consents.canStartGeneration).toBe(false);
    expect(summary.consents.missingRequired).toEqual([
      ConsentType.TERMS_ACCEPTANCE,
      ConsentType.PRIVACY_ACKNOWLEDGEMENT,
    ]);
  });
});

describe("getConsentTypesToAccept", () => {
  test("liefert gewaehlte Consent-Typen in stabiler Reihenfolge", () => {
    const consentTypes = getConsentTypesToAccept({
      acceptTerms: true,
      acknowledgePrivacy: false,
      acknowledgeAiTransfer: true,
    });

    expect(consentTypes).toEqual([
      ConsentType.TERMS_ACCEPTANCE,
      ConsentType.AI_TRANSFER_ACKNOWLEDGEMENT,
    ]);
  });
});
