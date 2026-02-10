"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type JobStatus = "queued" | "running" | "succeeded" | "failed";

type JobResponse = {
  id: string;
  type: string;
  status: JobStatus;
  createdAt: string;
  startedAt: string | null;
  finishedAt: string | null;
  lastError: string | null;
};

type SleepJobDemoProps = {
  termsVersion: string;
  privacyVersion: string;
  aiTransferNoticeVersion: string;
};

type ConsentSummaryResponse = {
  subjectKey: string;
  versions: {
    terms: string;
    privacy: string;
    aiTransfer: string;
  };
  consents: {
    termsAccepted: boolean;
    privacyAcknowledged: boolean;
    aiTransferAcknowledged: boolean;
    missingRequired: string[];
    canStartGeneration: boolean;
  };
};

type ConsentInputState = {
  acceptTerms: boolean;
  acknowledgePrivacy: boolean;
  acknowledgeAiTransfer: boolean;
};

const SUBJECT_KEY_STORAGE_KEY = "hypnose.consentSubjectKey";

const initialConsentInput: ConsentInputState = {
  acceptTerms: false,
  acknowledgePrivacy: false,
  acknowledgeAiTransfer: false,
};

function createClientSubjectKey(): string {
  const canUseRandomUuid =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function";
  if (canUseRandomUuid) return crypto.randomUUID();
  return `fallback-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrCreateSubjectKey(): string {
  const existing = window.localStorage.getItem(SUBJECT_KEY_STORAGE_KEY);
  if (existing) return existing;

  const created = createClientSubjectKey();
  window.localStorage.setItem(SUBJECT_KEY_STORAGE_KEY, created);
  return created;
}

async function parseApiError(response: Response): Promise<string> {
  const data = (await response.json().catch(() => null)) as
    | { error?: string }
    | null;

  if (data?.error) return `${data.error} (${response.status})`;
  return `request failed (${response.status})`;
}

export function SleepJobDemo({
  termsVersion,
  privacyVersion,
  aiTransferNoticeVersion,
}: SleepJobDemoProps) {
  const [jobId, setJobId] = useState<string | null>(null);
  const [job, setJob] = useState<JobResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isLoadingConsents, setIsLoadingConsents] = useState(true);
  const [isSavingConsents, setIsSavingConsents] = useState(false);
  const [subjectKey, setSubjectKey] = useState<string | null>(null);
  const [consentInput, setConsentInput] =
    useState<ConsentInputState>(initialConsentInput);
  const [consentStatus, setConsentStatus] =
    useState<ConsentSummaryResponse["consents"]>({
      termsAccepted: false,
      privacyAcknowledged: false,
      aiTransferAcknowledged: false,
      missingRequired: ["TERMS_ACCEPTANCE", "PRIVACY_ACKNOWLEDGEMENT"],
      canStartGeneration: false,
    });

  const isTerminal = useMemo(
    () => job?.status === "succeeded" || job?.status === "failed",
    [job?.status],
  );

  const canSubmitJob = useMemo(
    () => consentInput.acceptTerms && consentInput.acknowledgePrivacy,
    [consentInput.acceptTerms, consentInput.acknowledgePrivacy],
  );

  function applyConsentSummary(summary: ConsentSummaryResponse) {
    setConsentStatus(summary.consents);
    setConsentInput({
      acceptTerms: summary.consents.termsAccepted,
      acknowledgePrivacy: summary.consents.privacyAcknowledged,
      acknowledgeAiTransfer: summary.consents.aiTransferAcknowledged,
    });
  }

  const refreshConsentStatus = useCallback(
    async (currentSubjectKey: string) => {
      setIsLoadingConsents(true);
      try {
        const response = await fetch(
          `/api/consents/status?subjectKey=${encodeURIComponent(
            currentSubjectKey,
          )}`,
        );
        if (!response.ok) throw new Error(await parseApiError(response));

        const summary = (await response.json()) as ConsentSummaryResponse;
        applyConsentSummary(summary);
      } catch (apiError) {
        setError(apiError instanceof Error ? apiError.message : String(apiError));
      } finally {
        setIsLoadingConsents(false);
      }
    },
    [],
  );

  useEffect(() => {
    const currentSubjectKey = getOrCreateSubjectKey();
    setSubjectKey(currentSubjectKey);
    void refreshConsentStatus(currentSubjectKey);
  }, [refreshConsentStatus]);

  async function persistConsents(currentSubjectKey: string) {
    const hasAnySelection =
      consentInput.acceptTerms ||
      consentInput.acknowledgePrivacy ||
      consentInput.acknowledgeAiTransfer;
    if (!hasAnySelection) return;

    setIsSavingConsents(true);
    try {
      const response = await fetch("/api/consents/accept", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          subjectKey: currentSubjectKey,
          acceptTerms: consentInput.acceptTerms,
          acknowledgePrivacy: consentInput.acknowledgePrivacy,
          acknowledgeAiTransfer: consentInput.acknowledgeAiTransfer,
          source: "sleep_job_demo",
        }),
      });
      if (!response.ok) throw new Error(await parseApiError(response));

      const summary = (await response.json()) as ConsentSummaryResponse;
      applyConsentSummary(summary);
    } finally {
      setIsSavingConsents(false);
    }
  }

  async function revokeAiTransferConsent() {
    if (!subjectKey) return;

    setIsSavingConsents(true);
    setError(null);
    try {
      const response = await fetch("/api/consents/revoke", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          subjectKey,
          consentType: "AI_TRANSFER_ACKNOWLEDGEMENT",
        }),
      });
      if (!response.ok) throw new Error(await parseApiError(response));

      const summary = (await response.json()) as ConsentSummaryResponse;
      applyConsentSummary(summary);
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : String(apiError));
    } finally {
      setIsSavingConsents(false);
    }
  }

  async function startJob() {
    setIsStarting(true);
    setError(null);
    setJob(null);

    try {
      if (!subjectKey) {
        throw new Error("subject_key_missing");
      }
      if (!canSubmitJob) {
        throw new Error("consent_required_before_generation");
      }

      await persistConsents(subjectKey);

      const response = await fetch("/api/jobs/sleep", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ seconds: 5, subjectKey }),
      });
      if (!response.ok) throw new Error(await parseApiError(response));

      const data = (await response.json()) as { id: string };
      setJobId(data.id);
    } catch (jobError) {
      setError(jobError instanceof Error ? jobError.message : String(jobError));
    } finally {
      setIsStarting(false);
    }
  }

  useEffect(() => {
    if (!jobId) return;

    let canceled = false;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) throw new Error(await parseApiError(response));
        const data = (await response.json()) as JobResponse;
        if (!canceled) setJob(data);
      } catch (pollError) {
        if (!canceled) {
          setError(
            pollError instanceof Error ? pollError.message : String(pollError),
          );
        }
      }
    }, 1000);

    return () => {
      canceled = true;
      clearInterval(interval);
    };
  }, [jobId]);

  return (
    <section className="w-full rounded-lg border border-black/10 p-4">
      <h2 className="text-lg font-semibold">Worker Smoke Test</h2>
      <p className="text-sm text-black/70">
        Startet einen 5s-Job, der im Worker verarbeitet wird und dessen Status per
        Polling abgefragt wird.
      </p>

      <p className="mt-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
        KI-Hinweis: Beim Start der Generierung wird eingegebener Text an externe
        KI-Dienstleister zur Verarbeitung uebertragen. Bitte keine sensiblen Daten
        und keine Daten Dritter ohne Rechtsgrundlage eingeben. Version:{" "}
        {aiTransferNoticeVersion}. Details in{" "}
        <Link href="/datenschutz" className="underline">
          Datenschutz
        </Link>{" "}
        und{" "}
        <Link href="/agb" className="underline">
          AGB
        </Link>
        .
      </p>

      <section className="mt-3 rounded-md border border-black/15 bg-black/[0.02] p-3 text-xs">
        <h3 className="text-sm font-semibold">Clickwrap & Consent</h3>
        <p className="mt-1 text-black/70">
          Subject Key: <code>{subjectKey ?? "wird erzeugt..."}</code>
        </p>

        <label className="mt-3 flex items-start gap-2">
          <input
            type="checkbox"
            checked={consentInput.acceptTerms}
            disabled={consentStatus.termsAccepted || isSavingConsents}
            onChange={(event) =>
              setConsentInput((previous) => ({
                ...previous,
                acceptTerms: event.target.checked,
              }))
            }
          />
          <span className="text-black/80">
            Ich akzeptiere die{" "}
            <Link href="/agb" className="underline">
              AGB
            </Link>{" "}
            (Version {termsVersion}).
            {consentStatus.termsAccepted ? " Bereits gespeichert." : ""}
          </span>
        </label>

        <label className="mt-2 flex items-start gap-2">
          <input
            type="checkbox"
            checked={consentInput.acknowledgePrivacy}
            disabled={consentStatus.privacyAcknowledged || isSavingConsents}
            onChange={(event) =>
              setConsentInput((previous) => ({
                ...previous,
                acknowledgePrivacy: event.target.checked,
              }))
            }
          />
          <span className="text-black/80">
            Ich habe den{" "}
            <Link href="/datenschutz" className="underline">
              Datenschutz
            </Link>{" "}
            zur Kenntnis genommen (Version {privacyVersion}).
            {consentStatus.privacyAcknowledged ? " Bereits gespeichert." : ""}
          </span>
        </label>

        <label className="mt-2 flex items-start gap-2">
          <input
            type="checkbox"
            checked={consentInput.acknowledgeAiTransfer}
            disabled={consentStatus.aiTransferAcknowledged || isSavingConsents}
            onChange={(event) =>
              setConsentInput((previous) => ({
                ...previous,
                acknowledgeAiTransfer: event.target.checked,
              }))
            }
          />
          <span className="text-black/80">
            Optional: Ich bestaetige den KI-Transfer-Hinweis (Version{" "}
            {aiTransferNoticeVersion}).
          </span>
        </label>

        {consentStatus.aiTransferAcknowledged ? (
          <button
            type="button"
            onClick={revokeAiTransferConsent}
            disabled={isSavingConsents}
            className="mt-2 rounded-md border border-black/20 px-2 py-1 text-xs"
          >
            AI-Hinweis-Widerruf ausfuehren
          </button>
        ) : null}

        {isLoadingConsents ? (
          <p className="mt-2 text-black/60">Consent-Status wird geladen...</p>
        ) : null}
      </section>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={startJob}
          disabled={isStarting || isSavingConsents || isLoadingConsents}
          className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isStarting ? "Starte..." : "Sleep-Job starten"}
        </button>

        {jobId ? (
          <span className="text-xs text-black/70">Job ID: {jobId}</span>
        ) : null}

        {!canSubmitJob ? (
          <span className="text-xs text-amber-800">
            AGB + Datenschutz muessen vor Jobstart bestaetigt werden.
          </span>
        ) : null}
      </div>

      {error ? (
        <pre className="mt-3 whitespace-pre-wrap rounded-md bg-red-50 p-3 text-xs text-red-900">
          {error}
        </pre>
      ) : null}

      {job ? (
        <pre className="mt-3 overflow-auto rounded-md bg-black/5 p-3 text-xs">
          {JSON.stringify(job, null, 2)}
        </pre>
      ) : null}

      {isTerminal ? (
        <p className="mt-2 text-xs text-black/70">
          Status ist terminal ({job?.status}). Polling kann später optimiert werden
          (DEC-023).
        </p>
      ) : null}
    </section>
  );
}
